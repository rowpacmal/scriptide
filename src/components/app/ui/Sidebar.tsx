// Import dependencies
import { Box, Button, HStack, Image, Tooltip, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import {
  LuBraces,
  LuCode,
  LuFiles,
  LuGlobe,
  LuLock,
  // LuPlug,
  // LuSearch,
  // LuSettings,
} from 'react-icons/lu';
// Import constants
import { NAVIGATION_LABELS } from '../../../constants';
// Import context
import { appContext } from '../../../AppContext';

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
  // Render
  return (
    <Tooltip label={label} placement="top-start" hasArrow>
      <HStack gap={1}>
        <Box bg={active ? 'orange.500' : 'transparent'} w={0.5} h="100%" />

        <Button
          colorScheme="orange"
          p={0}
          bg="transparent"
          color={active ? 'gray.50' : 'gray.500'}
          _hover={{
            bg: 'transparent',
            color: disabled ? '' : 'gray.50',
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
  // Define context
  const { navigation, setNavigation } = useContext(appContext);

  // Define functions
  function handleNavigationChange(nav: string) {
    handelToggleControlPanel(nav === navigation);

    if (nav !== navigation) {
      setNavigation(nav);
      localStorage.setItem('navigation-state', nav);
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
            colorScheme="orange"
            p={0}
            pl={1.5}
            onClick={() => handleNavigationChange('home')}
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
          active={handleIsActive('explorer')}
          onClick={() => handleNavigationChange('explorer')}
        >
          <LuFiles size={ICON_SIZE} />
        </SidebarButton>

        {/* TODO - enable search feature */}
        {/* <SidebarButton
          label={NAVIGATION_LABELS.search}
          active={handleIsActive('search')}
          onClick={() => handleNavigationChange('search')}
          disabled
        >
          <LuSearch size={ICON_SIZE} />
        </SidebarButton> */}

        <SidebarButton
          label={NAVIGATION_LABELS.states}
          active={handleIsActive('states')}
          onClick={() => handleNavigationChange('states')}
        >
          <LuBraces size={ICON_SIZE} />
        </SidebarButton>

        <SidebarButton
          label={NAVIGATION_LABELS.globals}
          active={handleIsActive('globals')}
          onClick={() => handleNavigationChange('globals')}
        >
          <LuGlobe size={ICON_SIZE} />
        </SidebarButton>

        <SidebarButton
          label={NAVIGATION_LABELS.signatures}
          active={handleIsActive('signatures')}
          onClick={() => handleNavigationChange('signatures')}
        >
          <LuLock size={ICON_SIZE} />
        </SidebarButton>

        <SidebarButton
          label={NAVIGATION_LABELS.scripts}
          active={handleIsActive('scripts')}
          onClick={() => handleNavigationChange('scripts')}
        >
          <LuCode size={ICON_SIZE} />
        </SidebarButton>
      </VStack>

      {/* TODO - enable plugins and settings features */}
      {/* <VStack>
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
      </VStack> */}
    </VStack>
  );
}

// Export
export default Sidebar;
