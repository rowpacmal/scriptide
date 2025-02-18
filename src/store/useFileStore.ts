// Import dependencies
import { create } from 'zustand';
// Import libraries
import minima from '@/lib/minima';
// Import utilities
import getFiles from '@/utils/getFiles';
import isImageFile from '@/utils/isImageFile';
// Import stores
import useEditorStore from './useEditorStore';
import useWorkspaceStore from './useWorkspaceStore';
import listAllFiles from '@/utils/listAllFiles';

// Types for the store
type TCurrentFile = string | null;

// Interface for the store
interface IFileStore {
  files: string[];
  setFiles: (files: string[]) => void;
  allFiles: string[];
  setAllFiles: (files: string[]) => void;

  refreshFiles: (workspace: string, loader?: boolean) => Promise<void>;
  addFile: (path: string) => Promise<void>;
  addFolder: (path: string) => Promise<void>;
  renameFile: (oldFile: string, newFile: string) => Promise<void>;
  saveFile: () => Promise<void>;
  loadFile: (path: string) => Promise<void>;
  deleteFile: (file: string) => Promise<void>;
  deleteAllFiles: () => Promise<void>;

  currentFile: TCurrentFile;
  setCurrentFile: (file: TCurrentFile) => void;
  currentFolder: TCurrentFile;
  setCurrentFolder: (folder: TCurrentFile) => void;

  isLoadingFiles: boolean;
  setIsLoadingFiles: (isLoadingFiles: boolean) => void;
  isAddingFile: boolean;
  setIsAddingFile: (isAddingFile: boolean) => void;
  isFolder: boolean | null;
  setIsFolder: (isFolder: boolean | null) => void;
}

// Create the store
const useFileStore = create<IFileStore>((set, get) => ({
  files: [],
  setFiles: (files) => set({ files }),
  allFiles: [],
  setAllFiles: (files) => set({ allFiles: files }),

  refreshFiles: async (workspace: string, loader: boolean = true) => {
    if (loader) {
      set({ isLoadingFiles: true });
    }

    const listFiles = await listAllFiles(workspace);
    // console.log(listFiles);
    const files: string[] = [];
    const allFiles: any = [];

    for (const file of listFiles) {
      const parent = file.location.split('/').splice(3);
      let currentLevel = allFiles;

      for (let i = 0; i < parent.length; i++) {
        const key = parent[i];

        if (key === file.name && file.isfile) {
          continue;
        }

        let indexOf = currentLevel.findIndex((f: any) => f.name === key);

        if (indexOf === -1) {
          const find = listFiles.find((f: any) => {
            const location = f.location.split('/').pop();

            return location === key;
          });
          // console.log(find);

          currentLevel.push({
            ...find,
            _children: [],
            isfile: false,
          });

          indexOf = currentLevel.length - 1;
        }

        currentLevel = currentLevel[indexOf]._children;
      }

      if (file.isfile) {
        currentLevel.push(file);
      }

      files.push(file.name);
    }
    // console.log(allFiles);

    set({ files, allFiles });

    if (get().isLoadingFiles) {
      set({ isLoadingFiles: false });
    }
  },
  addFile: async (path: string) => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    await minima.file.save(path, '');

    get().refreshFiles(currentWorkspace, false);
    set({ currentFile: path });
    useEditorStore.setState({ code: '' });
  },

  addFolder: async (path: string) => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    await minima.file.makedir(path);

    get().refreshFiles(currentWorkspace, false);
    set({ currentFile: path });
    useEditorStore.setState({ code: '' });
  },

  renameFile: async (oldFile: string, newFile: string) => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    await minima.file.move(
      `workspaces/${currentWorkspace}/${oldFile}`,
      `workspaces/${currentWorkspace}/${newFile}`
    );

    set((state) => ({
      files: state.files.map((f) => (f === oldFile ? newFile : f)),
    }));

    if (get().currentFile === oldFile) {
      set({ currentFile: newFile });
    }
  },
  saveFile: async () => {
    const currentFile = get().currentFile;
    if (!currentFile) {
      return;
    }

    if (isImageFile(currentFile)) {
      return;
    }

    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;
    if (!currentWorkspace || !currentFile) {
      return;
    }

    await minima.file.save(
      `workspaces/${currentWorkspace}/${currentFile}`,
      useEditorStore.getState().code
    );
  },
  loadFile: async (path: string) => {
    if (!path) {
      return;
    }

    if (isImageFile(path)) {
      useEditorStore.setState({ code: null });
      return;
    }

    const code = (await minima.file.load(path)).response.load.data;

    useEditorStore.setState({ code });
  },
  deleteFile: async (file: string) => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    await minima.file.delete(`workspaces/${currentWorkspace}/${file}`);

    if (file === get().currentFile) {
      set({ currentFile: null });
      useEditorStore.setState({ code: null });
    }

    set((state) => ({ files: state.files.filter((f) => f !== file) }));
  },
  deleteAllFiles: async () => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    await minima.file.delete(`workspaces/${currentWorkspace}`);
    await minima.file.makedir(`workspaces/${currentWorkspace}`);

    set({ files: [] });
  },

  currentFile: null,
  setCurrentFile: (file) => set({ currentFile: file }),
  currentFolder: null,
  setCurrentFolder: (folder) => set({ currentFolder: folder }),

  isLoadingFiles: false,
  setIsLoadingFiles: (isLoadingFiles) => set({ isLoadingFiles }),
  isAddingFile: false,
  setIsAddingFile: (isAddingFile) => set({ isAddingFile }),
  isFolder: null,
  setIsFolder: (isFolder: boolean | null) => set({ isFolder }),
}));

// Export the store
export default useFileStore;
