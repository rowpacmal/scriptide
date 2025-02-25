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
import {
  // LuBug,
  LuCopy,
  LuDownload,
  // LuHardDriveDownload,
  // LuHardDriveUpload,
  LuMenu,
  LuPenLine,
  LuPlus,
  LuTrash,
  LuTrash2,
  LuUpload,
} from 'react-icons/lu';
// Import components
import useAppTheme from '@/themes/useAppTheme';
import useModalStore, { MODAL_TYPES } from '@/store/useModalStore';
import useWorkspaceStore from '@/store/useWorkspaceStore';

// Workspace menu item component
function WorkspaceMenuItem({
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
function WorkspaceMenu() {
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
        <WorkspaceMenuItem
          label="Rename Workspace"
          icon={<LuPenLine />}
          onClick={() => {
            setModalType(MODAL_TYPES.RENAME_WORKSPACE);
            onOpen();
          }}
          disabled={workspaces.length < 1}
        >
          Rename...
        </WorkspaceMenuItem>

        <MenuDivider my={1} />

        <WorkspaceMenuItem
          label="Create Blank Workspace"
          icon={<LuPlus />}
          onClick={() => {
            setModalType(MODAL_TYPES.CREATE_BLANK_WORKSPACE);
            onOpen();
          }}
          disabled={workspaces.length >= 30} // Increased limit from 10 to 30
        >
          Create Blank
        </WorkspaceMenuItem>

        {/* TODO - enable when templates are ready */}
        {/* <WorkspaceMenuItem
            label="Create Workspace Using Template"
            icon={<LuPlus />}
            onClick={() => {}}
            disabled
          >
            Create Using Template
          </WorkspaceMenuItem> */}

        <WorkspaceMenuItem
          label="Copy Workspace"
          icon={<LuCopy />}
          onClick={() => {
            setModalType(MODAL_TYPES.COPY_WORKSPACE);
            onOpen();
          }}
          disabled={workspaces.length < 1 || workspaces.length >= 30}
        >
          Copy
        </WorkspaceMenuItem>

        {/* TODO - enable when the feature is ready */}
        <WorkspaceMenuItem
          label="Export Workspace"
          icon={<LuUpload />}
          onClick={() => {
            setModalType(MODAL_TYPES.EXPORT_WORKSPACE);
            onOpen();
          }}
          disabled={workspaces.length < 1}
        >
          Export
        </WorkspaceMenuItem>

        <WorkspaceMenuItem
          label="Import Workspace"
          icon={<LuDownload />}
          onClick={() => {
            setModalType(MODAL_TYPES.IMPORT_WORKSPACE);
            onOpen();
          }}
          disabled={workspaces.length >= 30}
        >
          Import
        </WorkspaceMenuItem>

        <WorkspaceMenuItem
          label="Delete Workspace"
          icon={<LuTrash />}
          onClick={() => {
            setModalType(MODAL_TYPES.DELETE_WORKSPACE);
            onOpen();
          }}
          disabled={workspaces.length < 1}
        >
          Delete
        </WorkspaceMenuItem>

        <MenuDivider my={1} />

        <WorkspaceMenuItem
          label="Delete All Workspaces"
          icon={<LuTrash2 />}
          onClick={() => {
            setModalType(MODAL_TYPES.DELETE_ALL_WORKSPACES);
            onOpen();
          }}
          disabled={workspaces.length < 1}
        >
          Delete all
        </WorkspaceMenuItem>

        {/* TODO - enable when the feature is ready */}
        {/* <WorkspaceMenuItem
            label="Backup Workspaces"
            icon={<LuHardDriveDownload />}
            onClick={() => {}}
            disabled
          >
            Backup
          </WorkspaceMenuItem>

          <WorkspaceMenuItem
            label="Restore Workspaces"
            icon={<LuHardDriveUpload />}
            onClick={() => {}}
            disabled
          >
            Restore
          </WorkspaceMenuItem> */}

        {/* Used for debugging during development */}
        {/* <MenuDivider my={1} />

          <WorkspaceMenuItem
            label="Debug"
            icon={<LuBug />}
            onClick={() => console.log(workspaces)}
          >
            Debug
          </WorkspaceMenuItem> */}
      </MenuList>
    </Menu>
  );
}

// Export
export default WorkspaceMenu;
