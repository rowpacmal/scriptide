import { create } from 'zustand';
import useFileStore from './useFileStore';
import minima from '@/lib/minima';
import useWorkspaceStore from './useWorkspaceStore';

// Interface of the store
export interface ILivePreviewStore {
  livePreview: string;
  setLivePreview: (livePreview: string) => void;

  blobObjectURLs: string[];
  setBlobObjectURLs: (blobObjectURLs: string[]) => void;

  createLivePreview: () => Promise<void>;
}

// Create the store
export const useLivePreviewStore = create<ILivePreviewStore>((set) => ({
  livePreview: '',
  setLivePreview: (livePreview: string) => set({ livePreview }),

  blobObjectURLs: [],
  setBlobObjectURLs: (blobObjectURLs: string[]) => set({ blobObjectURLs }),

  createLivePreview: async () => {
    /* let timeout;

    clearTimeout(timeout);

    await new Promise((resolve) => {
      timeout = setTimeout(() => {
        resolve(true);
      }, 1000);
    }); */

    const files = useFileStore.getState().files;
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    // console.log(files);

    if (!files.includes('index.html')) {
      set({ livePreview: '' });
      return;
    }

    const blobObjectURLs = [];
    let code = (
      await minima.file.load(`workspaces/${currentWorkspace}/index.html`)
    ).response.load.data;

    // console.log(code);

    const matches = code.matchAll(/(?:href|src)=["']?([^"'\s>]+)["']?/gi);
    const savedSubstrings = [];

    for (const match of matches) {
      savedSubstrings.push(match[0]);
    }

    // console.log(savedSubstrings);

    if (files.length > 0) {
      for (const file of files) {
        if (file === 'index.html') {
          continue;
        }

        // console.log(file);

        const ext = file.split('.').pop();
        let type = 'text/plain';
        let img = '';

        if (ext === 'html') {
          type = 'text/html';
        } else if (ext === 'css') {
          type = 'text/css';
        } else if (ext === 'js') {
          type = 'text/javascript';
        } else if (ext === 'jpg' || ext === 'jpeg') {
          type = 'image/jpeg';
        } else {
          continue;
        }

        const data = (
          await minima.file.load(`workspaces/${currentWorkspace}/${file}`)
        ).response.load.data;

        if (ext === 'jpg' || ext === 'jpeg') {
          const bytes = new TextEncoder().encode(data); // Convert to binary data
          const base64 = new Promise((resolve, reject) => {
            const blob = new Blob([bytes], {
              type: 'application/octet-stream',
            });
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract Base64 part
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });

          img = await base64;
        }

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

    // console.log(code);

    set({ blobObjectURLs, livePreview: code });
  },
}));

export default useLivePreviewStore;
