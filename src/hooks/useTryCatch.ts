/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { useToast } from '@chakra-ui/react';

// Try catch hook
function useTryCatch() {
  const toast = useToast();

  function tryCatch(callback: any) {
    try {
      callback();
    } catch (error: any) {
      // Debug the reject object
      console.error('MDS Error Response Object: ', error);

      /**
       * ! Toast not triggering !
       */
      toast({
        title: 'Error',
        description: error.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  // Return try catch
  return tryCatch;
}

// Export
export default useTryCatch;
