// Import dependencies
import { create } from 'zustand';

// Types for the store
type TCode = string | null;
type TAllCodes = { index: number; file: string; code: TCode; isImg: boolean };

// Interface for the store
interface IEditorStore {
  code: TCode;
  setCode: (code: TCode) => void;

  allCodes: TAllCodes[];
  setAllCodes: (allCodes: TAllCodes[]) => void;

  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;

  addCode: (file: string, code: TCode, isImg: boolean) => void;
  updateCode: (index: number, code: TCode) => void;
  removeCode: (index: number) => void;

  editorZoom: number;
  setEditorZoom: (editorZoom: number) => void;
  editorZoomIn: () => void;
  editorZoomOut: () => void;

  editorAutoSave: boolean;
  setEditorAutoSave: (editorAutoSave: boolean) => void;
  toggleEditorAutoSave: () => void;
}
interface ILocalStorage {
  getItem: (key: string) => string;
}

// Create the store
const useEditorStore = create<IEditorStore>((set) => ({
  code: null,
  setCode: (code: TCode) => set({ code }),

  allCodes: [],
  setAllCodes: (allCodes: TAllCodes[]) => set({ allCodes }),

  tabIndex: 0,
  setTabIndex: (tabIndex: number) => set({ tabIndex }),

  addCode: (file: string, code: TCode, isImg: boolean) => {
    set((state) => ({
      allCodes: [...state.allCodes, { index: Date.now(), file, code, isImg }],
      tabIndex: state.allCodes.length,
    }));
  },
  updateCode: (index: number, code: TCode) => {
    set((state) => ({
      allCodes: state.allCodes.map((c) =>
        c.index === index ? { ...c, code } : c
      ),
    }));
  },
  removeCode: (index: number) => {
    set((state) => ({
      allCodes: state.allCodes.filter((code) => code.index !== index),
    }));
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
