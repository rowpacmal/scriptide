// Import dependencies
import {
  Button,
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
import usePrevStateVariableStore from '@/stores/usePrevStateVariableStore';
import useAppTheme from '@/themes/useAppTheme';
import { DEFAULT_PLACEHOLDER } from '@/constants';

// Utility component
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

  // Define theme
  const { bg, bgAlt, borderColor, colorAlt, colorError } = useAppTheme();

  // Render
  return (
    <InputGroup size="sm">
      <InputLeftAddon bg={bgAlt} borderColor={borderColor} px={1}>
        <Input
          size="xs"
          // variant="flushed"
          bg={bg}
          borderColor={borderColor}
          _placeholder={{ color: borderColor }}
          _readOnly={{ color: colorAlt }}
          value={prevStateVariables[index].index}
          onChange={(e) => updatePrevStateVariableKey(index, e.target.value)}
          placeholder="---"
          maxW={10}
          textAlign="center"
        />
      </InputLeftAddon>

      <Input
        borderColor={borderColor}
        _placeholder={{ color: borderColor }}
        _readOnly={{ color: colorAlt }}
        value={prevStateVariables[index].value}
        onChange={(e) => updatePrevStateVariableValue(index, e.target.value)}
        placeholder={DEFAULT_PLACEHOLDER.value}
      />

      <InputRightAddon bg={bgAlt} borderColor={borderColor} px={1}>
        <Button
          p={0}
          h="auto"
          minW="auto"
          bg="transparent"
          color={colorAlt}
          _hover={{ bg: 'transparent', color: colorError }}
          onClick={() => removePrevStateVariable(index)}
        >
          <LuX size={20} />
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
}

// State component
function PrevStates() {
  // Define stores
  const prevStateVariables = usePrevStateVariableStore(
    (state) => state.prevStateVariables
  );
  const addPrevStateVariable = usePrevStateVariableStore(
    (state) => state.addPrevStateVariable
  );
  const removeAllPrevStateVariables = usePrevStateVariableStore(
    (state) => state.removeAllPrevStateVariables
  );

  // Define theme
  const { color, colorAlt } = useAppTheme();

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={2}>
      <HStack w="100%" justify="space-between">
        <Button
          p={0}
          h="auto"
          minW="auto"
          bg="transparent"
          color={colorAlt}
          _hover={{
            bg: 'transparent',
            color: prevStateVariables.length > 255 ? '' : color,
            transform: prevStateVariables.length > 255 ? '' : 'scale(1.2)',
          }}
          _active={{ bg: 'transparent', color }}
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
          color={colorAlt}
          _hover={{
            bg: 'transparent',
            color: prevStateVariables.length < 1 ? '' : color,
            transform: prevStateVariables.length < 1 ? '' : 'scale(1.2)',
          }}
          _active={{ bg: 'transparent', color }}
          onClick={removeAllPrevStateVariables}
          disabled={prevStateVariables.length < 1}
        >
          <LuTrash2 size={20} />
        </Button>
      </HStack>

      <VStack w="100%">
        {prevStateVariables.length > 0 ? (
          <>
            {prevStateVariables.map((_, index) => (
              <PrevStateItem key={index} index={index} />
            ))}
          </>
        ) : (
          <Text w="100%" color={colorAlt}>
            No prevstate variables
          </Text>
        )}
      </VStack>
    </VStack>
  );
}

// Export
export default PrevStates;
