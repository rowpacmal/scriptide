/* eslint-disable @typescript-eslint/no-explicit-any */
// Import dependencies
import { Box, Button, HStack, Tooltip, VStack } from '@chakra-ui/react';
import {
  LuFiles,
  LuRocket,
  // LuPlug,
  // LuSearch,
  LuSettings,
  LuZap,
} from 'react-icons/lu';
// Import constants
import { NAVIGATION_LABELS } from '@/constants';
// Import store
import useNavigationStore from '@/stores/useNavigationStore';
import useAppTheme from '@/themes/useAppTheme';
import AppLogo from './systems/AppLogo';
// Import types
import { ENavigationStates } from '@/types';
import usePanelStore from '@/stores/usePanelStore';

// Constants
const ICON_SIZE = 24;

// Utility component
function SidebarButton({
  children,
  label,
  placement = 'top-start',
  active = false,
  onClick,
  disabled = false,
}: any) {
  // Define theme
  const { accent, color, colorAlt } = useAppTheme();

  // Render
  return (
    <Tooltip label={label} placement={placement} hasArrow>
      <HStack gap={1}>
        <Box bg={active ? accent : 'transparent'} w={0.5} h="100%" />

        <Button
          p={0}
          bg="transparent"
          color={active ? color : colorAlt}
          _hover={{
            bg: 'transparent',
            color: disabled ? '' : color,
          }}
          _active={{
            bg: 'transparent',
          }}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </Button>
      </HStack>
    </Tooltip>
  );
}

// Sidebar component
function Sidebar() {
  // Define store
  const navigation = useNavigationStore((state) => state.navigation);
  const setNavigation = useNavigationStore((state) => state.setNavigation);
  const isLeftSidePanelOpen = usePanelStore(
    (state) => state.isLeftSidePanelOpen
  );
  const toggleLeftSidePanel = usePanelStore(
    (state) => state.toggleLeftSidePanel
  );

  // Define functions
  function handleNavigationChange(nav: string) {
    toggleLeftSidePanel(nav === navigation);

    if (nav !== navigation) {
      setNavigation(nav);
    }
  }

  function handleIsActive(nav: string) {
    return navigation === nav && isLeftSidePanelOpen;
  }

  // Render
  return (
    <VStack
      as="nav"
      h="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1.5}
      pr={1.5}
    >
      <SidebarButton
        label={NAVIGATION_LABELS.home}
        placement="right"
        active={handleIsActive(ENavigationStates.HOME)}
        onClick={() => handleNavigationChange(ENavigationStates.HOME)}
      >
        <AppLogo size={32} />
      </SidebarButton>

      <VStack mb="auto">
        <SidebarButton
          label={NAVIGATION_LABELS.explorer}
          active={handleIsActive(ENavigationStates.EXPLORER)}
          onClick={() => handleNavigationChange(ENavigationStates.EXPLORER)}
        >
          <LuFiles size={ICON_SIZE} />
        </SidebarButton>

        {/* TODO - enable search feature */}
        {/* <SidebarButton
          label={NAVIGATION_LABELS.search}
          active={handleIsActive(ENavigationStates.SEARCH)}
          onClick={() => handleNavigationChange(ENavigationStates.SEARCH)}
          disabled
        >
          <LuSearch size={ICON_SIZE} />
        </SidebarButton> */}

        <SidebarButton
          label={NAVIGATION_LABELS.kissVM}
          active={handleIsActive(ENavigationStates.KISS_VM)}
          onClick={() => handleNavigationChange(ENavigationStates.KISS_VM)}
        >
          <LuZap size={ICON_SIZE} />
        </SidebarButton>

        <SidebarButton
          label={NAVIGATION_LABELS.deployBuild}
          active={handleIsActive(ENavigationStates.DEPLOY_BUILD)}
          onClick={() => handleNavigationChange(ENavigationStates.DEPLOY_BUILD)}
        >
          <LuRocket size={ICON_SIZE} />
        </SidebarButton>
      </VStack>

      <VStack>
        {/* TODO - enable plugins features */}
        {/* <SidebarButton
          label={NAVIGATION_LABELS.plugins}
          active={handleIsActive('plugins')}
          onClick={() => handleNavigationChange('plugins')}
          disabled
        >
          <LuPlug size={ICON_SIZE} />
        </SidebarButton> */}

        <SidebarButton
          label={NAVIGATION_LABELS.settings}
          active={handleIsActive('settings')}
          onClick={() => handleNavigationChange('settings')}
        >
          <LuSettings size={ICON_SIZE} />
        </SidebarButton>
      </VStack>
    </VStack>
  );
}

// Export
export default Sidebar;
