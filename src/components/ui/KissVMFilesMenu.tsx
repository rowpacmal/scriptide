// Import dependencies
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
} from '@chakra-ui/react';
import { LuMenu, LuPenLine, LuPlus, LuTrash } from 'react-icons/lu';
// Import components
import useAppTheme from '@/themes/useAppTheme';
import useModalStore, { MODAL_TYPES } from '@/stores/useModalStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';

// Workspace menu item component
function KissVMFilesMenuItem({
  children,
  label,
  icon,
  onClick,
  disabled = false,
}) {
  // Define theme
  const { bgAlt, borderColor, color, colorAlt } = useAppTheme();

  return (
    <Tooltip label={label} placement="right" hasArrow>
      <MenuItem
        py={1}
        color={colorAlt}
        bg="transparent"
        borderColor={borderColor}
        _hover={{ color, bg: bgAlt }}
        icon={icon}
        onClick={onClick}
        isDisabled={disabled}
      >
        {children}
      </MenuItem>
    </Tooltip>
  );
}

// Workspace menu component
function KissVMFilesMenu() {
  // Define theme
  const { bg, borderColor, color, colorAlt } = useAppTheme();

  // Define store
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const setModalType = useModalStore((state) => state.setModalType);
  const onOpen = useModalStore((state) => state.onOpen);

  // Render
  return (
    <Menu>
      <MenuButton
        p={0}
        h="auto"
        minW="auto"
        bg="transparent"
        color={colorAlt}
        _hover={{ bg: 'transparent', color }}
        _active={{ bg: 'transparent', color }}
        as={Button}
      >
        <LuMenu size={24} />
      </MenuButton>

      <MenuList
        bg={bg}
        borderColor={borderColor}
        py={0}
        overflow="hidden"
        minW="auto"
      >
        <KissVMFilesMenuItem
          label="Rename Workspace"
          icon={<LuPenLine />}
          onClick={() => {
            setModalType(MODAL_TYPES.RENAME_WORKSPACE);
            onOpen();
          }}
          disabled={workspaces.length < 1}
        >
          Rename...
        </KissVMFilesMenuItem>

        <MenuDivider my={1} />

        <KissVMFilesMenuItem
          label="Create Blank Workspace"
          icon={<LuPlus />}
          onClick={() => {
            setModalType(MODAL_TYPES.CREATE_BLANK_WORKSPACE);
            onOpen();
          }}
          disabled={workspaces.length >= 30} // Increased limit from 10 to 30
        >
          Create
        </KissVMFilesMenuItem>

        <KissVMFilesMenuItem
          label="Delete Workspace"
          icon={<LuTrash />}
          onClick={() => {
            setModalType(MODAL_TYPES.DELETE_WORKSPACE);
            onOpen();
          }}
          disabled={workspaces.length < 1}
        >
          Delete
        </KissVMFilesMenuItem>
      </MenuList>
    </Menu>
  );
}

// Export
export default KissVMFilesMenu;
