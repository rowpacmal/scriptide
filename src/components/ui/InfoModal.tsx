// Import dependencies
import { Button, ModalBody, ModalFooter } from '@chakra-ui/react';
// Import components
import ModalBase from './ModalBase';

// Confirm modal component
function InfoModal({ children, title, onClose }) {
  // Render
  return (
    <ModalBase title={title}>
      <ModalBody>{children}</ModalBody>

      <ModalFooter justifyContent="center" gap={2}>
        <Button variant="ghost" colorScheme="red" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalBase>
  );
}

// Export
export default InfoModal;
