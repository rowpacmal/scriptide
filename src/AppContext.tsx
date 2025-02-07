/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { createContext, useRef, useEffect, useState } from 'react';
// Import constants
import {
  CONSOLE_DEFAULT,
  CONSOLE_DEFAULT_TIMESTAMP,
  GLOBALS_DEFAULT_OBJECT,
} from './constants';
// Import store
import useWorkspaceStore from './store/useWorkspaceStore';
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

  // Define run script states
  const [script0xAddress, setScript0xAddress] = useState('');
  const [scriptMxAddress, setScriptMxAddress] = useState('');
  const [scriptParse, setScriptParse] = useState(null);
  const [scriptSuccess, setScriptSuccess] = useState(null);
  const [scriptMonotonic, setScriptMonotonic] = useState(null);
  const [scriptVariables, setScriptVariables] = useState({});
  const [totalScriptInstructions, setTotalScriptInstructions] = useState('');
  const [cleanScript, setCleanScript] = useState('');

  // Define console states
  const [consoleOutput, setConsoleOutput] = useState(CONSOLE_DEFAULT);
  const [consoleTimestamp, setConsoleTimestamp] = useState(
    CONSOLE_DEFAULT_TIMESTAMP
  );

  // Define control states
  const [globals, setGlobals] = useState(GLOBALS_DEFAULT_OBJECT);
  const [signatures, setSignatures] = useState([]);
  const [stateVariables, setStateVariables] = useState([]);
  const [prevStateVariables, setPrevStateVariables] = useState([]);
  const [extraScripts, setExtraScripts] = useState(
    JSON.parse(localStorage.getItem('extra-scripts') as any) || []
  );

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
      useWorkspaceStore.setState((state) => ({
        currentWorkspace: state.workspaces[0],
      }));
    });
  }, []);

  // Temporary fix for saving extra scripts
  useEffect(() => {
    localStorage.setItem('extra-scripts', JSON.stringify(extraScripts));
  }, [extraScripts]);

  // Render
  return (
    <appContext.Provider
      value={{
        script0xAddress,
        setScript0xAddress,
        scriptMxAddress,
        setScriptMxAddress,
        scriptParse,
        setScriptParse,
        scriptSuccess,
        setScriptSuccess,
        scriptMonotonic,
        setScriptMonotonic,
        scriptVariables,
        setScriptVariables,
        totalScriptInstructions,
        setTotalScriptInstructions,
        cleanScript,
        setCleanScript,

        consoleOutput,
        setConsoleOutput,
        consoleTimestamp,
        setConsoleTimestamp,

        globals,
        setGlobals,
        signatures,
        setSignatures,
        stateVariables,
        setStateVariables,
        prevStateVariables,
        setPrevStateVariables,
        extraScripts,
        setExtraScripts,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

// Export
export default AppProvider;
