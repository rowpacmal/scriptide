import useRunScript from '@/hooks/useRunScript';
import useFileStore from '@/store/useFileStore';
import useRunScriptStore from '@/store/useRunScriptStore';
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

function ScriptStatus({ children, label, bool }) {
  // Define theme
  const { colorAlt } = useAppTheme();

  return (
    <HStack gap={1}>
      <Text color={colorAlt} textTransform="uppercase">
        {label}
      </Text>

      <Code colorScheme={bool === null ? 'gray' : bool ? 'green' : 'red'}>
        {children}
      </Code>
    </HStack>
  );
}

function RunDebug() {
  // Define stores
  const scriptParse = useRunScriptStore((state) => state.scriptParse);
  const scriptSuccess = useRunScriptStore((state) => state.scriptSuccess);
  const scriptMonotonic = useRunScriptStore((state) => state.scriptMonotonic);
  const currentFile = useFileStore((state) => state.currentFile);

  // Define theme
  const { colorAlt, bgAlt } = useAppTheme();

  // Define handlers
  const handleRunScript = useRunScript();

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
          <Text
            as="h3"
            w="100%"
            textTransform="uppercase"
            fontSize="xs"
            color={colorAlt}
          >
            KissVM Scripts
          </Text>

          <KissVMFiles />
        </VStack>
      </VStack>

      <Box w="100%" maxW="24rem">
        <Button
          w="100%"
          colorScheme="green"
          onClick={handleRunScript}
          disabled={currentFile?.split('.').pop() !== 'kvm'}
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

          <ScriptStatus label="Monotonic" bool={scriptMonotonic}>
            {scriptMonotonic === null ? 'N/A' : scriptMonotonic ? 'YES' : 'NO'}
          </ScriptStatus>
        </HStack>
      </Card>
    </VStack>
  );
}

export default RunDebug;
