// Import dependencies
import { Box, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
// Import store
import useWorkspaceStore from '@/store/useWorkspaceStore';
// Import components
import ConfirmModal from './ConfirmModal';

// Constants
const PRESET_NAME = 'Workspace';

// Workspace rename modal component
function WorkspaceCreateBlank({ onClose }) {
  // Define stores
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);

  // Define state
  const [workspaceName, setWorkspaceName] = useState(
    `${PRESET_NAME} ${workspaces.length + 1}`
  );

  // Render
  return (
    <ConfirmModal
      title="Create new workspace"
      buttonLabel="Create"
      onClose={onClose}
      onClick={() => {
        addWorkspace(workspaceName);
        setWorkspaceName('');
        onClose();
      }}
      disabled={!workspaceName}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Create a new blank workspace. Please type a name for the new workspace.
      </Text>

      <Box px={4}>
        <Input
          size="sm"
          variant="outline"
          color="gray.50"
          borderColor="gray.700"
          _placeholder={{ color: 'gray.700' }}
          _focusVisible={{ borderColor: 'gray.50' }}
          _readOnly={{ color: 'gray.500' }}
          value={workspaceName}
          onChange={(e) => {
            const { value } = e.target;
            if (value.length <= 30) {
              setWorkspaceName(value);
            }
          }}
          placeholder="Enter workspace name here"
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default WorkspaceCreateBlank;
