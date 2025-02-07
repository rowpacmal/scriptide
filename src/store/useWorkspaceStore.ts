// Import dependencies
import { create } from 'zustand';
// Import libraries
import minima from '@/lib/minima';
// Import utilities
import getFiles from '@/utils/getFiles';
// Import stores
import useEditorStore from './useEditorStore';
import useFileStore from './useFileStore';

// Types for the store
type TCurrentWorkspace = string | null;

// Interface for the store
interface IWorkspaceStore {
  workspaces: string[];
  setWorkspaces: (workspace: string[]) => void;

  refreshWorkspaces: () => Promise<void>;
  addWorkspace: (newWorkspace: string) => Promise<void>;
  renameWorkspace: (newWorkspace: string) => Promise<void>;
  copyWorkspace: (newWorkspace: string) => Promise<void>;
  deleteWorkspace: () => Promise<void>;
  deleteAllWorkspaces: () => Promise<void>;

  currentWorkspace: TCurrentWorkspace;
  setCurrentWorkspace: (workspace: TCurrentWorkspace) => void;
}

// Create the store
const useWorkspaceStore = create<IWorkspaceStore>((set, get) => ({
  workspaces: [],
  setWorkspaces: (workspaces: string[]) => set({ workspaces }),

  refreshWorkspaces: async () => {
    const workspaces: string[] = await getFiles('workspaces');
    set({ workspaces });

    const currentWorkspace = get().currentWorkspace;
    const lastWorkspace = workspaces.at(-1);
    set({ currentWorkspace: currentWorkspace || lastWorkspace || null });

    if (!currentWorkspace || !lastWorkspace) {
      useFileStore.setState({ files: [] });
      return;
    }

    useFileStore.getState().refreshFiles(currentWorkspace || lastWorkspace);
  },
  addWorkspace: async (newWorkspace: string) => {
    await minima.file.makedir(`workspaces/${newWorkspace}`);

    set((state) => ({ workspaces: [...state.workspaces, newWorkspace] }));
    set({ currentWorkspace: newWorkspace });

    useFileStore.getState().refreshFiles(newWorkspace);
    useFileStore.setState({ currentFile: null });
    useEditorStore.setState({ code: null });
  },
  renameWorkspace: async (newWorkspace: string) => {
    const currentWorkspace = get().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    const currentFolder = `workspaces/${currentWorkspace}`;
    const newFolder = `workspaces/${newWorkspace}`;
    const files = useFileStore.getState().files;

    if (files.length > 0) {
      for (const file of files) {
        await minima.file.move(
          `${currentFolder}/${file}`,
          `${newFolder}/${file}`
        );
      }
    } else {
      await minima.file.makedir(newFolder);
    }

    /** Quick fix to a renaming bug, where you can rename a workspace
     * to the same name but in different case (lowercase or uppercase).
     */
    if (
      newWorkspace.toLocaleLowerCase() !== currentWorkspace.toLocaleLowerCase()
    ) {
      await minima.file.delete(currentFolder);
    }

    set((state) => {
      const workspaces = [...state.workspaces];
      const indexOfCurrent = state.workspaces.indexOf(currentWorkspace);
      workspaces[indexOfCurrent] = newWorkspace;

      return { workspaces };
    });
    set({ currentWorkspace: newWorkspace });

    useFileStore.getState().refreshFiles(newWorkspace);
  },
  copyWorkspace: async (newWorkspace: string) => {
    const currentWorkspace = get().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    const currentFolder = `workspaces/${currentWorkspace}`;
    const newFolder = `workspaces/${newWorkspace}`;
    const files = useFileStore.getState().files;

    if (files.length > 0) {
      for (const file of files) {
        await minima.file.copy(
          `${currentFolder}/${file}`,
          `${newFolder}/${file}`
        );
      }
    } else {
      await minima.file.makedir(newFolder);
    }

    set((state) => ({ workspaces: [...state.workspaces, newWorkspace] }));
    set({ currentWorkspace: newWorkspace });

    useFileStore.getState().refreshFiles(newWorkspace);
    useFileStore.setState({ currentFile: null });
    useEditorStore.setState({ code: null });
  },
  deleteWorkspace: async () => {
    await minima.file.delete(`workspaces/${get().currentWorkspace}`);
    set({ currentWorkspace: null });

    get().refreshWorkspaces();

    useFileStore.setState({ currentFile: null });
    useEditorStore.setState({ code: null });
  },
  deleteAllWorkspaces: async () => {
    await minima.file.delete('workspaces');

    set({ workspaces: [] });
    set({ currentWorkspace: null });

    useFileStore.setState({ files: [] }); // Quick fix to a bug
    useFileStore.setState({ currentFile: null });
    useEditorStore.setState({ code: null });
  },

  currentWorkspace: null,
  setCurrentWorkspace: (currentWorkspace: TCurrentWorkspace) => {
    set({ currentWorkspace });
  },
}));

// Export the store
export default useWorkspaceStore;
