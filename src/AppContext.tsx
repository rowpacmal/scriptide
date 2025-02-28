/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { createContext, useRef, useEffect } from 'react';
// Import store
import useWorkspaceStore from './stores/useWorkspaceStore';
// Import hooks
import useTryCatch from './hooks/useTryCatch';

// Interfaces
interface IProps {
  children: any;
}

// App context
export const appContext = createContext({} as any);

// App provider
const AppProvider = ({ children }: IProps) => {
  // Define trycatch
  const tryCatch = useTryCatch();

  // Define refs
  const loaded = useRef(false);

  // Initialize MDS
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      (window as any).MDS.init((msg: any) => {
        if (msg.event === 'inited') {
          // do something Minim-y
        }
      });
    }
  }, [loaded]);

  // Get workspaces on load
  useEffect(() => {
    tryCatch(async () => {
      await useWorkspaceStore.getState().refreshWorkspaces();
    });
  }, []);

  // Render
  return <appContext.Provider value={{}}>{children}</appContext.Provider>;
};

// Export
export default AppProvider;
