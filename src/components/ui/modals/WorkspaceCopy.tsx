import { Box, Text, useToast } from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import BasicInput from '../systems/BasicInput';
import { INPUT_PLACEHOLDERS } from '@/constants';

// Workspace rename modal component
function WorkspaceCopy({ onClose }) {
  // Define toast
  const toast = useToast();

  // Define stores
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const copyWorkspace = useWorkspaceStore((state) => state.copyWorkspace);

  // Define state
  const [workspaceName, setWorkspaceName] = useState(
    `${currentWorkspace} Copy`
  );

  // Render
  return (
    <ConfirmModal
      title="Copy workspace"
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

        copyWorkspace(workspaceName);
        setWorkspaceName('');
        onClose();
      }}
      disabled={workspaceName === currentWorkspace}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Copy the current workspace. Please type a new name for the new
        workspace.
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
export default WorkspaceCopy;
