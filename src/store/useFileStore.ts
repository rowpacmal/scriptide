// Import dependencies
import { create } from 'zustand';
// Import libraries
import minima from '@/lib/minima';
// Import utilities
import getFiles from '@/utils/getFiles';
// Import stores
import useEditorStore from './useEditorStore';
import useWorkspaceStore from './useWorkspaceStore';

// Types for the store
type TCurrentFile = string | null;

// Interface for the store
interface IFileStore {
  files: string[];
  setFiles: (files: string[]) => void;

  refreshFiles: (workspace: string) => Promise<void>;
  addFile: (newFile: string) => Promise<void>;
  renameFile: (oldFile: string, newFile: string) => Promise<void>;
  saveFile: () => Promise<void>;
  loadFile: (file: string) => Promise<void>;
  deleteFile: (file: string) => Promise<void>;
  deleteAllFiles: () => Promise<void>;

  currentFile: TCurrentFile;
  setCurrentFile: (file: TCurrentFile) => void;
}

// Create the store
const useFileStore = create<IFileStore>((set, get) => ({
  files: [],
  setFiles: (files) => set({ files }),

  refreshFiles: async (workspace: string) => {
    const files: string[] = await getFiles(`workspaces/${workspace}`);

    set({ files });
  },
  addFile: async (newFile: string) => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    await minima.file.save(`workspaces/${currentWorkspace}/${newFile}`, '');

    set((state) => ({
      files: [...state.files, newFile].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: 'base' })
      ),
    }));
    set({ currentFile: newFile });
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
  },
  saveFile: async () => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;
    const currentFile = get().currentFile;

    if (!currentWorkspace || !currentFile) {
      return;
    }

    await minima.file.save(
      `workspaces/${currentWorkspace}/${currentFile}`,
      useEditorStore.getState().code
    );
  },
  loadFile: async (file: string) => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    const code = (
      await minima.file.load(`workspaces/${currentWorkspace}/${file}`)
    ).response.load.data;

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
}));

// Export the store
export default useFileStore;
