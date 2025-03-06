// Import dependencies
import { Button, Tooltip } from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// Button component
function BasicButton({
  children,
  label,
  hoverColor = '',
  onClick,
  disabled = false,
}) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  // Render
  return (
    <Tooltip label={label} placement="bottom" hasArrow>
      <Button
        size="sm"
        bg="transparent"
        color={colorAlt}
        p={0}
        _hover={{
          bg: 'transparent',
          color: disabled ? '' : hoverColor || color,
        }}
        _active={{
          bg: 'transparent',
        }}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    </Tooltip>
  );
}

// Hover button component
function BasicHoverButton({
  children,
  label,
  onClick,
  isLoading = false,
  disabled = false,
}) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  // Render
  return (
    <Tooltip label={label} placement="top" hasArrow>
      <Button
        p={0}
        h="auto"
        minW="auto"
        bg="transparent"
        color={colorAlt}
        _hover={{
          bg: 'transparent',
          color: disabled ? '' : color,
          transform: disabled ? '' : 'scale(1.2)',
        }}
        _active={{ bg: 'transparent', color: color }}
        onClick={onClick}
        isLoading={isLoading}
        disabled={disabled}
      >
        {children}
      </Button>
    </Tooltip>
  );
}

// Export
export { BasicButton, BasicHoverButton };
