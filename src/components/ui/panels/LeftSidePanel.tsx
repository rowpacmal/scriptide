// Import dependencies
import { Box, Button, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { LuRotateCw } from 'react-icons/lu';
// Import constants
import { NAVIGATION_LABELS } from '@/constants';
// Import store
import useNavigationStore from '@/stores/useNavigationStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import types
import { ENavigationStates } from '@/types';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import components
import DeployBuildPanel from './DeployBuildPanel';
import ExplorerPanel from './ExplorerPanel';
import HomePanel from './HomePanel';
import KissVMPanel from './KissVMPanel';
import SettingsPanel from './SettingsPanel';
import { BasicHeading2 } from '../systems/BasicHeadings';

// Control panel component
function LeftSidePanel() {
  // Define theme
  const { color, colorAlt, borderColor } = useAppTheme();

  // Define store
  const navigation = useNavigationStore((state) => state.navigation);
  const refreshWorkspaces = useWorkspaceStore(
    (state) => state.refreshWorkspaces
  );

  // Define state
  const currentNavigation = useMemo(() => {
    switch (navigation) {
      case ENavigationStates.HOME:
        return <HomePanel />;

      case ENavigationStates.EXPLORER:
        return <ExplorerPanel />;

      case ENavigationStates.SEARCH:
        return null;

      case ENavigationStates.KISS_VM:
        return <KissVMPanel />;

      case ENavigationStates.DEPLOY_BUILD:
        return <DeployBuildPanel />;

      case ENavigationStates.PLUGINS:
        return null;

      case ENavigationStates.SETTINGS:
        return <SettingsPanel />;

      default:
        return null;
    }
  }, [navigation]);

  // Render
  return (
    <Box h="100%" p={2} borderLeft="1px solid" borderColor={borderColor}>
      <VStack as="section" h="100%" pr={2} overflow="auto">
        <HStack as="header" w="100%" justifyContent="space-between">
          <BasicHeading2 color={colorAlt}>
            {NAVIGATION_LABELS[navigation]}
          </BasicHeading2>

          {navigation !== ENavigationStates.HOME &&
            navigation !== ENavigationStates.SETTINGS && (
              <Tooltip label="Refresh workspaces" placement="bottom" hasArrow>
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
              </Tooltip>
            )}
        </HStack>

        {currentNavigation}
      </VStack>
    </Box>
  );
}

export default LeftSidePanel;
