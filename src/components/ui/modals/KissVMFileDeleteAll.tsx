import { Box, Highlight, Text } from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import BasicInput from '../systems/BasicInput';
import useFileStore from '@/stores/useFileStore';

// Constants
const CONFIRM_TEXT = 'Delete all scripts';

// Workspace rename modal component
function KissVMFileDeleteAll({ onClose }) {
  // Define store
  const deleteFolder = useFileStore((state) => state.deleteFolder);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  // Define state
  const [confirmText, setConfirmText] = useState('');

  // Render
  return (
    <ConfirmModal
      title="Delete all scripts"
      buttonLabel="Confirm"
      onClose={onClose}
      onClick={() => {
        deleteFolder(`/workspaces/${currentWorkspace}/contracts`);
        setConfirmText('');
        onClose();
      }}
      disabled={confirmText !== CONFIRM_TEXT.toUpperCase()}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Are you sure you want to delete all scripts? This action cannot be
        undone. Please type the confirm text in{' '}
        <span className="uppercase">uppercase</span> to confirm.
      </Text>

      <Text pb={4} textAlign="center">
        <Highlight
          query={CONFIRM_TEXT.toUpperCase()}
          styles={{
            px: '3',
            py: '1',
            rounded: 'sm',
            color: 'gray.50',
            bg: 'red.700',
            userSelect: 'none',
          }}
        >
          {CONFIRM_TEXT.toUpperCase()}
        </Highlight>
      </Text>

      <Box px={4}>
        <BasicInput
          placeholder="Enter confirm text here"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default KissVMFileDeleteAll;
