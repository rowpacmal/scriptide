import { Highlight, Text } from '@chakra-ui/react';

function BasicHighlight({ query, ...props }) {
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

export default BasicHighlight;
