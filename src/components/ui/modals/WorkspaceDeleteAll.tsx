import { Box, Text } from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import BasicInput from '../systems/BasicInput';
import BasicHighlight from '../systems/BasicHighlight';
import { DEFAULT_PLACEHOLDER } from '@/constants';

// Constants
const CONFIRM_TEXT = 'Delete all workspaces';

// Workspace rename modal component
function WorkspaceDeleteAll({ onClose }) {
  // Define store
  const deleteAllWorkspaces = useWorkspaceStore(
    (state) => state.deleteAllWorkspaces
  );

  // Define state
  const [confirmText, setConfirmText] = useState('');

  // Render
  return (
    <ConfirmModal
      title="Delete all workspaces"
      buttonLabel="Confirm"
      onClose={onClose}
      onClick={() => {
        deleteAllWorkspaces();
        setConfirmText('');
        onClose();
      }}
      disabled={confirmText !== CONFIRM_TEXT.toUpperCase()}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Are you sure you want to delete all workspaces? This action cannot be
        undone. Please type the confirm text in{' '}
        <span className="uppercase">uppercase</span> to confirm.
      </Text>

      <BasicHighlight pb={4} query={CONFIRM_TEXT.toUpperCase()} />

      <Box px={4}>
        <BasicInput
          placeholder={DEFAULT_PLACEHOLDER.confirm}
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default WorkspaceDeleteAll;
