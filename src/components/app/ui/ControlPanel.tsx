// Import dependencies
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
// Import constants
import { NAVIGATION_LABELS } from '../../../constants';
// Import context
import { appContext } from '../../../AppContext';
// Import components
import ExtraScripts from './ExtraScripts';
import Globals from './Globals';
import Signatures from './Signatures';
import States from './States';
import Explorer from './Explorer';
import { LuRotateCw } from 'react-icons/lu';
import useFileSystem from '../../../hooks/useFileSystem';

// Control panel component
function ControlPanel() {
  // Define context
  const { navigation } = useContext(appContext);

  // Define file system
  const { handleRefreshWorkspaces } = useFileSystem();

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
              onClick={() => handleRefreshWorkspaces()}
            >
              <LuRotateCw size={20} />
            </Button>
          )}
        </HStack>

        {navigation === 'home' && (
          <VStack w="100%" color="gray.500" textAlign="center" gap={3}>
            <Text as="h3" w="100%" fontSize="lg">
              Welcome to Minima Script IDE!
            </Text>

            <hr className="w-full border-gray-700" />

            <Text w="100%">
              This is a simple IDE for writing and testing Minima scripts - KISS
              VM.
            </Text>

            <Text w="100%">
              It is a work in progress and will be improved as time goes by. If
              you find any bugs or have any suggestions, please let me know, and
              please be patient as this project is still under development.
            </Text>
          </VStack>
        )}
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
