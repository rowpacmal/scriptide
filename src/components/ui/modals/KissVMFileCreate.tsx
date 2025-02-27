/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { Box, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
// Import store
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import components
import ConfirmModal from './ConfirmModal';
import BasicInput from '../systems/BasicInput';
import useFileStore from '@/stores/useFileStore';

// Constants
const PRESET_NAME = 'New_Script';

// Workspace rename modal component
function KissVMFileCreate({ onClose }) {
  // Define toast
  const toast = useToast();

  // Define stores
  const files = useFileStore((state) => state.files);
  const addFile = useFileStore((state) => state.addFile);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  // Define state
  const [fileName, setFileName] = useState(PRESET_NAME + '_' + Date.now());

  // Render
  return (
    <ConfirmModal
      title="Create new script"
      buttonLabel="Create"
      onClose={onClose}
      onClick={() => {
        const find = files.find(
          (f: any) =>
            f.location.split('/').splice(3)[0] === 'contracts' &&
            f.name === `${fileName.replaceAll(' ', '_')}.kvm`
        );

        if (find) {
          toast({
            title: 'Script name already exists',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });

          return;
        }

        if (!currentWorkspace) {
          return;
        }

        addFile(
          `/workspaces/${currentWorkspace}/contracts/${fileName.replaceAll(
            ' ',
            '_'
          )}.kvm`
        );
        setFileName('');
        onClose();
      }}
      disabled={!fileName}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Create a new script. Please type a name for the new script.
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
export default KissVMFileCreate;
