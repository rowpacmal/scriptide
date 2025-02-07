// Import dependencies
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  // LuBug,
  // LuCopy,
  LuDownload,
  LuFile,
  LuPenLine,
  LuTrash,
} from 'react-icons/lu';
// Import store
import useFileStore from '@/store/useFileStore';
// Import components
import { MenuDividerBase, MenuItemBase, MenuListBase } from './MenuListBase';
import minima from '@/lib/minima';
import useWorkspaceStore from '@/store/useWorkspaceStore';

// Constants (for debugging)
const MINIDAPP_ID =
  '0x07FB9BDF032652AFEE6659B348FBE362F6DE60FC1C7BCD962211436E35E316FD';

// File item context menu component
function FileItemContextMenu({ file }) {
  // Define store
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const deleteFile = useFileStore((state) => state.deleteFile);

  // Define handlers
  /* Temporary fix to download files
   *
   * TODO - Improve download support in the future
   */
  async function handleDownload() {
    // On Desktop
    const fileName = file + '_minima_download_as_file_';
    const url = `my_downloads/${fileName}`;
    const debug = `https://${import.meta.env.VITE_DEBUG_HOST}:${
      import.meta.env.VITE_DEBUG_MDS_PORT
    }/${MINIDAPP_ID}/${url}`;

    await minima.file.copytoweb(
      `workspaces/${currentWorkspace}/${file}`,
      `/${url}`
    );

    const link = document.createElement('a');
    link.href = import.meta.env.VITE_DEBUG === 'true' ? debug : url;
    document.body.appendChild(link);
    link.click();
  }

  return (
    <MenuListBase>
      <MenuItemBase
        // label="Rename File"
        icon={<LuPenLine />}
        onClick={() => {}}
        disabled
      >
        Rename
      </MenuItemBase>

      <MenuItemBase
        // label="Delete File"
        icon={<LuTrash />}
        onClick={() => deleteFile(file)}
      >
        Delete
      </MenuItemBase>

      {/* TODO - Add copy and download support */}
      {/* <MenuDividerBase />

      <MenuItemBase
        // label="Copy File"
        icon={<LuCopy />}
        onClick={() => {}}
        disabled
      >
        Copy
      </MenuItemBase>

      <MenuItemBase
        // label="Copy File Name"
        icon={<LuCopy />}
        onClick={() => {}}
        disabled
      >
        Copy name
      </MenuItemBase>

      <MenuItemBase
        // label="Copy File Path"
        icon={<LuCopy />}
        onClick={() => {}}
        disabled
      >
        Copy path
      </MenuItemBase> */}

      <MenuDividerBase />

      <MenuItemBase
        // label="Download File"
        icon={<LuDownload />}
        onClick={handleDownload}
      >
        Download
      </MenuItemBase>

      {/* Used for debugging during development  */}
      {/* <MenuDividerBase />

      <MenuItemBase
        // label="Debug"
        icon={<LuBug />}
        onClick={() => console.log(file)}
      >
        Debug
      </MenuItemBase> */}
    </MenuListBase>
  );
}

// File item component
function FileItem({ children, file, onClick, isActive = false }) {
  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define handlers
  const handleContextMenu = (event) => {
    event.preventDefault(); // Disable default menu
    onOpen();
  };

  /** Quick fix for a glitch where the context menu
   * would not close when scrolling.
   */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).document
      .querySelector('#FILE_EXPLORER')
      ?.addEventListener('scroll', onClose);
    return () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).document
        .querySelector('#FILE_EXPLORER')
        ?.addEventListener('scroll', onClose);
  }, []);

  // Render
  return (
    <Box
      cursor="pointer"
      w="100%"
      _hover={{ bg: 'gray.800', color: 'gray.50' }}
    >
      <Menu isOpen={isOpen} onClose={onClose} placement="bottom-start">
        <MenuButton
          as="div"
          w="100%"
          onClick={onClick}
          onContextMenu={handleContextMenu}
        >
          <HStack
            w="100%"
            borderRadius={0}
            border="1px solid"
            borderColor={
              isOpen ? (isActive ? 'blue.500' : 'gray.700') : 'transparent'
            }
            justifyContent="space-between"
            gap={0}
            pl={2}
            pr={1}
            color={isActive ? 'gray.50' : 'gray.500'}
            bg={isActive ? 'blue.800' : isOpen ? 'gray.800' : 'transparent'}
          >
            <Text
              w="100%"
              display="flex"
              gap={1}
              alignItems="center"
              isTruncated
            >
              <Box as="span">
                <LuFile />
              </Box>

              <Text as="span" isTruncated>
                {children}
              </Text>
            </Text>
          </HStack>
        </MenuButton>

        <FileItemContextMenu file={file} />
      </Menu>
    </Box>
  );
}

// Export
export default FileItem;
