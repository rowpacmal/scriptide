import { Box, Highlight, Input, Text } from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import useFileStore from '@/stores/useFileStore';
import useAppTheme from '@/themes/useAppTheme';

// Constants
const CONFIRM_TEXT = 'Delete all files';

// Workspace rename modal component
function FilesDeleteAll({ onClose }) {
  // Define store
  const deleteAllFiles = useFileStore((state) => state.deleteAllFiles);

  // Define state
  const [confirmText, setConfirmText] = useState('');

  // Define theme
  const { accent, color, colorAlt, borderColor } = useAppTheme();

  // Render
  return (
    <ConfirmModal
      title="Delete all workspaces"
      buttonLabel="Confirm"
      onClose={onClose}
      onClick={() => {
        deleteAllFiles();
        setConfirmText('');
        onClose();
      }}
      disabled={confirmText !== CONFIRM_TEXT.toUpperCase()}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Are you sure you want to delete all files? This action cannot be undone.
        Please type the confirm text in&nbsp;
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
        <Input
          size="sm"
          variant="outline"
          borderColor={borderColor}
          _placeholder={{ color: borderColor }}
          _hover={{ borderColor: color }}
          _focusVisible={{
            borderColor: accent,
          }}
          _readOnly={{ color: colorAlt }}
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Enter confirm text here"
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default FilesDeleteAll;
