import {
  Box,
  Button,
  Checkbox,
  HStack,
  Modal,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Workspace from './Workspace';
import Files from './Files';
import useWorkspaceStore from '@/store/useWorkspaceStore';
import useFileStore from '@/store/useFileStore';
import { useEffect, useState } from 'react';
import useDeployment from '@/store/useDeployment';
import InfoModal from './InfoModal';
import useEditorStore from '@/store/useEditorStore';
import parseComments from '@/utils/parseComments';
import minima from '@/lib/minima';

// Util component
function CheckboxOption({
  children,
  label,
  onChange,
  isChecked = false,
  disabled = false,
}) {
  return (
    <Tooltip
      label={label}
      openDelay={500}
      placement="right"
      hasArrow
      fontWeight="normal"
    >
      <Box>
        <Checkbox
          size="sm"
          borderColor="gray.500"
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
function Deploy() {
  // Define toast
  const toast = useToast();

  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define store
  const code = useEditorStore((state) => state.code);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const currentFile = useFileStore((state) => state.currentFile);
  const deployedScripts = useDeployment((state) => state.deployedScripts);
  const getAllScripts = useDeployment((state) => state.getAllScripts);
  const deployScript = useDeployment((state) => state.deployScript);

  // Define state
  const [trackall, setTrackall] = useState(false);
  const [clean, setClean] = useState(false);
  const [activeScript, setActiveScript]: [any, any] = useState(null);

  // Define handlers
  async function handleDeploy() {
    if (!currentWorkspace || !currentFile || !code) {
      return;
    }

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

    if (!script) {
      return;
    }

    const {
      clean: { script: cleanScript },
      parseok,
    } = (await minima.cmd(`runscript script:"${script}"`)).response;

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
    <>
      <VStack w="100%" h="100%" fontSize="sm" gap={3} color="gray.500">
        <VStack w="100%" gap={1}>
          <Text as="h3" w="100%" textTransform="uppercase" fontSize="xs">
            Workspaces
          </Text>

          <Workspace />
        </VStack>

        <VStack w="100%" gap={1}>
          <Text as="h3" w="100%" textTransform="uppercase" fontSize="xs">
            Scripts
          </Text>

          <Files />
        </VStack>

        <HStack w="100%" gap={1} px={1} justify="space-between">
          <HStack w="100%" gap={4}>
            <CheckboxOption
              label="ON will track all coins with this script address. OFF will only track coins with this script address that are relevant to you."
              onChange={() => setTrackall(!trackall)}
              isChecked={trackall}
            >
              Track all
            </CheckboxOption>

            <CheckboxOption
              label="ON will clean the script to its minimal correct representation."
              onChange={() => setClean(!clean)}
              isChecked={clean}
            >
              Clean
            </CheckboxOption>
          </HStack>

          <Box>
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
        </HStack>

        <VStack
          w="100%"
          flexGrow="1"
          maxH="26.65rem"
          borderTop="1px solid"
          borderLeft="1px solid"
          borderBottom="1px solid"
          borderColor="gray.700"
          p={1}
          gap={0.5}
          overflowY="scroll"
          className="alt-scrollbar"
        >
          {deployedScripts.length > 0 ? (
            <>
              {deployedScripts.map((script: any, index) => (
                <Text
                  key={index}
                  w="100%"
                  cursor="pointer"
                  minH="fit-content"
                  color="gray.500"
                  isTruncated
                  onClick={() => {
                    setActiveScript(script);
                    onOpen();
                  }}
                  _hover={{ bg: 'gray.700' }}
                  px={1}
                >
                  {script.address}
                </Text>
              ))}
            </>
          ) : (
            <Text w="100%" color="gray.500">
              No deployed scripts
            </Text>
          )}
        </VStack>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <InfoModal title="Script Details" onClose={onClose}>
          <Text>Address: {activeScript?.address}</Text>
          <Text>MxAddress: {activeScript?.miniaddress}</Text>
          <Text>PublicKey: {activeScript?.publickey}</Text>
          <Text>Default: {activeScript?.default ? 'true' : 'false'}</Text>
          <Text>Simple: {activeScript?.simple ? 'true' : 'false'}</Text>
          <Text>Track: {activeScript?.track ? 'true' : 'false'}</Text>
          <Text border="1px solid" borderColor="gray.700" px={2} py={1}>
            {activeScript?.script}
          </Text>
        </InfoModal>
      </Modal>
    </>
  );
}

// Export
export default Deploy;
