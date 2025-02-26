import { VStack } from '@chakra-ui/react';
import { AccordionBase, AccordionItemBase } from '../systems/AccordionBase';
import KissVMDeploy from '../KissVMDeploy';

// Deploy panel component
function DeployBuildPanel() {
  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <AccordionBase>
        <AccordionItemBase title="Deploy KissVM Scripts" isTop>
          <KissVMDeploy />
        </AccordionItemBase>

        <AccordionItemBase title="Txn Signatures" isBottom>
          <></>
        </AccordionItemBase>
      </AccordionBase>
    </VStack>
  );
}

// Export
export default DeployBuildPanel;
