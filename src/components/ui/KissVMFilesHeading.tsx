import useAppTheme from '@/themes/useAppTheme';
import { Box, Code, HStack, Text, Tooltip } from '@chakra-ui/react';
import { LuInfo } from 'react-icons/lu';

function KissVMFilesHeading() {
  // Define theme
  const { bgAlt, color, colorAlt } = useAppTheme();

  return (
    <HStack w="100%" color={colorAlt} gap={1}>
      <Text as="h3" textTransform="uppercase" fontSize="xs">
        KissVM Scripts
      </Text>

      <Tooltip
        openDelay={300}
        label={
          <>
            Script files must end with{' '}
            <Code fontSize="inherit" bg={bgAlt}>
              .kvm
            </Code>{' '}
            and be placed in the{' '}
            <Code fontSize="inherit" bg={bgAlt}>
              contracts
            </Code>{' '}
            folder in the root of the workspace.
          </>
        }
        placement="right"
        hasArrow
        fontWeight="normal"
        // fontSize="xs"
      >
        <Box cursor="pointer" _hover={{ color }}>
          <LuInfo />
        </Box>
      </Tooltip>
    </HStack>
  );
}

export default KissVMFilesHeading;
