// Import dependencies
import { create } from 'zustand';
// Import constants
import { GLOBALS_DEFAULT_OBJECT } from '@/constants';
// Import types
import { IGlobalVariableStore } from '@/types';

// Create the store
const useGlobalVariableStore = create<IGlobalVariableStore>((set) => ({
  globals: GLOBALS_DEFAULT_OBJECT,
  setGlobals: (globals) => set({ globals }),

  globalUpdate: (key, value) =>
    set((state) => ({ globals: { ...state.globals, [key]: value } })),
}));

// Export the store
export default useGlobalVariableStore;
