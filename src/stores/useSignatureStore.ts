// Import dependencies
import { create } from 'zustand';

// Interface for the store
interface ISignatureStore {
  signatures: string[];
  setSignatures: (signatures: string[]) => void;

  addSignature: () => void;
  updateSignature: (index: number, value: string) => void;
  removeSignature: (index?: number) => void;
}

// Create the store
const useSignatureStore = create<ISignatureStore>((set) => ({
  signatures: [],
  setSignatures: (signatures: string[]) => set({ signatures }),

  addSignature: () =>
    set((state) => ({ signatures: [...state.signatures, ''] })),
  updateSignature: (index: number, value: string) => {
    set((state) => {
      const signatures = [...state.signatures];
      signatures[index] = value;

      return { signatures };
    });
  },
  removeSignature: (index?: number) => {
    if (index) {
      set((state) => ({
        signatures: state.signatures.filter((_, i) => i !== index),
      }));
    } else {
      set((state) => {
        const signatures = [...state.signatures];
        signatures.pop();

        return { signatures };
      });
    }
  },
}));

// Export the store
export default useSignatureStore;
