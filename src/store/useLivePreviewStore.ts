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

  refreshLivePreview: async () => {
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
  },
}));

export default useLivePreviewStore;
