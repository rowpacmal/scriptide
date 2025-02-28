import { create } from 'zustand';
import useFileStore from './useFileStore';
import minima from '@/lib/minima';
import useWorkspaceStore from './useWorkspaceStore';
// import isImageFile from '@/utils/isImageFile';
// import base64ToImage from '@/utils/base64ToImage';

// Interface of the store
export interface ILivePreviewStore {
  livePreview: string;
  setLivePreview: (livePreview: string) => void;

  liveURL: string;
  setLiveURL: (liveURL: string) => void;

  showPreview: boolean;
  setShowPreview: (showPreview: boolean) => void;

  togglePreview: () => void;

  blobObjectURLs: string[];
  setBlobObjectURLs: (blobObjectURLs: string[]) => void;

  refreshLivePreview: () => Promise<void>;

  isLoadingLivePreview: boolean;
  setIsLoadingLivePreview: (isLoadingLivePreview: boolean) => void;
}

// Create the store
export const useLivePreviewStore = create<ILivePreviewStore>((set, get) => ({
  livePreview: '',
  setLivePreview: (livePreview: string) => set({ livePreview }),

  liveURL:
    (window as any).DEBUG_MINIDAPPID ||
    window.location.href.split('/')[3] ||
    '0x00',
  setLiveURL: (liveURL: string) => set({ liveURL }),

  showPreview: false,
  setShowPreview: (showPreview: boolean) => set({ showPreview }),

  togglePreview: () => {
    set((state) => {
      const showPreview = !state.showPreview;

      if (!showPreview) {
        set({ livePreview: '' });
      }

      return { showPreview };
    });
  },

  blobObjectURLs: [],
  setBlobObjectURLs: (blobObjectURLs: string[]) => set({ blobObjectURLs }),

  refreshLivePreview: async () => {
    set({ isLoadingLivePreview: true });

    if (!get().showPreview) {
      set({ isLoadingLivePreview: false });
      return;
    }

    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;
    if (!currentWorkspace) {
      set({ livePreview: '', isLoadingLivePreview: false });
      return;
    }

    await minima.file.delete(`livepreview/${currentWorkspace}`);
    await minima.file.deletefromweb(`livepreview/${currentWorkspace}`);

    const timestamp = Date.now();
    await minima.file.copy(
      `workspaces/${currentWorkspace}`,
      `livepreview/${currentWorkspace}/${timestamp}`
    );

    let indexHtml = (
      await minima.file.load(
        `livepreview/${currentWorkspace}/${timestamp}/index.html`
      )
    ).response.load.data;

    const files = useFileStore.getState().files;
    if (files) {
      // If mds.js exists, rename it to mds-lp.js
      // This is to fix an issue where another version of mds.js had priority
      // By changing the name, we ensure that the live preview prioritize the
      // local mds.js file over the server one
      if (files.includes('mds.js')) {
        await minima.file.move(
          `livepreview/${currentWorkspace}/${timestamp}/mds.js`,
          `livepreview/${currentWorkspace}/${timestamp}/mds-lp.js`
        );

        for (const file of files) {
          if (file === 'index.html') {
            indexHtml = indexHtml.replace('/mds.js', '/mds-lp.js');
            continue;
          }

          if (file.endsWith('.html')) {
            let data = (
              await minima.file.load(
                `livepreview/${currentWorkspace}/${timestamp}/${file}`
              )
            ).response.load.data;
            data = data.replace('/mds.js', '/mds-lp.js');

            await minima.file.save(
              `livepreview/${currentWorkspace}/${timestamp}/${file}`,
              data
            );
          }
        }
      }

      // If debug.conf exists, inject debug settings
      // inject the debug settings into .html files as a <script> in <head>
      if (files.includes('debug.conf')) {
        const conf = (
          await minima.file.load(`workspaces/${currentWorkspace}/debug.conf`)
        ).response.load.data;
        const json = JSON.parse(conf);
        // console.log(json);

        const debug = `
        <script>
          var DEBUG = "${json.debug}" === 'true';
          var DEBUG_HOST = "${json.host}";
          var DEBUG_PORT = "${json.port}";
          var DEBUG_UID = "${json.uid}";
        </script>
      `;

        for (const file of files) {
          if (file === 'index.html') {
            indexHtml = indexHtml.replace('</head>', debug + '</head>');
            continue;
          }

          if (file.endsWith('.html')) {
            let data = (
              await minima.file.load(
                `livepreview/${currentWorkspace}/${timestamp}/${file}`
              )
            ).response.load.data;
            data = data.replace('</head>', debug + '</head>');

            await minima.file.save(
              `livepreview/${currentWorkspace}/${timestamp}/${file}`,
              data
            );
          }
        }
      }
    }

    // Update the changes made to index.html
    await minima.file.save(
      `livepreview/${currentWorkspace}/${timestamp}/index.html`,
      indexHtml
    );

    // Copy files to web folder for live preview
    await minima.file.copytoweb(
      `livepreview/${currentWorkspace}/${timestamp}`,
      `livepreview/${currentWorkspace}/${timestamp}`
    );

    // Update the live preview URL
    const host = (window as any).MDS.filehost || '';
    const apid = get().liveURL || '';
    const livePreview = `${host}${apid}/livepreview/${currentWorkspace}/${timestamp}/index.html`;

    set({
      livePreview,
      isLoadingLivePreview: false,
    });
  },

  isLoadingLivePreview: false,
  setIsLoadingLivePreview: (isLoadingLivePreview: boolean) =>
    set({ isLoadingLivePreview }),
}));

export default useLivePreviewStore;
