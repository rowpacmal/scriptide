// Import dependencies
import { createContext, useRef, useEffect } from 'react';
// Import store
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import hooks
import useTryCatch from '@/hooks/useTryCatch';
// Import libraries
import { mds } from './lib/minima';
// Import types
import { IAppContext, IProps } from './types';

// App context
export const appContext = createContext<IAppContext>({});

// App provider component
function AppProvider({ children }: IProps) {
  // Define trycatch
  // This custom hook is not working as intended and needs to be fixed
  const tryCatch = useTryCatch();

  // Define refs
  const loaded = useRef(false);

  // Define effects
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      // Initialize MDS
      mds.init((msg) => {
        if (msg.event === 'inited') {
          // For now we do nothing when MDS is inited.
          // Ideally we would initialize MDS in the service.js file.
        }
      });
    }
  }, [loaded]);

  useEffect(() => {
    tryCatch(async () => {
      // Refresh workspaces on load
      await useWorkspaceStore.getState().refreshWorkspaces();
    });
  }, []);

  // Render
  return <appContext.Provider value={{}}>{children}</appContext.Provider>;
}

// Export
export default AppProvider;
