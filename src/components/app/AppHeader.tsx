// Dependencies
import { Box, Text } from '@chakra-ui/react';

// App header component
function AppHeader() {
  // Render
  return (
    <Box
      as="header"
      h="2rem"
      display="grid"
      placeItems="center"
      borderBottom="1px solid"
      borderColor="gray.700"
    >
      <Text as="h1" fontSize="lg">
        Minima Script IDE
      </Text>
    </Box>
  );
}

// Export
export default AppHeader;
