// Import dependencies
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';
// Import store
import useFileStore from '@/store/useFileStore';
import { useEffect, useState } from 'react';

// Files component
function FilteredFiles({ extension }: { extension: string }) {
  // Define stores
  const files = useFileStore((state) => state.files);
  const currentFile = useFileStore((state) => state.currentFile);
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);
  const loadFile = useFileStore((state) => state.loadFile);

  const [filteredFiles, setFilteredFiles] = useState<string[]>([]);

  useEffect(() => {
    setFilteredFiles(files.filter((file) => file.name.endsWith(extension)));
  }, [files, extension]);

  // Render
  return (
    <Menu>
      <MenuButton
        textAlign="start"
        w="100%"
        size="sm"
        fontWeight="normal"
        variant="outline"
        color="gray.500"
        borderColor="gray.700"
        _hover={{ color: 'gray.50', bg: 'gray.800' }}
        _active={{ color: 'gray.50', bg: 'gray.800' }}
        as={Button}
        rightIcon={<LuChevronDown />}
        disabled={filteredFiles.length < 1}
      >
        <Text isTruncated>
          {filteredFiles.length > 0
            ? currentFile
              ? currentFile
              : '-- pick a file --'
            : '---'}
        </Text>
      </MenuButton>

      <MenuList bg="gray.800" borderColor="gray.700" py={0} overflow="hidden">
        {filteredFiles.map((file, index) => (
          <MenuItem
            key={index}
            py={1}
            bg="transparent"
            borderColor="gray.700"
            _hover={{ bg: 'gray.700' }}
            onClick={() => {
              setCurrentFile(file);
              loadFile(file);
            }}
          >
            {filteredFiles.length > 0 && file}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

// Export
export default FilteredFiles;
