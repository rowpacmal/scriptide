// Import dependencies
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  // LuBug,
  LuCopy,
  LuDownload,
  LuHardDriveDownload,
  LuHardDriveUpload,
  LuMenu,
  LuPenLine,
  LuPlus,
  LuTrash,
  LuTrash2,
  LuUpload,
} from 'react-icons/lu';
// Import components
import WorkspaceCopy from './WorkspaceCopy';
import WorkspaceCreateBlank from './WorkspaceCreateBlank';
import WorkspaceDelete from './WorkspaceDelete';
import WorkspaceDeleteAll from './WorkspaceDeleteAll';
import WorkspaceRename from './WorkspaceRename';

// Workspace menu item component
function WorkspaceMenuItem({
  children,
  label,
  icon,
  onClick,
  disabled = false,
}) {
  return (
    <Tooltip label={label} placement="right" hasArrow>
      <MenuItem
        py={1}
        bg="transparent"
        borderColor="gray.700"
        _hover={{ bg: 'gray.700' }}
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
function WorkspaceMenu({ workspaces }) {
  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalType, setModalType]: [string | null, any] = useState(null);

  // Render
  return (
    <>
      <Menu>
        <MenuButton
          p={0}
          h="auto"
          minW="auto"
          bg="transparent"
          color="gray.500"
          _hover={{ bg: 'transparent', color: 'gray.50' }}
          _active={{ bg: 'transparent', color: 'gray.50' }}
          as={Button}
        >
          <LuMenu size={24} />
        </MenuButton>

        <MenuList
          bg="gray.800"
          borderColor="gray.700"
          py={0}
          overflow="hidden"
          minW="auto"
        >
          <WorkspaceMenuItem
            label="Rename Workspace"
            icon={<LuPenLine />}
            onClick={() => {
              setModalType('rename');
              onOpen();
            }}
            disabled={workspaces.length < 1}
          >
            Rename
          </WorkspaceMenuItem>

          <MenuDivider my={1} />

          <WorkspaceMenuItem
            label="Create Blank Workspace"
            icon={<LuPlus />}
            onClick={() => {
              setModalType('create-blank');
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
              setModalType('copy');
              onOpen();
            }}
            disabled={workspaces.length < 1}
          >
            Copy
          </WorkspaceMenuItem>

          {/* TODO - enable when the feature is ready */}
          <WorkspaceMenuItem
            label="Download Workspace"
            icon={<LuDownload />}
            onClick={() => {}}
            disabled
          >
            Download
          </WorkspaceMenuItem>

          <WorkspaceMenuItem
            label="Upload Workspace"
            icon={<LuUpload />}
            onClick={() => {}}
            disabled
          >
            Upload
          </WorkspaceMenuItem>

          <WorkspaceMenuItem
            label="Delete Workspace"
            icon={<LuTrash />}
            onClick={() => {
              setModalType('delete');
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
              setModalType('delete-all');
              onOpen();
            }}
            disabled={workspaces.length < 1}
          >
            Delete all
          </WorkspaceMenuItem>

          {/* TODO - enable when the feature is ready */}
          <WorkspaceMenuItem
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
          </WorkspaceMenuItem>

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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        {modalType === 'rename' && <WorkspaceRename onClose={onClose} />}
        {modalType === 'create-blank' && (
          <WorkspaceCreateBlank onClose={onClose} />
        )}
        {modalType === 'copy' && <WorkspaceCopy onClose={onClose} />}
        {modalType === 'delete' && <WorkspaceDelete onClose={onClose} />}
        {modalType === 'delete-all' && <WorkspaceDeleteAll onClose={onClose} />}
      </Modal>
    </>
  );
}

// Export
export default WorkspaceMenu;
