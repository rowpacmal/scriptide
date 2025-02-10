import useFileStore from '@/store/useFileStore';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import FileInput from './FileInput';

function FileItemAdd({ setAddingFile }) {
  // Define toast
  const toast = useToast();

  // Define state
  const [fileName, setFileName] = useState('');

  // Define store
  const files = useFileStore((state) => state.files);
  const addFile = useFileStore((state) => state.addFile);

  return (
    <FileInput
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

          if (!name.includes('.')) {
            name += '.kvm';
          } else if (name.endsWith('.')) {
            name += 'kvm';
          }

          const newFile = name.split(' ').join('_');

          if (files.includes(newFile)) {
            toast({
              title: 'File name already exists.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return;
          }

          addFile(newFile);
          setFileName('');
          setAddingFile(false);
        }
      }}
    />
  );
}

export default FileItemAdd;
