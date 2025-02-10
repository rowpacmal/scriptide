import { Input } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

function FileInput({ value, onBlur, onChange, onKeyDown }) {
  // Define ref
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef: any = useRef(null);

  // Define effect
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();

      if (value || value.length > 0) {
        const fileName = value.split('.');
        fileName.pop();

        const selection = fileName.join('.').length;
        inputRef.current.setSelectionRange(0, selection);
      }
    }
  }, []);

  // Render
  return (
    <Input
      ref={inputRef}
      placeholder="New_File.kvm"
      bg="gray.800"
      size="xs"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="none"
      _placeholder={{ color: 'gray.700' }}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

// Export
export default FileInput;
