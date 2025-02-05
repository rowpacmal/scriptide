// Import dependencies
import { create } from 'zustand';

// Types for the store
type code = string | null;

// Interface for the store
interface EditorStoreState {
  code: code;
  setCode: (code: code) => void;
}

// Create the store
export const useEditorStore = create<EditorStoreState>()((set) => ({
  code: null,
  setCode: (code: code) => set({ code }),
}));

// Export
export default useEditorStore;
