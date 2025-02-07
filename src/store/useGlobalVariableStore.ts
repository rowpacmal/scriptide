// Import dependencies
import { create } from 'zustand';
// Import constants
import { GLOBALS_DEFAULT_OBJECT } from '@/constants';

// Types for the store
type TGlobals = {
  '@ADDRESS': string | null;
  '@BLOCK': string;
  '@BLOCKMILLI': string;
  '@CREATED': string;
  '@COINAGE': string;
  '@COINID': string;
  '@TOKENID': string;
  '@AMOUNT': string;
  '@INPUT': string;
  '@TOTIN': string;
  '@TOTOUT': string;
};

// Interface for the store
interface IGlobalVariableStore {
  globals: TGlobals;
  setGlobals: (globals: TGlobals) => void;

  globalUpdate: (key: string, value: string) => void;
}

// Create the store
const useGlobalVariableStore = create<IGlobalVariableStore>((set) => ({
  globals: GLOBALS_DEFAULT_OBJECT,
  setGlobals: (globals: TGlobals) => set({ globals }),

  globalUpdate: (key: string, value: string) =>
    set((state) => ({ globals: { ...state.globals, [key]: value } })),
}));

// Export the store
export default useGlobalVariableStore;
