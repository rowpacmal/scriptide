import {
  Box,
  Checkbox,
  Code,
  HStack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import useDeploymentStore from '@/stores/useDeploymentStore';
import useModalStore from '@/stores/useModalStore';
import useAppTheme from '@/themes/useAppTheme';

function OverviewItem({ children, title, h = 'auto', className = '' }: any) {
  // Define theme
  const { bgAlt } = useAppTheme();

  return (
    <VStack w="100%" gap={0.5}>
      <Text w="100%" as="h3" pl={1} fontSize="xs" textTransform="uppercase">
        {title}
      </Text>

      <Box bg={bgAlt} w="100%" p={2} pb={0.5} borderRadius="md">
        <Code
          as="pre"
          w="100%"
          bg="transparent"
          overflow="auto"
          whiteSpace="pre-wrap"
          wordBreak="break-all"
          h={h}
          className={className}
        >
          {children}
        </Code>
      </Box>
    </VStack>
  );
}

// Workspace rename modal component
function DeployedScripts({ onClose }) {
  // Define toast
  const toast = useToast();

  // Define stores
  const removeScript = useDeploymentStore((state) => state.removeScript);
  const modalProps = useModalStore((state) => state.modalProps);

  // Define theme
  const { bgAlt, colorAlt } = useAppTheme();

  // Render
  return (
    <ConfirmModal
      title="Script Details"
      buttonLabel="Delete"
      colorScheme="red"
      onClose={onClose}
      onClick={() => {
        removeScript(modalProps?.address);
        toast({
          title: 'Script deletion pending',
          description:
            'A script deletion request is pending. Please go to the "Pending" dapp to view the request.',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
      }}
      disabled={modalProps?.default}
    >
      <VStack w="100%">
        <HStack gap={4} bg={bgAlt} px={2} py={1} borderRadius="md">
          <Checkbox
            cursor="default"
            size="sm"
            colorScheme="blue"
            borderColor={colorAlt}
            _checked={{ color: 'blue.500' }}
            isChecked={modalProps?.default}
          >
            Default
          </Checkbox>

          <Checkbox
            cursor="default"
            size="sm"
            colorScheme="blue"
            borderColor={colorAlt}
            _checked={{ color: 'blue.500' }}
            isChecked={modalProps?.simple}
          >
            Simple
          </Checkbox>

          <Checkbox
            cursor="default"
            size="sm"
            colorScheme="blue"
            borderColor={colorAlt}
            _checked={{ color: 'blue.500' }}
            isChecked={modalProps?.track}
          >
            Track
          </Checkbox>
        </HStack>

        <OverviewItem title="Address">{modalProps?.address}</OverviewItem>

        <OverviewItem title="MxAddress">{modalProps?.miniaddress}</OverviewItem>

        <OverviewItem title="Public Key">{modalProps?.publickey}</OverviewItem>

        <OverviewItem title="Script" h={24} className="scrollbar">
          {modalProps?.script}
        </OverviewItem>
      </VStack>
    </ConfirmModal>
  );
}

// Export
export default DeployedScripts;
