import { Box, Text } from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import BasicInput from '../systems/BasicInput';
import { INPUT_PLACEHOLDERS } from '@/constants';
import BasicHighlight from '../systems/BasicHighlight';

// Workspace rename modal component
function WorkspaceDelete({ onClose }) {
  // Define stores
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const deleteWorkspace = useWorkspaceStore((state) => state.deleteWorkspace);

  // Define state
  const [workspaceName, setWorkspaceName] = useState('');

  // Render
  return (
    <ConfirmModal
      title="Delete workspace"
      buttonLabel="Confirm"
      onClose={onClose}
      onClick={() => {
        deleteWorkspace();
        setWorkspaceName('');
        onClose();
      }}
      disabled={workspaceName !== currentWorkspace}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Are you sure you want to delete this workspace? This action cannot be
        undone. Please type the workspace name to confirm.
      </Text>

      <BasicHighlight
        pb={4}
        query={currentWorkspace ? currentWorkspace : '---'}
      />

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
export default WorkspaceDelete;
