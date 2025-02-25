import { Box, Input, Text, useToast } from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import useWorkspaceStore from '@/store/useWorkspaceStore';

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
export default WorkspaceCopy;
