import { Box, Highlight, Text } from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import { useMemo, useState } from 'react';
import BasicInput from '../systems/BasicInput';
import useFileStore from '@/stores/useFileStore';

// Workspace rename modal component
function KissVMFileDelete({ onClose }) {
  // Define stores
  const currentFile = useFileStore((state) => state.currentFile);
  const deleteFile = useFileStore((state) => state.deleteFile);

  // Define state
  const [fileName, setFileName] = useState('');
  const fileToDelete = useMemo(() => {
    if (currentFile) {
      return currentFile.split('/').pop()?.replace('.kvm', '');
    }

    return null;
  }, [currentFile]);

  // Render
  return (
    <ConfirmModal
      title="Delete script"
      buttonLabel="Confirm"
      onClose={onClose}
      onClick={() => {
        if (!currentFile) {
          return;
        }

        deleteFile(currentFile);
        setFileName('');
        onClose();
      }}
      disabled={fileName !== fileToDelete}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Are you sure you want to delete this script? This action cannot be
        undone. Please type the script name to confirm.
      </Text>

      <Text pb={4} textAlign="center">
        <Highlight
          query={fileToDelete || '---'}
          styles={{
            px: '2',
            py: '1',
            rounded: 'sm',
            color: 'gray.50',
            bg: 'red.700',
            userSelect: 'none',
          }}
        >
          {fileToDelete || '---'}
        </Highlight>
      </Text>

      <Box px={4}>
        <BasicInput
          placeholder="Enter script name here"
          value={fileName}
          onChange={(e) => {
            const { value } = e.target;
            if (value.length <= 30) {
              setFileName(value);
            }
          }}
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default KissVMFileDelete;
