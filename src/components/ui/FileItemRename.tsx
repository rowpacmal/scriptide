import useFileStore from '@/store/useFileStore';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import FileInput from './FileInput';

function FileItemRename({ file, setRenamingFile }) {
  // Define toast
  const toast = useToast();

  // Define state
  const [fileName, setFileName] = useState(file.name || '');

  // Define store
  const files = useFileStore((state) => state.files);
  const renameFile = useFileStore((state) => state.renameFile);
  const isFolder = useFileStore((state) => state.isFolder);
  const setIsFolder = useFileStore((state) => state.setIsFolder);

  return (
    <FileInput
      value={fileName}
      onBlur={() => {
        setRenamingFile(false);
        setIsFolder(null);
      }}
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

          if (isFolder) {
            name = name.split('.')[0];
          } else {
            if (!name.includes('.')) {
              name += '.kvm';
            } else if (name.endsWith('.')) {
              name += 'kvm';
            }
          }

          name = name.split(' ').join('_');

          const path = `${file.location
            .split('/')
            .slice(0, -1)
            .join('/')}/${name}`;

          for (const file of files) {
            if (file.location === path) {
              toast({
                title: 'File or directory with this name already exists.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
              });
              return;
            }
          }

          renameFile(file.location, path);

          setRenamingFile(false);
          setIsFolder(null);
        }
      }}
    />
  );
}

export default FileItemRename;
