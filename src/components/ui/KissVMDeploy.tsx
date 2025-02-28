/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Box,
  Button,
  Checkbox,
  Code,
  HStack,
  Text,
  Tooltip,
  useToast,
  VStack,
} from '@chakra-ui/react';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import useFileStore from '@/stores/useFileStore';
import { useEffect, useState } from 'react';
import useDeploymentStore from '@/stores/useDeploymentStore';
import useEditorStore from '@/stores/useEditorStore';
import parseComments from '@/utils/parseComments';
import minima from '@/lib/minima';
import { LuFileCode2 } from 'react-icons/lu';
import KissVMFiles from './KissVMFiles';
import useModalStore, { MODAL_TYPES } from '@/stores/useModalStore';
import useAppTheme from '@/themes/useAppTheme';
import KissVMFilesHeading from './KissVMFilesHeading';

// Util component
function CheckboxOption({
  children,
  label,
  onChange,
  isChecked = false,
  disabled = false,
}) {
  // Define theme
  const { colorAlt } = useAppTheme();

  return (
    <Tooltip
      label={label}
      openDelay={300}
      placement="right"
      hasArrow
      fontWeight="normal"
      // fontSize="xs"
    >
      <Box>
        <Checkbox
          size="sm"
          borderColor={colorAlt}
          textTransform="uppercase"
          onChange={onChange}
          isChecked={isChecked}
          isDisabled={disabled}
        >
          <Text fontSize="xs">{children}</Text>
        </Checkbox>
      </Box>
    </Tooltip>
  );
}

// Deploy panel component
function KissVMDeploy() {
  // Define toast
  const toast = useToast();

  // Define disclosure

  // Define store
  const allCodes = useEditorStore((state) => state.allCodes);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const files = useFileStore((state) => state.files);
  const currentFile = useFileStore((state) => state.currentFile);
  const deployedScripts = useDeploymentStore((state) => state.deployedScripts);
  const getAllScripts = useDeploymentStore((state) => state.getAllScripts);
  const deployScript = useDeploymentStore((state) => state.deployScript);
  const setModalProps = useModalStore((state) => state.setModalProps);
  const setModalType = useModalStore((state) => state.setModalType);
  const onOpen = useModalStore((state) => state.onOpen);

  // Define state
  const [trackall, setTrackall] = useState(false);
  const [clean, setClean] = useState(false);

  // Define theme
  const { bgAlt, borderColor, color, colorAlt } = useAppTheme();

  // Define handlers
  async function handleDeploy() {
    if (!currentWorkspace || !currentFile) {
      toast({
        title: 'No workspace or file selected!',
        status: 'warning',
        duration: 6000,
        isClosable: true,
      });
      return;
    }

    if (!currentFile.endsWith('.kvm')) {
      toast({
        title: 'Only .kvm files can be deployed!',
        description: 'Please select a .kvm file',
        status: 'warning',
        duration: 6000,
        isClosable: true,
      });
      return;
    }

    const code = allCodes.find((c) => c.file === currentFile)?.code;

    // Check for code in the editor
    if (!code) {
      toast({
        title: 'No code in the editor!',
        status: 'warning',
        duration: 6000,
        isClosable: true,
      });
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

    if (!script) {
      return;
    }

    // Get the extra scripts and stringify them
    let extraScriptsStr = {};
    for (const file of files.filter(
      (f: any) =>
        f.location.split('/').splice(3)[0] === 'contracts' &&
        f.name.endsWith('.kvm')
    )) {
      // Get the name and location
      const { location } = file;
      const name = file.name.split('.')[0];

      // Check if the script imports the extra script
      if (script.includes(`@[${name}]`)) {
        // load imported script data and clean it
        const value = (await minima.file.load(location)).response.load.data;
        // console.log(value);
        const extraTxt = value.trim();
        let extraScript = extraTxt.replace(/\s+/g, ' ').trim();
        extraScript = parseComments(extraScript).trim();

        // If the extra script is not empty, get the script mmrproof and address
        const {
          nodes: [{ proof }],
          root: { data },
        }: any = (await minima.cmd(`mmrcreate nodes:["${extraScript}"]`))
          .response;
        // console.log(proof, data);

        // Add the script and proof to the extraScriptsStr
        extraScriptsStr[extraScript] = proof;

        // Dynamically add imported extra script address to script before running
        script = script.replaceAll(`@[${name}]`, data);
        // console.log(script);
      }
    }
    extraScriptsStr = JSON.stringify(extraScriptsStr);

    const {
      clean: { script: cleanScript },
      parseok,
    } = (
      await minima.cmd(
        `runscript script:"${script}" extrascripts:${extraScriptsStr}`
      )
    ).response;

    if (!parseok) {
      toast({
        title: 'Deploy Failed',
        description: 'Unable to deploy script due to parse error.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    deployScript(cleanScript, trackall, clean);
  }

  // Define effect
  useEffect(() => {
    getAllScripts();
  }, []);

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={3} color={colorAlt}>
      <VStack w="100%" gap={1}>
        <KissVMFilesHeading />

        <KissVMFiles />
      </VStack>

      <VStack w="100%" gap={1}>
        <HStack rowGap={0} columnGap={4} flexWrap="wrap">
          <CheckboxOption
            label={
              <>
                <Code fontSize="inherit" bg={bgAlt}>
                  ON
                </Code>{' '}
                will track all coins with this script address.
                <br />
                <Code fontSize="inherit" bg={bgAlt}>
                  OFF
                </Code>{' '}
                will only track coins with this script address that are relevant
                to you.
              </>
            }
            onChange={() => setTrackall(!trackall)}
            isChecked={trackall}
          >
            Track all
          </CheckboxOption>

          <CheckboxOption
            label={
              <>
                <Code fontSize="inherit" bg={bgAlt}>
                  ON
                </Code>{' '}
                will clean the script to its minimal correct representation.
              </>
            }
            onChange={() => setClean(!clean)}
            isChecked={clean}
          >
            Clean
          </CheckboxOption>
        </HStack>

        <Box w="100%" maxW="24rem">
          <Button
            w="100%"
            size="sm"
            colorScheme="blue"
            disabled={!currentWorkspace || !currentFile}
            onClick={handleDeploy}
          >
            Deploy
          </Button>
        </Box>
      </VStack>

      <Box w="100%" h="20rem">
        {deployedScripts.length > 0 ? (
          <VStack
            w="100%"
            h="100%"
            border="1px solid"
            borderColor={borderColor}
            p={1}
            gap={0.5}
            overflowY="scroll"
            className="alt-scrollbar"
          >
            {deployedScripts.map((script: any, index) => (
              <Box
                key={index}
                w="100%"
                cursor="pointer"
                color={colorAlt}
                borderRadius="sm"
                isTruncated
                onClick={() => {
                  setModalType(MODAL_TYPES.VIEW_SCRIPT);
                  setModalProps(script);
                  onOpen();
                }}
                _hover={{ bg: borderColor, color }}
                px={1}
              >
                <HStack
                  w="100%"
                  borderRadius={0}
                  border="1px solid"
                  borderColor="transparent"
                  justifyContent="space-between"
                  gap={0}
                  bg="transparent"
                >
                  <Text
                    w="100%"
                    display="flex"
                    gap={1}
                    alignItems="center"
                    isTruncated
                  >
                    <Box as="span">
                      <LuFileCode2 />
                    </Box>

                    <Text as="span" isTruncated>
                      {script.address}
                    </Text>
                  </Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        ) : (
          <Text w="100%" color={colorAlt}>
            No deployed scripts
          </Text>
        )}
      </Box>
    </VStack>
  );
}

// Export
export default KissVMDeploy;
