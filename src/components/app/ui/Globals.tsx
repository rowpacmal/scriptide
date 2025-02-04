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

// Globals component
function Globals() {
  // Define context
  const { globals, setGlobals, script0xAddress } = useContext(appContext);

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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Alias, harum. Quod, quibusdam.
                  </Text>

                  <Input
                    size="sm"
                    variant="outline"
                    borderColor="gray.700"
                    _placeholder={{ color: 'gray.700' }}
                    _focusVisible={{ borderColor: 'orange.500' }}
                    _readOnly={{ color: 'gray.500' }}
                    value={
                      global === '@ADDRESS' ? script0xAddress : globals[global]
                    }
                    onChange={(e) => handleGlobalChange(global, e.target.value)}
                    placeholder="Enter value here"
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
