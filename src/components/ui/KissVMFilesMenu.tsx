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
import { LuMenu, LuPenLine, LuPlus, LuTrash, LuTrash2 } from 'react-icons/lu';
// Import components
import useAppTheme from '@/themes/useAppTheme';
import useModalStore from '@/stores/useModalStore';
import useFileStore from '@/stores/useFileStore';
// Import types
import { EModalTypes } from '@/types';

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
  const files = useFileStore((state) => state.files);
  const currentFile = useFileStore((state) => state.currentFile);
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
          label="Rename Script"
          icon={<LuPenLine />}
          onClick={() => {
            setModalType(EModalTypes.RENAME_SCRIPT);
            onOpen();
          }}
          disabled={
            !currentFile ||
            !(
              currentFile?.endsWith('.kvm') &&
              currentFile?.includes('contracts')
            )
          }
        >
          Rename...
        </KissVMFilesMenuItem>

        <MenuDivider my={1} />

        <KissVMFilesMenuItem
          label="Create Script"
          icon={<LuPlus />}
          onClick={() => {
            setModalType(EModalTypes.CREATE_SCRIPT);
            onOpen();
          }}
        >
          Create
        </KissVMFilesMenuItem>

        <KissVMFilesMenuItem
          label="Delete Script"
          icon={<LuTrash />}
          onClick={() => {
            setModalType(EModalTypes.DELETE_SCRIPT);
            onOpen();
          }}
          disabled={
            !currentFile ||
            !(
              currentFile?.endsWith('.kvm') &&
              currentFile?.includes('contracts')
            )
          }
        >
          Delete
        </KissVMFilesMenuItem>

        <MenuDivider my={1} />

        <KissVMFilesMenuItem
          label="Delete All Scripts"
          icon={<LuTrash2 />}
          onClick={() => {
            setModalType(EModalTypes.DELETE_ALL_SCRIPT);
            onOpen();
          }}
          disabled={
            files.filter(
              (f) => f.location.split('/').splice(3)[0] === 'contracts'
            ).length < 1
          }
        >
          Delete all
        </KissVMFilesMenuItem>
      </MenuList>
    </Menu>
  );
}

// Export
export default KissVMFilesMenu;
