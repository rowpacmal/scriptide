import { Text, VStack } from '@chakra-ui/react';

function Home() {
  return (
    <VStack w="100%" color="gray.500" textAlign="center" gap={3}>
      <Text as="h3" w="100%" fontSize="lg">
        Welcome to Minima Script IDE!
      </Text>

      <hr className="w-full border-gray-700" />

      <Text w="100%">
        This is a simple IDE for writing and testing Minima scripts - KISS VM.
      </Text>

      <Text w="100%">
        It is a work in progress and will be improved as time goes by. If you
        find any bugs or have any suggestions, please let me know, and please be
        patient as this project is still under development.
      </Text>
    </VStack>
  );
}

export default Home;
