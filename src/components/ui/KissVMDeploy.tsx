// Import dependencies
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
import { useEffect, useState } from 'react';
// Import icons
import { LuFileCode2 } from 'react-icons/lu';
// Import stores
import useDeploymentStore from '@/stores/useDeploymentStore';
import useFileStore from '@/stores/useFileStore';
import useModalStore from '@/stores/useModalStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import types
import { EModalTypes } from '@/types';
// Import hooks
import useRunScript from '@/hooks/useRunScript';
// Import components
import KissVMFiles from './KissVMFiles';
import KissVMFilesHeading from './KissVMFilesHeading';

// Checkbox option component
function CheckboxOption({
  children,
  label,
  onChange,
  isChecked = false,
  disabled = false,
}) {
  // Define theme
  const { colorAlt } = useAppTheme();

  // Render
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

// Deploy script component
function KissVMDeploy() {
  // Define toast
  const toast = useToast();

  // Define run script
  const { isRunning, handleRunScript } = useRunScript();

  // Define store
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
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
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!currentFile.endsWith('.kvm')) {
      toast({
        title: 'Only .kvm files can be deployed!',
        description: 'Please select a .kvm file',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const { cleanscript, parseok } = (await handleRunScript({
      setExtraScripts: true,
    })) || { cleanscript: '', parseok: false };

    if (!parseok) {
      toast({
        title: 'Deploy Failed',
        description: 'Unable to deploy script due to parsing error.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    deployScript(cleanscript, trackall, clean);
  }

  // Define effect
  useEffect(() => {
    getAllScripts();
  }, [getAllScripts]);

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
                </Code>
                &nbsp;will track all coins with this script address.
                <br />
                <Code fontSize="inherit" bg={bgAlt}>
                  OFF
                </Code>
                &nbsp;will only track coins with this script address that are
                relevant to you.
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
                </Code>
                &nbsp;will clean the script to its minimal correct
                representation.
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
            onClick={handleDeploy}
            isLoading={isRunning}
            disabled={!currentWorkspace || !currentFile || isRunning}
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
            {deployedScripts.map((script, index) => (
              <Box
                key={index}
                w="100%"
                cursor="pointer"
                color={colorAlt}
                borderRadius="sm"
                isTruncated
                onClick={() => {
                  setModalType(EModalTypes.VIEW_SCRIPT);
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
