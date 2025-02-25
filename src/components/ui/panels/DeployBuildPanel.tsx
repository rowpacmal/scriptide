import {
  Box,
  Button,
  Checkbox,
  Code,
  HStack,
  Modal,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Workspace from '../Workspace';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import useFileStore from '@/stores/useFileStore';
import { useEffect, useState } from 'react';
import useDeploymentStore from '@/stores/useDeploymentStore';
import useEditorStore from '@/stores/useEditorStore';
import parseComments from '@/utils/parseComments';
import minima from '@/lib/minima';
import { LuFileCode2 } from 'react-icons/lu';
import ConfirmModal from '../modals/ConfirmModal';
import KissVMFiles from '../KissVMFiles';

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
function OverviewItem({ children, title, h = 'auto', className = '' }: any) {
  return (
    <VStack w="100%" gap={0.5}>
      <Text w="100%" as="h3" pl={1} fontSize="xs" textTransform="uppercase">
        {title}
      </Text>

      <Box bg="gray.900" w="100%" p={2} pb={0.5} borderRadius="md">
        <Code
          as="pre"
          w="100%"
          bg="transparent"
          color="gray.500"
          overflow="auto"
          whiteSpace="pre-wrap"
          h={h}
          className={className}
        >
          {children}
        </Code>
      </Box>
    </VStack>
  );
}

// Deploy panel component
function DeployBuildPanel() {
  // Define toast
  const toast = useToast();

  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define store
  const code = useEditorStore((state) => state.code);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const currentFile = useFileStore((state) => state.currentFile);
  const deployedScripts = useDeploymentStore((state) => state.deployedScripts);
  const getAllScripts = useDeploymentStore((state) => state.getAllScripts);
  const deployScript = useDeploymentStore((state) => state.deployScript);
  const removeScript = useDeploymentStore((state) => state.removeScript);

  // Define state
  const [trackall, setTrackall] = useState(false);
  const [clean, setClean] = useState(false);
  const [activeScript, setActiveScript]: [any, any] = useState(null);

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
          <VStack w="100%" gap={1}>
            <Text as="h3" w="100%" textTransform="uppercase" fontSize="xs">
              Workspaces
            </Text>

            <Workspace />
          </VStack>

          <VStack w="100%" gap={1}>
            <Text as="h3" w="100%" textTransform="uppercase" fontSize="xs">
              KissVM Scripts
            </Text>

            <KissVMFiles />
          </VStack>
        </VStack>

        <HStack w="100%" gap={1} px={1} justify="space-between">
          <HStack w="100%" rowGap={0} columnGap={4} flexWrap="wrap">
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

        {deployedScripts.length > 0 ? (
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
            {deployedScripts.map((script: any, index) => (
              <Box
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
                <HStack
                  w="100%"
                  borderRadius={0}
                  border="1px solid"
                  borderColor="transparent"
                  justifyContent="space-between"
                  gap={0}
                  color="gray.500"
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
          <Text w="100%" color="gray.500">
            No deployed scripts
          </Text>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ConfirmModal
          title="Script Details"
          buttonLabel="Delete"
          colorScheme="red"
          onClose={onClose}
          onClick={() => {
            removeScript(activeScript?.address);
            toast({
              title: 'Script deletion pending',
              description:
                'A script deletion request is pending. Please go to the "Pending" dapp to view the request.',
              status: 'warning',
              duration: 9000,
              isClosable: true,
            });
          }}
          disabled={activeScript?.default}
        >
          <VStack w="100%">
            <HStack gap={4} bg="gray.900" px={2} py={1} borderRadius="md">
              <Checkbox
                cursor="default"
                size="sm"
                colorScheme="blue"
                borderColor="gray.500"
                _checked={{ color: 'blue.500' }}
                isChecked={activeScript?.default}
              >
                Default
              </Checkbox>

              <Checkbox
                cursor="default"
                size="sm"
                colorScheme="blue"
                borderColor="gray.500"
                _checked={{ color: 'blue.500' }}
                isChecked={activeScript?.simple}
              >
                Simple
              </Checkbox>

              <Checkbox
                cursor="default"
                size="sm"
                colorScheme="blue"
                borderColor="gray.500"
                _checked={{ color: 'blue.500' }}
                isChecked={activeScript?.track}
              >
                Track
              </Checkbox>
            </HStack>

            <OverviewItem title="Address">{activeScript?.address}</OverviewItem>

            <OverviewItem title="MxAddress">
              {activeScript?.miniaddress}
            </OverviewItem>

            <OverviewItem title="Public Key">
              {activeScript?.publickey}
            </OverviewItem>

            <OverviewItem title="Script" h={24} className="scrollbar">
              {activeScript?.script}
            </OverviewItem>
          </VStack>
        </ConfirmModal>
      </Modal>
    </>
  );
}

// Export
export default DeployBuildPanel;
