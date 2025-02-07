import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';
import useFileStore from '@/store/useFileStore';
import useWorkspaceStore from '@/store/useWorkspaceStore';
import useEditorStore from '@/store/useEditorStore';

// Workspace component
function Workspace() {
  // Define stores
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const setCurrentWorkspace = useWorkspaceStore(
    (state) => state.setCurrentWorkspace
  );
  const setCode = useEditorStore((state) => state.setCode);

  // Render
  return (
    <Menu>
      <MenuButton
        textAlign="start"
        w="100%"
        size="sm"
        fontWeight="normal"
        variant="outline"
        color="gray.500"
        borderColor="gray.700"
        _hover={{ color: 'gray.50', bg: 'gray.800' }}
        _active={{ color: 'gray.50', bg: 'gray.800' }}
        as={Button}
        rightIcon={<LuChevronDown />}
        disabled={workspaces.length < 1}
      >
        <Text isTruncated>
          {workspaces.length > 0 ? currentWorkspace : '---'}
        </Text>
      </MenuButton>

      <MenuList bg="gray.800" borderColor="gray.700" py={0} overflow="hidden">
        {workspaces.map((workspace, index) => (
          <MenuItem
            key={index}
            py={1}
            bg="transparent"
            borderColor="gray.700"
            _hover={{ bg: 'gray.700' }}
            onClick={() => {
              if (workspace === currentWorkspace) {
                return;
              }

              setCode(null);
              setCurrentFile(null);
              setCurrentWorkspace(workspace);
            }}
          >
            {workspaces.length > 0 && workspace}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

// Export
export default Workspace;
