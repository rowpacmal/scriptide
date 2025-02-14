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

        if (isImageFile(file)) {
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
      if (isImageFile(file)) {
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
      // Need to use <!-- mds-debug --> in html document to inject the debug settings
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
            indexHtml = indexHtml.replace(/<!--\s*mds-debug\s*-->/, debug);
            continue;
          }

          if (file.endsWith('.html')) {
            let data = (
              await minima.file.load(
                `livepreview/${currentWorkspace}/${timestamp}/${file}`
              )
            ).response.load.data;
            data = data.replace(/<!--\s*mds-debug\s*-->/, debug);

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
    });
  },
}));

export default useLivePreviewStore;
