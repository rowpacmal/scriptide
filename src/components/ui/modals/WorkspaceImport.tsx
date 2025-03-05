/* eslint-disable @typescript-eslint/no-explicit-any */
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
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import useUploadWorkspace from '@/hooks/useUploadWorkspace';
import BasicInput from '../systems/BasicInput';
import { INPUT_PLACEHOLDERS } from '@/constants';
import useAppTheme from '@/themes/useAppTheme';

// Workspace rename modal component
function WorkspaceImport({ onClose }) {
  // Define toast
  const toast = useToast();

  // Define ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Define Store
  const workspaces = useWorkspaceStore((state) => state.workspaces);

  // Define upload
  const { error, isUploading, progress, handleUploadWorkspace } =
    useUploadWorkspace();

  // Define state
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');

  // Define theme
  const { borderColor } = useAppTheme();

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

    const droppedFiles: any = Array.from(e.dataTransfer.files);
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
      setWorkspaceName(fileToUpload.name.split('.')[0]);
    }
  }, [fileToUpload]);

  useEffect(() => {
    if (progress === 1 && !error) {
      toast({
        title: 'File imported',
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
      title="Import Workspace"
      buttonLabel="Import"
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

        handleUploadWorkspace(fileToUpload, workspaceName);
        onClose();
      }}
      disabled={!fileToUpload || !workspaceName || isUploading}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Import a workspace zip file from your computer. Please select a zipped
        workspace to import and click the "Import" button.
      </Text>

      <Box px={4} pb={4}>
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

      <Box px={4}>
        <Input
          ref={fileInputRef}
          type="file"
          accept="application/zip, application/x-zip-compressed"
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

          <BasicInput
            outlineColor={isDragging ? 'blue.500' : ''}
            transition="outline-color 0.2s linear"
            placeholder="Choose a file or drag and drop"
            value={fileName}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            readOnly
          />
        </HStack>
      </Box>

      <Box pt={4}>
        <Box
          border="1px solid"
          borderColor={borderColor}
          borderRadius="md"
          p={2}
        >
          <Progress
            hasStripe
            value={progress ? progress * 100 : 0}
            colorScheme={
              error ? 'red' : progress && progress < 1 ? 'blue' : 'green'
            }
            bg={borderColor}
          />
        </Box>
      </Box>
    </ConfirmModal>
  );
}

// Export
export default WorkspaceImport;
