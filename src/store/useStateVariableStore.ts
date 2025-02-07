// Import dependencies
import { create } from 'zustand';

// Types for the store
type TVariables = { index: number; value: string }[];

// Interface for the store
interface IStateVariableStore {
  stateVariables: TVariables;
  setStateVariables: (stateVariables: TVariables) => void;

  addStateVariable: () => void;
  updateStateVariableKey: (index: number, value: string) => void;
  updateStateVariableValue: (index: number, value: string) => void;
  removeStateVariable: (index?: number) => void;
  removeAllStateVariables: () => void;
}

// Create the store
const useStateVariableStore = create<IStateVariableStore>((set) => ({
  stateVariables: [],
  setStateVariables: (stateVariables: TVariables) => set({ stateVariables }),

  addStateVariable: () => {
    set((state) => {
      const stateVariables = state.stateVariables;
      const lastVariable = stateVariables[stateVariables.length - 1];
      const newVariable = {
        index:
          stateVariables.length > 0
            ? lastVariable.index === 255
              ? 255
              : lastVariable.index + 1
            : 0,
        value: '',
      };

      return {
        stateVariables: [...stateVariables, newVariable],
      };
    });
  },
  updateStateVariableKey: (index: number, value: string) => {
    set((state) => {
      if (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 255) {
        return { stateVariables: state.stateVariables };
      }

      const stateVariables = [...state.stateVariables];
      stateVariables[index].index = Number(value);

      return { stateVariables };
    });
  },
  updateStateVariableValue: (index: number, value: string) => {
    set((state) => {
      const stateVariables = [...state.stateVariables];
      stateVariables[index].value = value;

      return { stateVariables };
    });
  },
  removeStateVariable: (index?: number) => {
    if (index) {
      set((state) => ({
        stateVariables: state.stateVariables.filter((_, i) => i !== index),
      }));
    } else {
      set((state) => {
        const stateVariables = [...state.stateVariables];
        stateVariables.pop();

        return { stateVariables };
      });
    }
  },
  removeAllStateVariables: () => set({ stateVariables: [] }),
}));

// Export the store
export default useStateVariableStore;
