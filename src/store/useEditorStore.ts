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
  editorAutoSave: boolean;
  setEditorAutoSave: (editorAutoSave: boolean) => void;
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
  setEditorZoom: (editorZoom: number) => set({ editorZoom }),
  editorAutoSave:
    JSON.parse((localStorage as ILocalStorage).getItem('editor-auto-save')) ||
    false,
  setEditorAutoSave: (editorAutoSave: boolean) => set({ editorAutoSave }),
}));

// Export
export default useEditorStore;
