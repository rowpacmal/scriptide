// Dependencies
import useAppTheme from '@/themes/useAppTheme';
import { Box } from '@chakra-ui/react';

// App footer component
function Footer() {
  const { borderColor } = useAppTheme();

  // Render
  return (
    <Box
      as="footer"
      h="1rem"
      textAlign="center"
      borderTop="1px solid"
      borderColor={borderColor}
    />
  );
}

// Export
export default Footer;
