import { Box, Input, Text } from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import useFileSystem from '../../hooks/useFileSystem';
import { useContext, useState } from 'react';
import { appContext } from '../../AppContext';

// Workspace rename modal component
function WorkspaceCopy({ onClose }) {
  // Define context
  const { currentWorkspace } = useContext(appContext);

  // Define file system
  const { handleCopyWorkspace } = useFileSystem();

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
        handleCopyWorkspace(workspaceName);
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
