import useAppTheme from '@/themes/useAppTheme';
import { ChangelogItem, FeatureItem } from './ChangelogBase';
import { Highlight } from '@chakra-ui/react';

function ChangelogV3_0_4() {
  // Define theme
  const { bgReversed, colorReversed } = useAppTheme();

  return (
    <ChangelogItem version="3.0.4" date="February 6, 2025">
      <FeatureItem>
        <Highlight
          query="@ADDRESS"
          styles={{
            color: colorReversed,
            bg: bgReversed,
            px: 1,
            rounded: 'sm',
            wordBreak: 'break-all',
            whiteSpace: 'wrap',
          }}
        >
          Resolved an issue where the @ADDRESS global variable was not being set
          correctly.
        </Highlight>
      </FeatureItem>
    </ChangelogItem>
  );
}

export default ChangelogV3_0_4;
