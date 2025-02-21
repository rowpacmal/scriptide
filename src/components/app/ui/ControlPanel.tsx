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
import Deploy from './Deploy';
import useAppTheme from '@/themes/useAppTheme';

// Control panel component
function ControlPanel() {
  // Define theme
  const { color, colorAlt, borderColor } = useAppTheme();

  // Define store
  const navigation = useNavigationStore((state) => state.navigation);
  const refreshWorkspaces = useWorkspaceStore(
    (state) => state.refreshWorkspaces
  );

  // Render
  return (
    <Box h="100%" p={2} borderLeft="1px solid" borderColor={borderColor}>
      <VStack as="section" h="100%" pr={2} overflow="auto">
        <HStack as="header" w="100%" justifyContent="space-between">
          <Text
            as="h2"
            textTransform="uppercase"
            fontSize="lg"
            color={colorAlt}
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
              color={colorAlt}
              _hover={{ bg: 'transparent', color }}
              onClick={() => refreshWorkspaces()}
            >
              <LuRotateCw size={20} />
            </Button>
          )}
        </HStack>

        {navigation === 'home' && <Home />}
        {navigation === 'explorer' && <Explorer />}
        {navigation === 'search' && (
          <Text color={colorAlt}>Not implemented!</Text>
        )}

        {navigation === 'states' && <States />}
        {navigation === 'globals' && <Globals />}
        {navigation === 'signatures' && <Signatures />}
        {navigation === 'scripts' && <ExtraScripts />}
        {navigation === 'deploy' && <Deploy />}

        {navigation === 'plugins' && (
          <Text color={colorAlt}>Not implemented!</Text>
        )}
        {navigation === 'settings' && (
          <Text color={colorAlt}>Not implemented!</Text>
        )}
      </VStack>
    </Box>
  );
}

export default ControlPanel;
