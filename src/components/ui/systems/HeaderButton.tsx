// Import dependencies
import { Button, Tooltip } from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// Code editor header button component
function HeaderButton({
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

// Export
export default HeaderButton;
