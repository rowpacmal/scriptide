// Import dependencies
import { create } from 'zustand';

// Interface for the store
interface INavigationStore {
  navigation: string;
  setNavigation: (navigation: string) => void;
}

// Create the store
const useNavigationStore = create<INavigationStore>((set) => ({
  navigation: localStorage.getItem('navigation-state') || 'home',
  setNavigation: (navigation: string) => {
    set({ navigation });
    localStorage.setItem('navigation-state', navigation);
  },
}));

export default useNavigationStore;
