import useFileStore from '@/store/useFileStore';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import FileInput from './FileInput';

function FileItemRename({ file, setRenamingFile }) {
  // Define toast
  const toast = useToast();

  // Define state
  const [fileName, setFileName] = useState(file || '');

  // Define store
  const files = useFileStore((state) => state.files);
  const renameFile = useFileStore((state) => state.renameFile);

  return (
    <FileInput
      value={fileName}
      onBlur={() => setRenamingFile(false)}
      onChange={(e) => setFileName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          let name = fileName.trim();

          if (name.length === 0) {
            toast({
              title: 'File name cannot be empty.',
              status: 'warning',
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
              status: 'warning',
              duration: 3000,
              isClosable: true,
            });
            return;
          }

          renameFile(file, newFile);
          setFileName('');
          setRenamingFile(false);
        }
      }}
    />
  );
}

export default FileItemRename;
