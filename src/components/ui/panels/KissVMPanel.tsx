import { VStack } from '@chakra-ui/react';
import States from '../States';
import Globals from '../Globals';
import Signatures from '../Signatures';
import Overview from '../Overview';
import PrevStates from '../PrevStates';
import KissVMRunDebug from '../KissVMRunDebug';
import { AccordionBase, AccordionItemBase } from '../systems/AccordionBase';
import {
  LuBraces,
  LuBrackets,
  LuChartNoAxesGantt,
  LuGlobe,
  LuLock,
} from 'react-icons/lu';

function KissVMPanel() {
  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <KissVMRunDebug />

      <AccordionBase>
        <AccordionItemBase title="Overview" icon={<LuChartNoAxesGantt />} isTop>
          <Overview />
        </AccordionItemBase>

        <AccordionItemBase title="Global Variables" icon={<LuGlobe />}>
          <Globals />
        </AccordionItemBase>

        <AccordionItemBase title="State Variables" icon={<LuBrackets />}>
          <States />
        </AccordionItemBase>

        <AccordionItemBase title="PrevState Variables" icon={<LuBraces />}>
          <PrevStates />
        </AccordionItemBase>

        <AccordionItemBase title="Txn Signatures" icon={<LuLock />} isBottom>
          <Signatures />
        </AccordionItemBase>
      </AccordionBase>
    </VStack>
  );
}

export default KissVMPanel;
