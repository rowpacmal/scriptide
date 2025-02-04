import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';
import { appContext } from '../../../AppContext';
import { useContext } from 'react';

// Workspace component
function Workspace() {
  // Define context
  const {
    setCurrentFile,
    workspaces,
    currentWorkspace,
    setCurrentWorkspace,
    setCode,
  } = useContext(appContext);

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
