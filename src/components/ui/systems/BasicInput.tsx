import useAppTheme from '@/themes/useAppTheme';
import { Input } from '@chakra-ui/react';

function BasicInput({ placeholder, value, onChange }) {
  // Define theme
  const { accent, borderColor, color, colorAlt } = useAppTheme();

  return (
    <Input
      size="sm"
      variant="outline"
      color={color}
      borderColor={borderColor}
      _placeholder={{ color: borderColor }}
      _focusVisible={{ borderColor: accent }}
      _readOnly={{ color: colorAlt }}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default BasicInput;
