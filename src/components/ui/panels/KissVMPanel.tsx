import { VStack } from '@chakra-ui/react';
import States from '../States';
import Globals from '../Globals';
import Signatures from '../Signatures';
import Overview from '../Overview';
import PrevStates from '../PrevStates';
import RunDebug from '../RunDebug';
import { AccordionBase, AccordionItemBase } from '../systems/AccordionBase';

function KissVMPanel() {
  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <RunDebug />

      <AccordionBase>
        <AccordionItemBase title="Overview" isTop>
          <Overview />
        </AccordionItemBase>

        <AccordionItemBase title="Global Variables">
          <Globals />
        </AccordionItemBase>

        <AccordionItemBase title="State Variables">
          <States />
        </AccordionItemBase>

        <AccordionItemBase title="PrevState Variables">
          <PrevStates />
        </AccordionItemBase>

        <AccordionItemBase title="Txn Signatures" isBottom>
          <Signatures />
        </AccordionItemBase>
      </AccordionBase>
    </VStack>
  );
}

export default KissVMPanel;
