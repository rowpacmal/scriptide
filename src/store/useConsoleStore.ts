// Import dependencies
import { create } from 'zustand';
// Import constants
import {
  CONSOLE_DEFAULT,
  CONSOLE_DEFAULT_CLEARED,
  CONSOLE_DEFAULT_TIMESTAMP,
} from '@/constants';

// Interface for the store
interface IConsoleStore {
  consoleOutput: string[];
  setConsoleOutput: (consoleOutput: string[]) => void;

  consoleTimestamp: string[];
  setConsoleTimestamp: (consoleTimestamp: string[]) => void;

  clearConsoleOut: () => void;
}

// Create the store
export const useConsoleStore = create<IConsoleStore>((set) => ({
  consoleOutput: CONSOLE_DEFAULT,
  setConsoleOutput: (consoleOutput) => set({ consoleOutput }),

  consoleTimestamp: CONSOLE_DEFAULT_TIMESTAMP,
  setConsoleTimestamp: (consoleTimestamp) => set({ consoleTimestamp }),

  clearConsoleOut: () => {
    set({ consoleOutput: CONSOLE_DEFAULT_CLEARED.console });
    set({ consoleTimestamp: CONSOLE_DEFAULT_CLEARED.timestamp });
  },
}));

// Export the store
export default useConsoleStore;
