// Import dependencies
import { create } from 'zustand';

// Enum for the navigation states
export enum NAVIGATION_STATES {
  HOME = 'home',
  EXPLORER = 'explorer',
  SEARCH = 'search',
  KISS_VM = 'kissVM',
  DEPLOY_BUILD = 'deployBuild',
  PLUGINS = 'plugins',
  SETTINGS = 'settings',
}

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
