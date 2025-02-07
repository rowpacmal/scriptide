// Import dependencies
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { LuMinus, LuPlus } from 'react-icons/lu';
// Import context
import { appContext } from '../../../AppContext';
// Import store
import useRunScriptStore from '@/store/useRunScriptStore';

// Globals component
function Globals() {
  // Define store
  const script0xAddress = useRunScriptStore((state) => state.script0xAddress);

  // Define context
  const { globals, setGlobals } = useContext(appContext);

  // Define states
  const [accordionIndex, setAccordionIndex] = useState(
    JSON.parse(localStorage.getItem('accordion-index') || '[1]')
  );

  // Define functions
  function handleGlobalChange(key: string, value: string) {
    setGlobals((prevState) => ({ ...prevState, [key]: value }));
  }

  // Define functions
  function handleOnChange(index: number[]) {
    setAccordionIndex(index);
    localStorage.setItem('accordion-index', JSON.stringify(index));
  }

  // constants
  const GLOBAL_DETAILS = {
    '@ADDRESS': 'View the script address (read only).', // This is read only field
    '@BLOCK': 'Set the current block number.',
    '@BLOCKMILLI': 'Set the current block time in milliseconds.',
    '@CREATED': 'Set the block this coin was created in.',
    '@COINAGE': 'Set the difference in @BLOCK and @CREATED.',
    '@COINID': 'Set the coin ID.',
    '@TOKENID': 'Set the token ID.',
    '@AMOUNT': 'Set the amount.',
    '@INPUT':
      'Set the input index of a coin used in the transaction, first input coin has an index of 0.',
    '@TOTIN': 'Set the total number of input coins.',
    '@TOTOUT': 'Set the total number of output coins.',
  };

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <Accordion
        borderColor="gray.700"
        w="100%"
        index={accordionIndex}
        onChange={handleOnChange}
        allowMultiple
      >
        {/**
         * There is a bug with the Accordion component, preventing 0 index to be used.
         * Find a workaround to fix this, by adding an initial empty AccordionItem that
         * has "display: none", and start indexing from index 1 instead of 0.
         *
         * Also had to set the accordionIndex state on the parent component instead of here.
         */}
        <AccordionItem display="none">
          <AccordionButton />
        </AccordionItem>

        {Object.keys(globals).map((global, index) => (
          <AccordionItem
            key={global}
            borderTop={index === 0 ? 'none' : ''}
            borderBottom={
              index === Object.keys(globals).length - 1 ? 'none' : ''
            }
          >
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Text as="span" flex="1" textAlign="left" color="gray.500">
                    {global}
                  </Text>

                  {isExpanded ? <LuMinus /> : <LuPlus />}
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text pb={4} color="gray.500">
                    {GLOBAL_DETAILS[global]}
                  </Text>

                  <Input
                    size="sm"
                    variant="outline"
                    borderColor="gray.700"
                    _placeholder={{ color: 'gray.700' }}
                    _readOnly={{ color: 'gray.500' }}
                    placeholder="Enter value here"
                    /* If the global is '@ADDRESS', show the script address
                     * from the script0xAddress state, and disable onchange handler
                     * and set the access to read only.
                     */
                    value={
                      global === '@ADDRESS' ? script0xAddress : globals[global]
                    }
                    {...(global !== '@ADDRESS' && {
                      onChange: (e) =>
                        handleGlobalChange(global, e.target.value),
                    })}
                    // onChange={(e) => handleGlobalChange(global, e.target.value)}
                    readOnly={global === '@ADDRESS'}
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );
}

// Export
export default Globals;
