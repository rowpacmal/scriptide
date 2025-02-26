// Import dependencies
import { create } from 'zustand';
// Import constants
import { CONSOLE_DEFAULT, CONSOLE_DEFAULT_CLEARED } from '@/constants';

// Interface for the store
interface IConsoleStore {
  consoleOutput: string;
  setConsoleOutput: (consoleOutput: string) => void;

  extendConsoleOut: (newOutput: string) => void;
  clearConsoleOut: () => void;
}

// Create the store
export const useConsoleStore = create<IConsoleStore>((set) => ({
  consoleOutput: CONSOLE_DEFAULT.join('\n'),
  setConsoleOutput: (consoleOutput) => set({ consoleOutput }),

  extendConsoleOut: (newOutput: string) => {
    set((state) => ({
      consoleOutput: state.consoleOutput + newOutput + '\n',
    }));
  },
  clearConsoleOut: () => {
    set({ consoleOutput: CONSOLE_DEFAULT_CLEARED.join('\n') });
  },
}));

// Export the store
export default useConsoleStore;
