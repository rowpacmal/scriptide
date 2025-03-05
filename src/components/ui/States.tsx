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
import useStateVariableStore from '@/stores/useStateVariableStore';
import useAppTheme from '@/themes/useAppTheme';
import { INPUT_PLACEHOLDERS } from '@/constants';

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
          value={stateVariables[index].index}
          onChange={(e) => updateStateVariableKey(index, e.target.value)}
          placeholder="---"
          maxW={10}
          textAlign="center"
        />
      </InputLeftAddon>

      <Input
        borderColor={borderColor}
        _placeholder={{ color: borderColor }}
        _readOnly={{ color: colorAlt }}
        value={stateVariables[index].value}
        onChange={(e) => updateStateVariableValue(index, e.target.value)}
        placeholder={INPUT_PLACEHOLDERS.value}
      />

      <InputRightAddon
        bg={bgAlt}
        borderColor={borderColor}
        borderLeft={0}
        px={1}
      >
        <Button
          p={0}
          h="auto"
          minW="auto"
          bg="transparent"
          color={colorAlt}
          _hover={{ bg: 'transparent', color: colorError }}
          onClick={() => removeStateVariable(index)}
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
            color: stateVariables.length > 255 ? '' : color,
            transform: stateVariables.length > 255 ? '' : 'scale(1.2)',
          }}
          _active={{ bg: 'transparent', color }}
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
          color={colorAlt}
          _hover={{
            bg: 'transparent',
            color: stateVariables.length < 1 ? '' : color,
            transform: stateVariables.length < 1 ? '' : 'scale(1.2)',
          }}
          _active={{ bg: 'transparent', color }}
          onClick={removeAllStateVariables}
          disabled={stateVariables.length < 1}
        >
          <LuTrash2 size={20} />
        </Button>
      </HStack>

      <VStack w="100%">
        {stateVariables.length > 0 ? (
          <>
            {stateVariables.map((_, index) => (
              <StateItem key={index} index={index} />
            ))}
          </>
        ) : (
          <Text w="100%" color={colorAlt}>
            No state variables
          </Text>
        )}
      </VStack>
    </VStack>
  );
}

// Export
export default States;
