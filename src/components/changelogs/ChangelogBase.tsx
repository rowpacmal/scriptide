import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { LuBadgeAlert, LuBadgeInfo, LuScrollText } from 'react-icons/lu';
import useAppTheme from '@/themes/useAppTheme';

function ChangelogItem({ children, version, date }) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  return (
    <Accordion w="100%" allowToggle>
      <AccordionItem border="none">
        <Text as="h4">
          <AccordionButton
            px={2}
            py={1}
            color={colorAlt}
            _hover={{ color }}
            justifyContent="space-between"
          >
            <HStack>
              <LuScrollText />

              <Text as="span" flex="1" textAlign="left">
                [{version}] - {date}
              </Text>
            </HStack>

            <AccordionIcon />
          </AccordionButton>
        </Text>

        <AccordionPanel pb={2}>
          <List spacing={2} fontSize="sm" textAlign="start">
            {children}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

function FeatureItem({ children, alert = false }) {
  // Define theme
  const { colorSuccess, colorWarning } = useAppTheme();

  return (
    <ListItem>
      <ListIcon
        as={alert ? LuBadgeAlert : LuBadgeInfo}
        color={alert ? colorWarning : colorSuccess}
      />
      {children}
    </ListItem>
  );
}

export { ChangelogItem, FeatureItem };
