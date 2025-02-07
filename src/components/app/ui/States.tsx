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
// Import store
import useStateVariableStore from '@/store/useStateVariableStore';
import usePrevStateVariableStore from '@/store/usePrevStateVariableStore';

// Utility component
function StateItem({ index }) {
  // Define store
  const stateVariables = useStateVariableStore((state) => state.stateVariables);
  const updateStateVariableKey = useStateVariableStore(
    (state) => state.updateStateVariableKey
  );
  const updateStateVariableValue = useStateVariableStore(
    (state) => state.updateStateVariableValue
  );
  const removeStateVariable = useStateVariableStore(
    (state) => state.removeStateVariable
  );

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
          onChange={(e) => updateStateVariableKey(index, e.target.value)}
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
        onChange={(e) => updateStateVariableValue(index, e.target.value)}
        placeholder="Enter value here"
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
          onClick={() => removeStateVariable(index)}
        >
          <LuX size={20} />
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
}
function PrevStateItem({ index }) {
  // Define stores
  const prevStateVariables = usePrevStateVariableStore(
    (state) => state.prevStateVariables
  );
  const updatePrevStateVariableKey = usePrevStateVariableStore(
    (state) => state.updatePrevStateVariableKey
  );
  const updatePrevStateVariableValue = usePrevStateVariableStore(
    (state) => state.updatePrevStateVariableValue
  );
  const removePrevStateVariable = usePrevStateVariableStore(
    (state) => state.removePrevStateVariable
  );

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
          onChange={(e) => updatePrevStateVariableKey(index, e.target.value)}
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
        onChange={(e) => updatePrevStateVariableValue(index, e.target.value)}
        placeholder="Enter value here"
      />

      <InputRightAddon bg="gray.800" borderColor="gray.700" px={1}>
        <Button
          p={0}
          h="auto"
          minW="auto"
          bg="transparent"
          color="gray.500"
          _hover={{ bg: 'transparent', color: 'red.500' }}
          onClick={() => removePrevStateVariable(index)}
        >
          <LuX size={20} />
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
}

// State component
function States() {
  // Define stores
  const stateVariables = useStateVariableStore((state) => state.stateVariables);
  const addStateVariable = useStateVariableStore(
    (state) => state.addStateVariable
  );
  const removeAllStateVariables = useStateVariableStore(
    (state) => state.removeAllStateVariables
  );

  const prevStateVariables = usePrevStateVariableStore(
    (state) => state.prevStateVariables
  );
  const addPrevStateVariable = usePrevStateVariableStore(
    (state) => state.addPrevStateVariable
  );
  const removeAllPrevStateVariables = usePrevStateVariableStore(
    (state) => state.removeAllPrevStateVariables
  );

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
              onClick={addStateVariable}
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
              onClick={removeAllStateVariables}
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
              onClick={addPrevStateVariable}
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
              onClick={removeAllPrevStateVariables}
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
