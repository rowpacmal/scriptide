// Import dependencies
import { create } from 'zustand';
// Import types
import { IExtraScriptStore, ILocalStorage, TExtraScript } from '@/types';

// Create the store
const useExtraScriptStore = create<IExtraScriptStore>((set) => ({
  extraScripts:
    JSON.parse((localStorage as ILocalStorage).getItem('extra-scripts')) || [],
  setExtraScripts: (extraScripts: TExtraScript) => set({ extraScripts }),

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
  renameExtraScript: (newName: string) =>
    set((state) => {
      const extraScripts = [...state.extraScripts];
      extraScripts[state.currentExtraScript].name = newName;

      return { extraScripts };
    }),
  updateExtraScript: (value: string) =>
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
  setCurrentExtraScript: (currentExtraScript: number) =>
    set({ currentExtraScript }),
}));

// Export the store
export default useExtraScriptStore;
