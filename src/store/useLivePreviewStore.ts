import { create } from 'zustand';
import useFileStore from './useFileStore';
import minima from '@/lib/minima';
import useWorkspaceStore from './useWorkspaceStore';
import isImageFileName from '@/utils/isImageFileName';
import base64ToImage from '@/utils/base64ToImage';

// Interface of the store
export interface ILivePreviewStore {
  livePreview: string;
  setLivePreview: (livePreview: string) => void;

  showPreview: boolean;
  setShowPreview: (showPreview: boolean) => void;

  togglePreview: () => void;

  blobObjectURLs: string[];
  setBlobObjectURLs: (blobObjectURLs: string[]) => void;

  refreshLivePreview: () => Promise<void>;
}

// Create the store
export const useLivePreviewStore = create<ILivePreviewStore>((set) => ({
  livePreview: '',
  setLivePreview: (livePreview: string) => set({ livePreview }),

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

  // Back-up of refreshLivePreview v1
  /* refreshLivePreview: async () => {
    const files = useFileStore.getState().files;
    // console.log(files);

    if (!files.includes('index.html')) {
      set({ livePreview: '' });
      return;
    }

    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;
    const blobObjectURLs: string[] = [];
    let code = (
      await minima.file.load(`workspaces/${currentWorkspace}/index.html`)
    ).response.load.data;
    // console.log(code);

    if (!code) {
      set({ livePreview: '' });
      return;
    }

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

      code = code.replace(/<!--\s*mds-debug\s*-->/, debug);
    }

    const matches = code.matchAll(/(?:href|src)=["']?([^"'\s>]+)["']?/gi);
    const savedSubstrings: string[] = [];

    for (const match of matches) {
      if (match[0].includes('http') || match[0].includes('https')) {
        continue;
      }

      savedSubstrings.push(match[0]);
    }

    // console.log(savedSubstrings);

    if (files.length > 0) {
      for (const file of files) {
        if (file === 'index.html') {
          continue;
        }

        // console.log(file);

        if (isImageFileName(file)) {
          const binary = (
            await minima.file.loadbinary(
              `workspaces/${currentWorkspace}/${file}`
            )
          ).response.load.data;
          const base64 = minima.util.hexToBase64(binary);

          const url = base64ToImage(base64);

          for (let i = 0; i < savedSubstrings.length; i++) {
            if (savedSubstrings[i].includes(file)) {
              const split: any = savedSubstrings[i].split('"');
              split[1] = url;
              const join = split.join('"');
              code = code.replace(savedSubstrings[i], join);
            }
          }
        } else {
          const ext = file.split('.').pop();
          let type = 'text/plain';

          if (ext === 'html') {
            type = 'text/html';
          } else if (ext === 'css') {
            type = 'text/css';
          } else if (ext === 'js') {
            type = 'text/javascript';
          } else {
            continue;
          }

          const data = (
            await minima.file.load(`workspaces/${currentWorkspace}/${file}`)
          ).response.load.data;

          const blob = new Blob([data], { type });
          const url = URL.createObjectURL(blob);
          blobObjectURLs.push(url);

          for (let i = 0; i < savedSubstrings.length; i++) {
            if (savedSubstrings[i].includes(file)) {
              const split = savedSubstrings[i].split('"');
              split[1] = url;
              const join = split.join('"');
              code = code.replace(savedSubstrings[i], join);
            }
          }
        }
      }
    }

    // console.log(code);

    set({ blobObjectURLs, livePreview: code });
  }, */

  // Back-up of refreshLivePreview v2
  /* refreshLivePreview: async () => {
    const files = useFileStore.getState().files;
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    if (!files || !currentWorkspace) {
      set({ livePreview: '' });
      return;
    }

    type TFile = {
      file: string;
      url: string;
      data?: string;
    };

    const supportFiles: TFile[] = [];

    for (const file of files) {
      if (isImageFileName(file)) {
        const binary = (
          await minima.file.loadbinary(`workspaces/${currentWorkspace}/${file}`)
        ).response.load.data;
        const base64 = minima.util.hexToBase64(binary);
        const url = base64ToImage(base64);
        if (!url) {
          continue;
        }

        supportFiles.push({ file, url });
      } else if (file.endsWith('.js')) {
        const data = (
          await minima.file.load(`workspaces/${currentWorkspace}/${file}`)
        ).response.load.data;
        const blob = new Blob([data], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);

        supportFiles.push({ file, url });
      } else if (file.endsWith('.css')) {
        const data = (
          await minima.file.load(`workspaces/${currentWorkspace}/${file}`)
        ).response.load.data;
        const blob = new Blob([data], { type: 'text/css' });
        const url = URL.createObjectURL(blob);

        supportFiles.push({ file, url });
      } else {
        continue;
      }
    }
    // console.log(supportFiles);

    const htmlFiles: TFile[] = [];

    for (const file of files) {
      if (file.endsWith('.html')) {
        let data = (
          await minima.file.load(`workspaces/${currentWorkspace}/${file}`)
        ).response.load.data;

        const matches = data.matchAll(/(?:href|src)=["']?([^"'\s>]+)["']?/gi);
        const savedSubstrings: string[] = [];

        for (const match of matches) {
          if (match[0].includes('http') || match[0].includes('https')) {
            continue;
          }

          savedSubstrings.push(match[0]);
        }

        for (const { file, url } of supportFiles) {
          for (let i = 0; i < savedSubstrings.length; i++) {
            if (savedSubstrings[i].includes(file)) {
              const split = savedSubstrings[i].split('"');
              split[1] = url;
              const join = split.join('"');
              data = data.replace(savedSubstrings[i], join);
            }
          }
        }

        if (file === 'index.html') {
          const blob = new Blob([data], { type: 'text/html' });
          const url = URL.createObjectURL(blob);

          htmlFiles.push({ file, url, data });
        } else {
          htmlFiles.push({ file, url: '', data });
        }
      }
    }
    // console.log(htmlFiles);

    function updateIndexURL(htmlFiles: TFile[]) {
      for (const htmlFile of htmlFiles) {
        const { file, data } = htmlFile;
        if (file === 'index.html') {
          continue;
        }

        const indexHtml = htmlFiles.find((f) => f.file === 'index.html');
        if (!indexHtml) {
          continue;
        }

        const newData = data?.replaceAll(
          /href=["']?(\/|.\/|index.html|.\/index.html|\/index.html)["']?/gi,
          `href="${indexHtml.url}"`
        );

        if (!newData) {
          continue;
        }

        const blob = new Blob([newData], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        htmlFiles[htmlFiles.indexOf(htmlFile)] = { file, url, data: newData };
      }
      // console.log(htmlFiles);
    }
    updateIndexURL(htmlFiles);

    function updateIndexHtml(htmlFiles) {
      for (const htmlFile of htmlFiles) {
        const { file, url } = htmlFile;
        if (file === 'index.html') {
          continue;
        }

        const indexHtml = htmlFiles.find((f) => f.file === 'index.html');
        if (!indexHtml) {
          continue;
        }

        const matches = indexHtml.data?.matchAll(
          /(?:href|src)=["']?([^"'\s>]+)["']?/gi
        );
        if (!matches) {
          continue;
        }

        const savedSubstrings: string[] = [];

        for (const match of matches) {
          if (match[0].includes('http') || match[0].includes('https')) {
            continue;
          }

          if (match[0].includes(file)) {
            savedSubstrings.push(match[0]);
          }
        }

        let newData = indexHtml.data;

        if (!newData) {
          continue;
        }

        for (let i = 0; i < savedSubstrings.length; i++) {
          // if (savedSubstrings[i].includes(file)) {
          const split = savedSubstrings[i].split('"');
          split[1] = url;
          const join = split.join('"');
          newData = newData.replace(savedSubstrings[i], join);
          // }
        }

        const blob = new Blob([newData], { type: 'text/html' });
        const newUrl = URL.createObjectURL(blob);

        htmlFiles[htmlFiles.indexOf(indexHtml)] = {
          file: indexHtml.file,
          url: newUrl,
          data: newData,
        };
      }
      // console.log(htmlFiles);
    }
    updateIndexHtml(htmlFiles);
    updateIndexURL(htmlFiles);
    updateIndexHtml(htmlFiles);

    set({
      livePreview: htmlFiles,
    });
  }, */

  // Back-up of refreshLivePreview v2
  refreshLivePreview: async () => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;
    if (!currentWorkspace) {
      set({ livePreview: '' });
      return;
    }

    await minima.file.deletefromweb(`livepreview/${currentWorkspace}`);
    set({ livePreview: '' });

    const timestamp = Date.now();
    await minima.file.copytoweb(
      `workspaces/${currentWorkspace}`,
      `livepreview/${currentWorkspace}/${timestamp}`
    );

    const host = (window as any).MDS.filehost || '';
    const apid = (window as any).DEBUG_MINIDAPPID || '';

    set({
      livePreview: `${host}/${apid}/livepreview/${currentWorkspace}/${timestamp}/index.html`,
    });
  },
}));

export default useLivePreviewStore;
