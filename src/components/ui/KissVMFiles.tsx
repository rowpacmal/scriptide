import useFileStore from '@/stores/useFileStore';
import useAppTheme from '@/themes/useAppTheme';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

function KissVMFiles() {
  // Define stores
  const files = useFileStore((state) => state.files);
  const currentFile = useFileStore((state) => state.currentFile);
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const loadFile = useFileStore((state) => state.loadFile);

  // Define theme
  const { bg, bgAlt, borderColor, color, colorAlt } = useAppTheme();

  // Define states
  const [kvmFiles, setKvmFiles] = useState<any>([]);

  // Define effects
  useEffect(() => {
    setKvmFiles(
      files.filter(
        (file) =>
          file.location.split('/').splice(3)[0] === 'contracts' &&
          file.name.endsWith('.kvm')
      )
    );
  }, [files]);

  // Render
  return (
    <Menu>
      <MenuButton
        textAlign="start"
        w="100%"
        size="sm"
        fontWeight="normal"
        variant="outline"
        color={colorAlt}
        borderColor={borderColor}
        _hover={{ color, bg: bgAlt }}
        _active={{ color, bg: bgAlt }}
        as={Button}
        rightIcon={<LuChevronDown />}
        disabled={kvmFiles.length < 1}
      >
        <Text isTruncated>
          {kvmFiles.length > 0
            ? currentFile?.endsWith('.kvm')
              ? currentFile.split('/').pop()
              : '-- Choose a file --'
            : '---'}
        </Text>
      </MenuButton>

      <MenuList bg={bg} borderColor={borderColor} py={0} overflow="hidden">
        {kvmFiles.map((file, index) => (
          <MenuItem
            key={index}
            py={1}
            color={colorAlt}
            bg="transparent"
            borderColor={borderColor}
            _hover={{ color, bg: bgAlt }}
            onClick={() => {
              setCurrentFolder(file.location.split('/').slice(0, -1).join('/'));
              setCurrentFile(file.location);
              loadFile(file.location);
            }}
          >
            {kvmFiles.length > 0 && file.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default KissVMFiles;
