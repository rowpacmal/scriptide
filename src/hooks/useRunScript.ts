// Import dependencies
import { useToast } from '@chakra-ui/react';
// Import utils
import parseComments from '../utils/parseComments';
// Import libraries
import minima, { mds } from '@/lib/minima';
// Import store
import useConsoleStore from '@/stores/useConsoleStore';
import useEditorStore from '@/stores/useEditorStore';
import useRunScriptStore from '@/stores/useRunScriptStore';
import useGlobalVariableStore from '@/stores/useGlobalVariableStore';
import useSignatureStore from '@/stores/useSignatureStore';
import useStateVariableStore from '@/stores/useStateVariableStore';
import usePrevStateVariableStore from '@/stores/usePrevStateVariableStore';
import useFileStore from '@/stores/useFileStore';
import { TFile, TMDSCommandMMRCreate, TMDSCommandRunScript } from '@/types';

// Run script hook
function useRunScript() {
  // Define toast
  const toast = useToast();

  // Define store
  const files = useFileStore((state) => state.files);
  const currentFile = useFileStore((state) => state.currentFile);
  const allCodes = useEditorStore((state) => state.allCodes);
  const globals = useGlobalVariableStore((state) => state.globals);
  const signatures = useSignatureStore((state) => state.signatures);
  const stateVariables = useStateVariableStore((state) => state.stateVariables);
  const prevStateVariables = usePrevStateVariableStore(
    (state) => state.prevStateVariables
  );

  const extendConsoleOut = useConsoleStore((state) => state.extendConsoleOut);
  const setCleanScript = useRunScriptStore((state) => state.setCleanScript);
  const setScript0xAddress = useRunScriptStore(
    (state) => state.setScript0xAddress
  );
  const setScriptMxAddress = useRunScriptStore(
    (state) => state.setScriptMxAddress
  );
  const setScriptParse = useRunScriptStore((state) => state.setScriptParse);
  const setScriptSuccess = useRunScriptStore((state) => state.setScriptSuccess);
  const setScriptMonotonic = useRunScriptStore(
    (state) => state.setScriptMonotonic
  );
  const setScriptVariables = useRunScriptStore(
    (state) => state.setScriptVariables
  );
  const setTotalScriptInstructions = useRunScriptStore(
    (state) => state.setTotalScriptInstructions
  );

  // Define handler
  async function handleRunScript(): Promise<void> {
    const code = allCodes.find((c) => c.file === currentFile)?.code;

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
    } = (
      await minima.cmd<TMDSCommandMMRCreate>(`mmrcreate nodes:["${script}"]`)
    ).response || { root: { data: '' } };
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
    for (const file of files.filter(
      (f: TFile) =>
        f.location.split('/').splice(3)[0] === 'contracts' &&
        f.name.endsWith('.kvm')
    )) {
      // Get the name and location
      const { location } = file;
      const name = file.name.split('.')[0];

      // Check if the script imports the extra script
      if (script.includes(`@[${name}]`)) {
        // load imported script data and clean it
        const value =
          (await minima.file.load(location)).response?.load.data || '';
        // console.log(value);
        const extraTxt = value.trim();
        let extraScript = extraTxt.replace(/\s+/g, ' ').trim();
        extraScript = parseComments(extraScript).trim();

        // If the extra script is not empty, get the script mmrproof and address
        const {
          nodes: [{ proof }],
          root: { data },
        } = (
          await minima.cmd<TMDSCommandMMRCreate>(
            `mmrcreate nodes:["${extraScript}"]`
          )
        ).response || { nodes: [{ proof: '' }], root: { data: '' } };
        // console.log(proof, data);

        // Add the script and proof to the extraScriptsStr
        extraScriptsStr[extraScript] = proof;

        // Dynamically add imported extra script address to script before running
        script = script.replaceAll(`@[${name}]`, data);
        // console.log(script);
      }
    }
    extraScriptsStr = JSON.stringify(extraScriptsStr);
    // console.log(extraScriptsStr);

    // Run the script
    const cmd = `runscript script:"${script}" globals:${globalVariables} state:${stateVars} prevstate:${prevStateVars} signatures:${signers} extrascripts:${extraScriptsStr}`;

    mds.cmd<TMDSCommandRunScript>(cmd, (msg) => {
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
        consoleOut.splice(-1, 1, '>> run script end <<');
        for (let i = 0; i < consoleOut.length; i++) {
          if (consoleOut[i].includes('Contract instructions')) {
            setTotalScriptInstructions(
              consoleOut[i].split(':')[1].trim().split(' ')[0]
            );
          }
        }

        extendConsoleOut('>> run script start << \n' + consoleOut.join('\n'));

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
