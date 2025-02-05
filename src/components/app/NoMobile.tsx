import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  VStack,
} from '@chakra-ui/react';

function NoMobile() {
  return (
    <VStack h="calc(100vh - 3rem)" justify="center" p={4}>
      <Alert
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        bg="gray.800"
        color="gray.500"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.700"
      >
        <AlertIcon boxSize="40px" mr={0} color="gray.500" />

        <AlertTitle mt={4} mb={1} fontSize="lg">
          Mobile not supported!
        </AlertTitle>

        <AlertDescription maxWidth="sm">
          MiniDapp is not compatible with mobile devices yet. Please be patient
          and use the desktop version for now.
        </AlertDescription>
      </Alert>
    </VStack>
  );
}

export default NoMobile;
