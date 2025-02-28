// Import dependencies
import { Box, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
// Import store
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import components
import ConfirmModal from './ConfirmModal';
import BasicInput from '../systems/BasicInput';
import { DEFAULT_PLACEHOLDERS } from '@/constants';

// Constants
const PRESET_NAME = 'Workspace';

// Workspace rename modal component
function WorkspaceCreateBlank({ onClose }) {
  // Define toast
  const toast = useToast();

  // Define stores
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);

  // Define state
  const [workspaceName, setWorkspaceName] = useState(
    `${PRESET_NAME} ${Date.now()}`
  );

  // Render
  return (
    <ConfirmModal
      title="Create new workspace"
      buttonLabel="Create"
      onClose={onClose}
      onClick={() => {
        if (workspaces.includes(workspaceName)) {
          toast({
            title: 'Workspace name already exists',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });

          return;
        }

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
        <BasicInput
          placeholder={DEFAULT_PLACEHOLDERS.workspace}
          value={workspaceName}
          onChange={(e) => {
            const { value } = e.target;
            if (value.length <= 30) {
              setWorkspaceName(value);
            }
          }}
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default WorkspaceCreateBlank;
