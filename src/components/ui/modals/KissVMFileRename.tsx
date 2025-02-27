/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Text, useToast } from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import BasicInput from '../systems/BasicInput';
import useFileStore from '@/stores/useFileStore';
import useEditorStore from '@/stores/useEditorStore';

// Workspace rename modal component
function KissVMFileRename({ onClose }) {
  // Define toast
  const toast = useToast();

  // Define stores
  const files = useFileStore((state) => state.files);
  const currentFile = useFileStore((state) => state.currentFile);
  const renameFile = useFileStore((state) => state.renameFile);
  const loadFile = useFileStore((state) => state.loadFile);
  const allCodes = useEditorStore((state) => state.allCodes);
  const removeCode = useEditorStore((state) => state.removeCode);

  // Define state
  const [fileName, setFileName] = useState(
    currentFile?.split('/').pop()?.replace('.kvm', '') || ''
  );

  // Render
  return (
    <ConfirmModal
      title="Rename script"
      buttonLabel="Save"
      onClose={onClose}
      onClick={() => {
        const find = files.find(
          (f: any) =>
            f.location.split('/').splice(3)[0] === 'contracts' &&
            f.name === fileName.replaceAll(' ', '_')
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

        if (
          !currentFile ||
          currentFile.split('/').splice(3)[0] !== 'contracts'
        ) {
          return;
        }

        const newFile = `${currentFile
          .split('/')
          .slice(0, -1)
          .join('/')}/${fileName.replaceAll(' ', '_')}.kvm`;

        renameFile(currentFile, newFile);

        if (allCodes.find((c) => c.file === currentFile)) {
          removeCode(currentFile);
          loadFile(newFile);
        }

        setFileName('');
        onClose();
      }}
      disabled={
        !fileName ||
        fileName === currentFile?.split('/').pop()?.replace('.kvm', '')
      }
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Rename the current script. Please type a new name for the script.
      </Text>

      <Box px={4}>
        <BasicInput
          placeholder="Enter script name here"
          value={fileName}
          onChange={(e: any) => {
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
export default KissVMFileRename;
