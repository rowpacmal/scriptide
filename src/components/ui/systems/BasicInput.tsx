/* eslint-disable @typescript-eslint/no-explicit-any */
import useAppTheme from '@/themes/useAppTheme';
import { Input } from '@chakra-ui/react';

function BasicInput({ ...props }) {
  // Define theme
  const { accent, borderColor, color, colorAlt } = useAppTheme();

  return (
    <Input
      size="sm"
      variant="outline"
      color={color}
      borderColor={borderColor}
      _hover={{ borderColor: color }}
      _placeholder={{ color: borderColor }}
      _focusVisible={{ borderColor: accent }}
      _readOnly={{ color: colorAlt }}
      {...props}
    />
  );
}

export default BasicInput;
