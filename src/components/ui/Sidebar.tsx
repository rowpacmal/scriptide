// Import dependencies
import { Box, Button, HStack, Image, Tooltip, VStack } from '@chakra-ui/react';
import {
  LuFiles,
  LuRocket,
  LuPlug,
  LuSearch,
  LuSettings,
  LuZap,
} from 'react-icons/lu';
// Import constants
import { NAVIGATION_LABELS } from '@/constants';
// Import store
import useNavigationStore, {
  NAVIGATION_STATES,
} from '@/stores/useNavigationStore';
import useAppTheme from '@/themes/useAppTheme';

// Constants
const ICON_SIZE = 24;

// Utility component
function SidebarButton({
  children,
  label,
  active = false,
  onClick,
  disabled = false,
}) {
  // Define theme
  const { accent, color, colorAlt } = useAppTheme();

  // Render
  return (
    <Tooltip label={label} placement="top-start" hasArrow>
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
function Sidebar({ isControlPanelCollapsed, handelToggleControlPanel }) {
  // Define store
  const navigation = useNavigationStore((state) => state.navigation);
  const setNavigation = useNavigationStore((state) => state.setNavigation);

  // Define functions
  function handleNavigationChange(nav: string) {
    handelToggleControlPanel(nav === navigation);

    if (nav !== navigation) {
      setNavigation(nav);
    }
  }

  function handleIsActive(nav: string) {
    return navigation === nav && !isControlPanelCollapsed;
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
      <Box>
        <Tooltip label={NAVIGATION_LABELS.home} placement="right" hasArrow>
          <Button
            variant="unstyled"
            p={0}
            pl={1.5}
            onClick={() => handleNavigationChange(NAVIGATION_STATES.HOME)}
          >
            <Image
              src="./scriptide.png"
              alt="icon"
              width="40px"
              height="40px"
            />
          </Button>
        </Tooltip>
      </Box>

      <VStack mb="auto">
        <SidebarButton
          label={NAVIGATION_LABELS.explorer}
          active={handleIsActive(NAVIGATION_STATES.EXPLORER)}
          onClick={() => handleNavigationChange(NAVIGATION_STATES.EXPLORER)}
        >
          <LuFiles size={ICON_SIZE} />
        </SidebarButton>

        {/* TODO - enable search feature */}
        <SidebarButton
          label={NAVIGATION_LABELS.search}
          active={handleIsActive(NAVIGATION_STATES.SEARCH)}
          onClick={() => handleNavigationChange(NAVIGATION_STATES.SEARCH)}
          disabled
        >
          <LuSearch size={ICON_SIZE} />
        </SidebarButton>

        <SidebarButton
          label={NAVIGATION_LABELS.kissVM}
          active={handleIsActive(NAVIGATION_STATES.KISS_VM)}
          onClick={() => handleNavigationChange(NAVIGATION_STATES.KISS_VM)}
        >
          <LuZap size={ICON_SIZE} />
        </SidebarButton>

        <SidebarButton
          label={NAVIGATION_LABELS.deployBuild}
          active={handleIsActive(NAVIGATION_STATES.DEPLOY_BUILD)}
          onClick={() => handleNavigationChange(NAVIGATION_STATES.DEPLOY_BUILD)}
          disabled
        >
          <LuRocket size={ICON_SIZE} />
        </SidebarButton>
      </VStack>

      <VStack>
        {/* TODO - enable plugins features */}
        <SidebarButton
          label={NAVIGATION_LABELS.plugins}
          active={handleIsActive('plugins')}
          onClick={() => handleNavigationChange('plugins')}
          disabled
        >
          <LuPlug size={ICON_SIZE} />
        </SidebarButton>

        <SidebarButton
          label={NAVIGATION_LABELS.settings}
          active={handleIsActive('settings')}
          onClick={() => handleNavigationChange('settings')}
          disabled
        >
          <LuSettings size={ICON_SIZE} />
        </SidebarButton>
      </VStack>
    </VStack>
  );
}

// Export
export default Sidebar;
