// Import dependencies
import { Highlight, Text } from '@chakra-ui/react';

// Basic highlight component
function BasicHighlight({ query, ...props }) {
  // Render
  return (
    <Text textAlign="center" {...props}>
      <Highlight
        query={query}
        styles={{
          px: '2',
          py: '1',
          rounded: 'sm',
          color: 'gray.50',
          bg: 'red.700',
          userSelect: 'none',
        }}
      >
        {query}
      </Highlight>
    </Text>
  );
}

// Export
export default BasicHighlight;
