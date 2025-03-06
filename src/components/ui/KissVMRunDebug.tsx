import useRunScript from '@/hooks/useRunScript';
import useFileStore from '@/stores/useFileStore';
import useRunScriptStore from '@/stores/useRunScriptStore';
import useAppTheme from '@/themes/useAppTheme';
import {
  Box,
  Button,
  Card,
  Code,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import KissVMFiles from './KissVMFiles';
import Workspace from './Workspace';
import WorkspaceMenu from './WorkspaceMenu';
import KissVMFilesMenu from './KissVMFilesMenu';
import KissVMFilesHeading from './KissVMFilesHeading';

function ScriptStatus({ children, label, bool, colors = ['green', 'red'] }) {
  // Define theme
  const { colorAlt } = useAppTheme();

  return (
    <HStack gap={1}>
      <Text color={colorAlt} textTransform="uppercase">
        {label}
      </Text>

      <Code
        border="1px solid"
        borderColor="blackAlpha.300"
        colorScheme={bool === null ? 'gray' : bool ? colors[0] : colors[1]}
      >
        {children}
      </Code>
    </HStack>
  );
}

function KissVMRunDebug() {
  // Define stores
  const scriptParse = useRunScriptStore((state) => state.scriptParse);
  const scriptSuccess = useRunScriptStore((state) => state.scriptSuccess);
  const scriptMonotonic = useRunScriptStore((state) => state.scriptMonotonic);
  const currentFile = useFileStore((state) => state.currentFile);

  // Define theme
  const { bgAlt, colorAlt } = useAppTheme();

  // Define handlers
  const { isRunning, handleRunScript } = useRunScript();

  return (
    <VStack w="100%" gap={3}>
      <VStack w="100%" gap={1}>
        <VStack w="100%" gap={1}>
          <Text
            as="h3"
            w="100%"
            textTransform="uppercase"
            fontSize="xs"
            color={colorAlt}
          >
            Workspaces
          </Text>

          <HStack w="100%">
            <Workspace />

            <WorkspaceMenu />
          </HStack>
        </VStack>

        <VStack w="100%" gap={1}>
          <KissVMFilesHeading />

          <HStack w="100%">
            <KissVMFiles />

            <KissVMFilesMenu />
          </HStack>
        </VStack>
      </VStack>

      <Box w="100%" maxW="24rem">
        <Button
          w="100%"
          colorScheme="green"
          onClick={() =>
            handleRunScript({
              setState: true,
              setPrevState: true,
              setGlobals: true,
              setSignatures: true,
              setExtraScripts: true,
              setOutput: true,
            })
          }
          isLoading={isRunning}
          disabled={currentFile?.split('.').pop() !== 'kvm' || isRunning}
        >
          Run and Debug
        </Button>
      </Box>

      <Card bg={bgAlt} px={3}>
        <HStack py={2} gap={3} flexWrap="wrap" justifyContent="center">
          <ScriptStatus label="Parse" bool={scriptParse}>
            {scriptParse === null ? 'N/A' : scriptParse ? 'OK' : 'FAIL'}
          </ScriptStatus>

          <ScriptStatus label="Run" bool={scriptSuccess}>
            {scriptSuccess === null ? 'N/A' : scriptSuccess ? 'OK' : 'FAIL'}
          </ScriptStatus>

          <ScriptStatus
            label="Monotonic"
            bool={scriptMonotonic}
            colors={['blue', 'purple']}
          >
            {scriptMonotonic === null ? 'N/A' : scriptMonotonic ? 'YES' : 'NO'}
          </ScriptStatus>
        </HStack>
      </Card>
    </VStack>
  );
}

export default KissVMRunDebug;
