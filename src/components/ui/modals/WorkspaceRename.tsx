import { Box, Text, useToast } from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import BasicInput from '../systems/BasicInput';
import { INPUT_PLACEHOLDERS } from '@/constants';

// Workspace rename modal component
function WorkspaceRename({ onClose }) {
  // Define toast
  const toast = useToast();

  // Define stores
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const renameWorkspace = useWorkspaceStore((state) => state.renameWorkspace);

  // Define state
  const [workspaceName, setWorkspaceName] = useState(currentWorkspace || '');

  // Render
  return (
    <ConfirmModal
      title="Rename workspace"
      buttonLabel="Save"
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

        renameWorkspace(workspaceName);
        setWorkspaceName('');
        onClose();
      }}
      disabled={workspaceName === currentWorkspace}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Rename the current workspace. Please type a new name for the workspace.
      </Text>

      <Box px={4}>
        <BasicInput
          placeholder={INPUT_PLACEHOLDERS.workspace}
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
export default WorkspaceRename;
