import {
  Box,
  Button,
  HStack,
  Input,
  Progress,
  Text,
  useToast,
} from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import { useEffect, useRef, useState } from 'react';
import useUploadFile from '@/hooks/useUploadFile';
import useWorkspaceStore from '@/store/useWorkspaceStore';

// Workspace rename modal component
function FilesUpload({ onClose }) {
  // Define toast
  const toast = useToast();

  // Define ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Define Store
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  // Define upload
  const { error, isUploading, progress, handleUploadFile } =
    useUploadFile(fileInputRef);

  // Define state
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Define handlers
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior to allow drop
    e.stopPropagation(); // Stop event from bubbling up
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // Set dragging state to false when leaving
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event from bubbling up
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFileToUpload(droppedFiles[0]);
  };
  const handleOpenFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Define effect
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error uploading file',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error]);

  useEffect(() => {
    if (fileToUpload) {
      setFileName(fileToUpload.name);
    }
  }, [fileToUpload]);

  useEffect(() => {
    if (progress === 1 && !error) {
      toast({
        title: 'File uploaded',
        description: fileName,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [progress]);

  // Render
  return (
    <ConfirmModal
      title="Upload file"
      buttonLabel="Upload"
      onClose={onClose}
      onClick={() => {
        if (!currentWorkspace) {
          return;
        }

        handleUploadFile(fileToUpload, currentWorkspace);
      }}
      disabled={!fileToUpload || isUploading}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Upload a file from your computer. Please select a file to upload and
        click the "Upload" button.
      </Text>

      <Box px={4}>
        <Input
          ref={fileInputRef}
          type="file"
          accept=".kvm, application/javascript, text/html, text/css image/jpeg, image/png, image/gif"
          display="none"
          onChange={(e) => {
            const files = e.target.files;

            if (files) {
              setFileToUpload(files[0]);
            }
          }}
        />

        <HStack>
          <Box>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={handleOpenFileSelector}
              isLoading={isUploading}
            >
              Choose File
            </Button>
          </Box>

          <Input
            size="sm"
            variant="outline"
            color="gray.50"
            borderColor="gray.700"
            outlineColor={isDragging ? 'blue.500' : ''}
            transition="outline-color 0.2s linear"
            _placeholder={{ color: 'gray.700' }}
            _focusVisible={{ borderColor: 'gray.50' }}
            _readOnly={{ color: 'gray.500' }}
            value={fileName}
            placeholder="Choose a file or drag and drop"
            readOnly
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        </HStack>
      </Box>

      <Box pt={4}>
        <Box border="1px solid" borderColor="gray.700" borderRadius="md" p={2}>
          <Progress
            hasStripe
            value={progress ? progress * 100 : 0}
            colorScheme={
              error ? 'red' : progress && progress < 1 ? 'blue' : 'green'
            }
            bg="gray.700"
          />
        </Box>
      </Box>
    </ConfirmModal>
  );
}

// Export
export default FilesUpload;
