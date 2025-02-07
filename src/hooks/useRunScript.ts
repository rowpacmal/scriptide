/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { useToast } from '@chakra-ui/react';
import { useContext } from 'react';
// Import utils
import parseComments from '../utils/parseComments';
// Import libraries
import minima from '@/lib/minima';
// Import store
import useConsoleStore from '@/store/useConsoleStore';
import useEditorStore from '@/store/useEditorStore';
// Import context
import { appContext } from '../AppContext';

// Run script hook
function useRunScript() {
  // Define toast
  const toast = useToast();

  // Define store
  const code = useEditorStore((state) => state.code);
  const extendConsoleOut = useConsoleStore((state) => state.extendConsoleOut);

  // Define context
  const {
    setScript0xAddress,
    setScriptMxAddress,
    setScriptParse,
    setScriptSuccess,
    setScriptMonotonic,
    setScriptVariables,
    setTotalScriptInstructions,
    setCleanScript,
    globals,
    signatures,
    stateVariables,
    prevStateVariables,
    extraScripts,
  } = useContext(appContext);

  // Define handler
  async function handleRunScript(): Promise<void> {
    // Check for code in the editor
    if (!code) {
      return;
    }

    // Get the code from the editor
    const txt = code.trim();
    // console.log(txt);

    //Check for killer characters (single or double quotes) before parsing
    if (txt.indexOf("'") != -1 || txt.indexOf('"') != -1) {
      toast({
        title: 'NO single or double Quotes Allowed in Scripts!',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // Get the script and parse out types and comments
    let script = txt.replace(/\s+/g, ' ').trim();
    script = script.replaceAll('$[', '[');
    script = script.replaceAll(' = ', '=');
    script = script.replace(
      /\??\s*:\s*\b(hex|number|string|script|boolean|any|unknown)\b(\s*\|\s*\b(hex|number|string|script|boolean|any|unknown)\b)*/g,
      ''
    );
    script = parseComments(script).trim();
    if (script == '') {
      return;
    }
    // console.log(script);

    //Check for killer characters (commas, colons, semi-colons) after parsing
    if (script.indexOf(',') != -1) {
      toast({
        title: 'NO commas Allowed in Scripts!',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (script.indexOf(':') != -1 || script.indexOf(';') != -1) {
      toast({
        title: 'NO colon or semi-colons Allowed in Scripts!',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // Get the state variables and stringify them
    let stateVars = {};
    for (const { index, value } of stateVariables) {
      if (value !== '') {
        stateVars[index] = value;
      }
    }
    stateVars = JSON.stringify(stateVars);
    // console.log(stateVars);

    // Get the prev state variables and stringify them
    let prevStateVars = {};
    for (const { index, value } of prevStateVariables) {
      if (value !== '') {
        prevStateVars[index] = value;
      }
    }
    prevStateVars = JSON.stringify(prevStateVars);
    // console.log(prevStateVars);

    // Get the globals and stringify them
    let globalVariables = {};
    for (const [name, value] of Object.entries(globals)) {
      if (value !== '') {
        globalVariables[name] = value;
      }
    }

    /* Get the mmrproof of the run script, taking the returned address (data)
     * of the script and passing it into the global variables object before run.
     */
    const {
      root: { data: atAddress },
    }: any = (await minima.cmd(`mmrcreate nodes:["${script}"]`)).response;
    // console.log(atAddress);

    globalVariables['@ADDRESS'] = atAddress;
    globalVariables = JSON.stringify(globalVariables);
    // console.log(globalVariables);

    // Get the signatures and stringify them
    let signers: string[] | string = [];
    for (const value of signatures) {
      if (value !== '') {
        signers.push(value);
      }
    }
    signers = JSON.stringify(signers);
    // console.log(signers);

    // Get the extra scripts and stringify them
    let extraScriptsStr = {};
    for (let i = 0; i < extraScripts.length; i++) {
      const { value } = extraScripts[i];
      const extraTxt = value.trim();
      let extraScript = extraTxt.replace(/\s+/g, ' ').trim();
      extraScript = parseComments(extraScript).trim();

      if (extraScript !== '') {
        // Get the mmrproof
        const {
          nodes: [{ proof }],
          root: { data },
        }: any = (await minima.cmd(`mmrcreate nodes:["${extraScript}"]`))
          .response;
        // console.log(proof, data);

        extraScriptsStr[extraScript] = proof;
        // extraScriptsStr[extraScript] = ''; // Empty proof

        // Dynamically add extra script address to script before running
        script = script.replace(`@X${i}`, data);
        // console.log(script);
      }
    }
    extraScriptsStr = JSON.stringify(extraScriptsStr);
    // console.log(extraScriptsStr);

    // Run the script
    const cmd = `runscript script:"${script}" globals:${globalVariables} state:${stateVars} prevstate:${prevStateVars} signatures:${signers} extrascripts:${extraScriptsStr}`;

    (window as any).MDS.cmd(cmd, (msg) => {
      // console.log(msg);

      if (msg.status) {
        const {
          clean: { address, mxaddress, script },
          monotonic,
          parseok,
          success,
          trace,
          variables,
        } = msg.response;

        const consoleOut = trace.split('\n');
        consoleOut.splice(-1, 1, '---------------------------------');

        const timestamp: string[] = [];
        for (let i = 0; i < consoleOut.length; i++) {
          if (consoleOut[i].includes('Contract instructions')) {
            setTotalScriptInstructions(
              consoleOut[i].split(':')[1].trim().split(' ')[0]
            );
          }

          timestamp.push(new Date().toLocaleTimeString());
        }

        extendConsoleOut(consoleOut, timestamp);

        setScriptParse(parseok);
        setScriptSuccess(success);
        setScriptMonotonic(monotonic);

        setScript0xAddress(address);
        setScriptMxAddress(mxaddress);
        setCleanScript(script);

        setScriptVariables(variables);
      } else if (!msg.status) {
        toast({
          title: 'Error Running Script',
          description: msg.error || 'Something went wrong running the script.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    });
  }

  // Return run script
  return handleRunScript;
}

// Export
export default useRunScript;
