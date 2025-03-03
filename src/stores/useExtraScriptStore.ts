/**
 * This store is not used and was replaced by a new system, and may be removed
 * in the future if it persists to be unused.
 */

// Import dependencies
import { create } from 'zustand';
// Import types
import { IExtraScriptStore, ILocalStorage } from '@/types';

// Create the store
const useExtraScriptStore = create<IExtraScriptStore>((set) => ({
  extraScripts:
    JSON.parse((localStorage as ILocalStorage).getItem('extra-scripts')) || [],
  setExtraScripts: (extraScripts) => set({ extraScripts }),

  addExtraScript: () =>
    set((state) => {
      const extraScripts = [...state.extraScripts];
      const newScript = {
        name: `Extra Script ${extraScripts.length + 1}`,
        value: '/* Add your extra script here */',
      };

      set({ currentExtraScript: extraScripts.length });

      return { extraScripts: [...extraScripts, newScript] };
    }),
  renameExtraScript: (newName) =>
    set((state) => {
      const extraScripts = [...state.extraScripts];
      extraScripts[state.currentExtraScript].name = newName;

      return { extraScripts };
    }),
  updateExtraScript: (value) =>
    set((state) => {
      const extraScripts = [...state.extraScripts];
      extraScripts[state.currentExtraScript].value = value;

      return { extraScripts };
    }),
  clearExtraScripts: () =>
    set((state) => {
      const extraScripts = [...state.extraScripts];
      extraScripts[state.currentExtraScript].value = '';

      return { extraScripts };
    }),
  deleteExtraScript: () => {
    set((state) => {
      const extraScripts = [...state.extraScripts];
      const currentExtraScript = state.currentExtraScript;

      extraScripts.splice(currentExtraScript, 1);

      if (currentExtraScript > 0) {
        set({ currentExtraScript: currentExtraScript - 1 });
      }

      return { extraScripts };
    });
  },
  deleteAllExtraScripts: () => {
    set({ extraScripts: [] });
    set({ currentExtraScript: 0 });
  },

  currentExtraScript: Number(localStorage.getItem('active-extra-script')) || 0,
  setCurrentExtraScript: (currentExtraScript) => set({ currentExtraScript }),
}));

// Export the store
export default useExtraScriptStore;
