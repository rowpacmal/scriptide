import useFileSystem from '@/hooks/useFileSystem';
import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { LuX } from 'react-icons/lu';

function NewFileItem({ setAddingFile }) {
  const toast = useToast();

  // refs
  const inputRef = useRef(null);

  const [fileName, setFileName] = useState('');

  // Define file system
  const { handleNewFile } = useFileSystem();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <InputGroup size="xs" border="1px solid" borderColor="gray.700">
      <Input
        ref={inputRef}
        placeholder="New_File.kvm"
        bg="gray.800"
        borderColor="transparent"
        borderRadius="none"
        _placeholder={{ color: 'gray.700' }}
        value={fileName}
        onBlur={() => setAddingFile(false)}
        onChange={(e) => setFileName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            let name = fileName.trim();

            if (name.length === 0) {
              toast({
                title: 'File name cannot be empty.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
              return;
            }

            // if (!name.endsWith('.kvm') || name.endsWith('.extra.kvm')) {
            //   name = name.split('.')[0] + '.kvm';
            // }

            if (!name.includes('.')) {
              name += '.kvm';
            } else if (name.endsWith('.')) {
              name += 'kvm';
            }

            const newFile = name.split(' ').join('_');

            handleNewFile(newFile);
            setFileName('');
            setAddingFile(false);
          }
        }}
      />

      {/* Unused close button - using a onBlur instead */}
      {/* <InputRightAddon bg="gray.800" borderRadius="none" border="none" p={0}>
        <Button
          size="xs"
          borderRadius="none"
          p={0}
          bg="transparent"
          color="gray.500"
          _hover={{ bg: 'transparent', color: 'red.500' }}
          onClick={() => setAddingFile(false)}
        >
          <LuX />
        </Button>
      </InputRightAddon> */}
    </InputGroup>
  );
}

export default NewFileItem;
