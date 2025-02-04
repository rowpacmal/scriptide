// Import dependencies
import { ModalCloseButton, ModalContent, ModalHeader } from '@chakra-ui/react';

// Modal base component
function ModalBase({ children, title }) {
  // Render
  return (
    <ModalContent bg="gray.800" color="gray.500">
      <ModalHeader fontSize="md" fontWeight="normal" textTransform="uppercase">
        {title}
      </ModalHeader>

      <ModalCloseButton />

      {children}
    </ModalContent>
  );
}

// Export
export default ModalBase;
