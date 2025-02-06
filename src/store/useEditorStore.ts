// Import dependencies
import { create } from 'zustand';

// Types for the store
type TCode = string | null;

// Interface for the store
interface IEditorStore {
  code: TCode;
  setCode: (code: TCode) => void;

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
  setItem: (key: string, value: string) => void;
}

// Create the store
const useEditorStore = create<IEditorStore>()((set) => ({
  code: null,
  setCode: (code: TCode) => set({ code }),

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
