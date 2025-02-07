// Import dependencies
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { LuRotateCw } from 'react-icons/lu';
// Import constants
import { NAVIGATION_LABELS } from '../../../constants';
// Import store
import useNavigationStore from '@/store/useNavigationStore';
import useWorkspaceStore from '@/store/useWorkspaceStore';
// Import components
import ExtraScripts from './ExtraScripts';
import Globals from './Globals';
import Signatures from './Signatures';
import States from './States';
import Explorer from './Explorer';
import Home from './Home';

// Control panel component
function ControlPanel() {
  // Define store
  const navigation = useNavigationStore((state) => state.navigation);
  const refreshWorkspaces = useWorkspaceStore(
    (state) => state.refreshWorkspaces
  );

  // Render
  return (
    <Box h="100%" p={2} borderLeft="1px solid" borderColor="gray.700">
      <VStack as="section" h="100%" pr={2} overflow="auto">
        <HStack as="header" w="100%" justifyContent="space-between">
          <Text
            as="h2"
            textTransform="uppercase"
            fontSize="lg"
            color="gray.500"
            minH="2rem"
            display="flex"
            alignItems="center"
          >
            {NAVIGATION_LABELS[navigation]}
          </Text>

          {navigation === 'explorer' && (
            <Button
              p={0}
              size="sm"
              bg="transparent"
              color="gray.500"
              _hover={{ bg: 'transparent', color: 'gray.50' }}
              onClick={() => refreshWorkspaces()}
            >
              <LuRotateCw size={20} />
            </Button>
          )}
        </HStack>

        {navigation === 'home' && <Home />}
        {navigation === 'explorer' && <Explorer />}
        {navigation === 'search' && (
          <Text color="gray.500">Not implemented!</Text>
        )}

        {navigation === 'states' && <States />}
        {navigation === 'globals' && <Globals />}
        {navigation === 'signatures' && <Signatures />}

        {navigation === 'scripts' && <ExtraScripts />}
        {navigation === 'plugins' && (
          <Text color="gray.500">Not implemented!</Text>
        )}
        {navigation === 'settings' && (
          <Text color="gray.500">Not implemented!</Text>
        )}
      </VStack>
    </Box>
  );
}

export default ControlPanel;
