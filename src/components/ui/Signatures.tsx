// Import dependencies
import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { appContext } from '../../AppContext';
import { useContext } from 'react';
import { LuArrowDown, LuArrowUp } from 'react-icons/lu';

// Signatures component
function Signatures() {
  // Define context
  const { signatures, setSignatures } = useContext(appContext);

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <HStack w="100%">
        <Button
          size="xs"
          colorScheme="green"
          onClick={() => {
            if (signatures.length < 10) {
              setSignatures((prevState) => [...prevState, '']);
            }
          }}
          disabled={signatures.length >= 10}
        >
          <LuArrowDown />
        </Button>

        <Button
          size="xs"
          colorScheme="red"
          onClick={() =>
            setSignatures((prevState) => {
              const temp = [...prevState];
              temp.pop();

              return temp;
            })
          }
          disabled={signatures.length < 1}
        >
          <LuArrowUp />
        </Button>
      </HStack>

      {signatures.length > 0 ? (
        <>
          {signatures.map((_, index) => (
            <HStack key={index} w="100%">
              <Text color="gray.500" whiteSpace="nowrap">
                {index < 10 ? `0${index}` : index} :
              </Text>

              <Input
                size="sm"
                variant="outline"
                borderColor="gray.700"
                _placeholder={{ color: 'gray.700' }}
                _focusVisible={{ borderColor: 'orange.500' }}
                _readOnly={{ color: 'gray.500' }}
                value={signatures[index]}
                onChange={(e) =>
                  setSignatures((prevState) => {
                    prevState[index] = e.target.value;
                    return [...prevState];
                  })
                }
                placeholder="Enter value here"
              />
            </HStack>
          ))}
        </>
      ) : (
        <Text w="100%" color="gray.500">
          No signatures
        </Text>
      )}
    </VStack>
  );
}

// Export
export default Signatures;
