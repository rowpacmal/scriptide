import useFileStore from '@/store/useFileStore';
import useAppTheme from '@/themes/useAppTheme';
import { Input } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

function FileInput({ value, onBlur, onChange, onKeyDown }) {
  // Define ref
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef: any = useRef(null);

  // Define theme
  const { bgAlt, borderColor } = useAppTheme();

  // Define store
  const isFolder = useFileStore((state) => state.isFolder);

  // Define effect
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();

      if (value || value.length > 0) {
        let selection = value;

        if (selection.includes('.')) {
          selection = selection.split('.');
          selection.pop();
          selection = selection.join('.');
        }

        inputRef.current.setSelectionRange(0, selection.length);
      }
    }
  }, []);

  // Render
  return (
    <Input
      ref={inputRef}
      placeholder={isFolder ? 'New_Folder' : 'New_File.kvm'}
      bg={bgAlt}
      size="xs"
      border="1px solid"
      borderColor={borderColor}
      borderRadius="none"
      _placeholder={{ color: borderColor }}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

// Export
export default FileInput;
