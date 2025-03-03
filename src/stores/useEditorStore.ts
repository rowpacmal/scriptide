// Import dependencies
import { create } from 'zustand';
// Import types
import { IEditorStore, ILocalStorage, TAllCodes, TCode } from '@/types';

// Create the store
const useEditorStore = create<IEditorStore>((set) => ({
  code: null,
  setCode: (code: TCode) => set({ code }),

  allCodes: [],
  setAllCodes: (allCodes: TAllCodes[]) => set({ allCodes }),

  tabIndex: 0,
  setTabIndex: (tabIndex: number) => set({ tabIndex }),

  addCode: (file: string, code: TCode, isImg: boolean) => {
    set((state) => {
      const allCodes = [...state.allCodes];

      if (allCodes.find((c) => c.file === file)) {
        return {
          tabIndex: allCodes.findIndex((c) => c.file === file),
        };
      }

      return {
        allCodes: [...allCodes, { file, code, isImg }],
        tabIndex: allCodes.length,
      };
    });
  },
  updateCode: (file: string, code: TCode) => {
    set((state) => ({
      allCodes: state.allCodes.map((c) =>
        c.file === file ? { ...c, code } : c
      ),
    }));
  },
  removeCode: (file: string) => {
    set((state) => ({
      allCodes: state.allCodes.filter((code) => code.file !== file),
    }));
  },
  removeFolderCodes: (folder: string) => {
    set((state) => {
      let allCodes = [...state.allCodes];
      for (const code of allCodes) {
        if (code.file.includes(folder)) {
          allCodes = allCodes.filter((c) => c.file !== code.file);
        }
      }

      let tabIndex = state.tabIndex;
      const currentCode = state.allCodes[tabIndex];
      if (!currentCode?.file.includes(folder)) {
        tabIndex = allCodes.indexOf(currentCode);
      } else if (tabIndex > allCodes.length - 1) {
        tabIndex = allCodes.length > 0 ? allCodes.length - 1 : 0;
      }

      return {
        allCodes,
        tabIndex,
      };
    });
  },

  editorZoom: Number(localStorage.getItem('editor-zoom')) || 0,
  setEditorZoom: (editorZoom: number) => {
    set({ editorZoom });
    localStorage.setItem('editor-zoom', editorZoom.toString());
  },
  editorZoomIn: () =>
    set((state) => {
      const zoomIn = state.editorZoom + 1;

      localStorage.setItem('editor-zoom', zoomIn.toString());
      return { editorZoom: zoomIn };
    }),
  editorZoomOut: () =>
    set((state) => {
      const zoomOut = state.editorZoom - 1;

      localStorage.setItem('editor-zoom', zoomOut.toString());
      return { editorZoom: zoomOut };
    }),

  editorAutoSave:
    JSON.parse((localStorage as ILocalStorage).getItem('editor-auto-save')) ||
    false,
  setEditorAutoSave: (editorAutoSave: boolean) => {
    set({ editorAutoSave });
    localStorage.setItem('editor-auto-save', JSON.stringify(editorAutoSave));
  },
  toggleEditorAutoSave: () =>
    set((state) => {
      const saveState = !state.editorAutoSave;

      localStorage.setItem('editor-auto-save', JSON.stringify(saveState));
      return { editorAutoSave: saveState };
    }),
}));

// Export
export default useEditorStore;
