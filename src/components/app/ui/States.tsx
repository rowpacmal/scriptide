// Import dependencies
import {
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LuPlus, LuTrash2, LuX } from 'react-icons/lu';
import { appContext } from '../../../AppContext';
import { useContext } from 'react';

// Utility component
function StateItem({ index }) {
  // Define context
  const { stateVariables, setStateVariables } = useContext(appContext);

  // Render
  return (
    <InputGroup size="sm">
      <InputLeftAddon bg="gray.800" borderColor="gray.700" px={1}>
        <Input
          size="xs"
          // variant="flushed"
          bg="gray.900"
          borderColor="gray.700"
          _placeholder={{ color: 'gray.700' }}
          _readOnly={{ color: 'gray.500' }}
          value={stateVariables[index].index}
          onChange={(e) =>
            setStateVariables((prevState) => {
              if (
                isNaN(Number(e.target.value)) ||
                Number(e.target.value) < 0 ||
                Number(e.target.value) > 255
              )
                return prevState;

              const temp = [...prevState];
              temp[index].index = Number(e.target.value);
              return temp;
            })
          }
          placeholder="Indx"
          maxW={10}
          textAlign="center"
        />
      </InputLeftAddon>

      <Input
        borderColor="gray.700"
        _placeholder={{ color: 'gray.700' }}
        _readOnly={{ color: 'gray.500' }}
        value={stateVariables[index].value}
        onChange={(e) =>
          setStateVariables((prevState) => {
            const temp = [...prevState];
            temp[index].value = e.target.value;
            return temp;
          })
        }
        placeholder="Enter value"
      />

      <InputRightAddon
        bg="gray.800"
        borderColor="gray.700"
        borderLeft={0}
        px={1}
      >
        <Button
          p={0}
          h="auto"
          minW="auto"
          bg="transparent"
          color="gray.500"
          _hover={{ bg: 'transparent', color: 'red.500' }}
          onClick={() =>
            setStateVariables((prevState) => {
              const temp = [...prevState];
              temp.splice(index, 1);
              return temp;
            })
          }
        >
          <LuX size={20} />
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
}

function PrevStateItem({ index }) {
  // Define context
  const { prevStateVariables, setPrevStateVariables } = useContext(appContext);

  // Render
  return (
    <InputGroup size="sm">
      <InputLeftAddon bg="gray.800" borderColor="gray.700" px={1}>
        <Input
          size="xs"
          // variant="flushed"
          bg="gray.900"
          borderColor="gray.700"
          _placeholder={{ color: 'gray.700' }}
          _readOnly={{ color: 'gray.500' }}
          value={prevStateVariables[index].index}
          onChange={(e) =>
            setPrevStateVariables((prevState) => {
              if (
                isNaN(Number(e.target.value)) ||
                Number(e.target.value) < 0 ||
                Number(e.target.value) > 255
              )
                return prevState;

              const temp = [...prevState];
              temp[index].index = Number(e.target.value);
              return temp;
            })
          }
          placeholder="Indx"
          maxW={10}
          textAlign="center"
        />
      </InputLeftAddon>

      <Input
        borderColor="gray.700"
        _placeholder={{ color: 'gray.700' }}
        _readOnly={{ color: 'gray.500' }}
        value={prevStateVariables[index].value}
        onChange={(e) =>
          setPrevStateVariables((prevState) => {
            const temp = [...prevState];
            temp[index].value = e.target.value;
            return temp;
          })
        }
        placeholder="Value"
      />

      <InputRightAddon bg="gray.800" borderColor="gray.700" px={1}>
        <Button
          p={0}
          h="auto"
          minW="auto"
          bg="transparent"
          color="gray.500"
          _hover={{ bg: 'transparent', color: 'red.500' }}
          onClick={() =>
            setPrevStateVariables((prevState) => {
              const temp = [...prevState];
              temp.splice(index, 1);
              return temp;
            })
          }
        >
          <LuX size={20} />
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
}

// State component
function States() {
  // Define context
  const {
    stateVariables,
    setStateVariables,
    prevStateVariables,
    setPrevStateVariables,
  } = useContext(appContext);

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <VStack w="100%" gap={1}>
        <HStack w="100%" justify="space-between">
          <Text
            as="h3"
            textTransform="uppercase"
            color="gray.500"
            fontSize="xs"
          >
            States
          </Text>

          <HStack gap={1}>
            <Button
              p={0}
              h="auto"
              minW="auto"
              bg="transparent"
              color="gray.500"
              _hover={{
                bg: 'transparent',
                color: stateVariables.length > 255 ? '' : 'gray.50',
                transform: stateVariables.length > 255 ? '' : 'scale(1.2)',
              }}
              _active={{ bg: 'transparent', color: 'gray.50' }}
              onClick={() =>
                setStateVariables((prevState) => [
                  ...prevState,
                  {
                    index:
                      Object.keys(prevState).length > 0
                        ? prevState.at(-1).index === 255
                          ? 255
                          : prevState.at(-1).index + 1
                        : 0,
                    value: '',
                  },
                ])
              }
              disabled={stateVariables.length > 255}
            >
              <LuPlus size={20} />
            </Button>

            <Button
              p={0}
              h="auto"
              minW="auto"
              bg="transparent"
              color="gray.500"
              _hover={{
                bg: 'transparent',
                color: stateVariables.length < 1 ? '' : 'gray.50',
                transform: stateVariables.length < 1 ? '' : 'scale(1.2)',
              }}
              _active={{ bg: 'transparent', color: 'gray.50' }}
              onClick={() => setStateVariables([])}
              disabled={stateVariables.length < 1}
            >
              <LuTrash2 size={20} />
            </Button>
          </HStack>
        </HStack>

        <VStack w="100%">
          {stateVariables.length > 0 ? (
            <>
              {stateVariables.map((_, index) => (
                <StateItem key={index} index={index} />
              ))}
            </>
          ) : (
            <Text w="100%" color="gray.500">
              No state variables
            </Text>
          )}
        </VStack>
      </VStack>

      <Divider borderColor="gray.700" />

      <VStack w="100%" gap={1}>
        <HStack w="100%" justify="space-between">
          <Text
            as="h3"
            textTransform="uppercase"
            color="gray.500"
            fontSize="xs"
          >
            PrevStates
          </Text>

          <HStack gap={1}>
            <Button
              p={0}
              h="auto"
              minW="auto"
              bg="transparent"
              color="gray.500"
              _hover={{
                bg: 'transparent',
                color: prevStateVariables.length > 255 ? '' : 'gray.50',
                transform: prevStateVariables.length > 255 ? '' : 'scale(1.2)',
              }}
              _active={{ bg: 'transparent', color: 'gray.50' }}
              onClick={() =>
                setPrevStateVariables((prevState) => [
                  ...prevState,
                  {
                    index:
                      Object.keys(prevState).length > 0
                        ? prevState.at(-1).index === 255
                          ? 255
                          : prevState.at(-1).index + 1
                        : 0,
                    value: '',
                  },
                ])
              }
              disabled={prevStateVariables.length > 255}
            >
              <LuPlus size={20} />
            </Button>

            <Button
              p={0}
              h="auto"
              minW="auto"
              bg="transparent"
              color="gray.500"
              _hover={{
                bg: 'transparent',
                color: prevStateVariables.length < 1 ? '' : 'gray.50',
                transform: prevStateVariables.length < 1 ? '' : 'scale(1.2)',
              }}
              _active={{ bg: 'transparent', color: 'gray.50' }}
              onClick={() => setPrevStateVariables([])}
              disabled={prevStateVariables.length < 1}
            >
              <LuTrash2 size={20} />
            </Button>
          </HStack>
        </HStack>

        <VStack w="100%">
          {prevStateVariables.length > 0 ? (
            <>
              {prevStateVariables.map((_, index) => (
                <PrevStateItem key={index} index={index} />
              ))}
            </>
          ) : (
            <Text w="100%" color="gray.500">
              No prevstate variables
            </Text>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
}

// Export
export default States;
