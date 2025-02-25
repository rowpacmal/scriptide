// Import dependencies
import { create } from 'zustand';

// Types for the store
type TStatus = boolean | null;
type TVariables = {
  [key: string]: string;
};

// Interface for the store
interface IRunScriptStore {
  cleanScript: string;
  setCleanScript: (cleanScript: string) => void;

  script0xAddress: string;
  setScript0xAddress: (script0xAddress: string) => void;

  scriptMxAddress: string;
  setScriptMxAddress: (scriptMxAddress: string) => void;

  scriptParse: TStatus;
  setScriptParse: (scriptParse: TStatus) => void;

  scriptSuccess: TStatus;
  setScriptSuccess: (scriptSuccess: TStatus) => void;

  scriptMonotonic: TStatus;
  setScriptMonotonic: (scriptMonotonic: TStatus) => void;

  scriptVariables: TVariables;
  setScriptVariables: (scriptVariables: TVariables) => void;

  totalScriptInstructions: string;
  setTotalScriptInstructions: (totalScriptInstructions: string) => void;
}

// Create the store
export const useRunScriptStore = create<IRunScriptStore>((set) => ({
  cleanScript: '',
  setCleanScript: (cleanScript: string) => set({ cleanScript }),

  script0xAddress: '',
  setScript0xAddress: (script0xAddress: string) => set({ script0xAddress }),

  scriptMxAddress: '',
  setScriptMxAddress: (scriptMxAddress: string) => set({ scriptMxAddress }),

  scriptParse: null,
  setScriptParse: (scriptParse: TStatus) => set({ scriptParse }),

  scriptSuccess: null,
  setScriptSuccess: (scriptSuccess: TStatus) => set({ scriptSuccess }),

  scriptMonotonic: null,
  setScriptMonotonic: (scriptMonotonic: TStatus) => set({ scriptMonotonic }),

  scriptVariables: {} as TVariables,
  setScriptVariables: (scriptVariables: TVariables) => set({ scriptVariables }),

  totalScriptInstructions: '',
  setTotalScriptInstructions: (totalScriptInstructions: string) =>
    set({ totalScriptInstructions }),
}));

export default useRunScriptStore;
