import useAppTheme from '@/themes/useAppTheme';
import { ChangelogItem, FeatureItem } from './ChangelogBase';
import { Highlight } from '@chakra-ui/react';
import { useMemo } from 'react';

// Constants
const QUERY = [
  'debug.conf',
  '{ "debug": "...", "host": "...", "port": "...", "uid": "..." }',
];

function ChangelogV3_1_0() {
  // Define theme
  const { bgReversed, colorReversed } = useAppTheme();
  const queryStyle = useMemo(
    () => ({
      color: colorReversed,
      bg: bgReversed,
      px: 1,
      rounded: 'sm',
      wordBreak: 'break-all',
      whiteSpace: 'wrap',
    }),
    [colorReversed, bgReversed]
  );

  return (
    <ChangelogItem version="3.1.0" date="January 20, 2025">
      <FeatureItem>
        <Highlight query={QUERY} styles={queryStyle}>
          Added a real-time HTML rendering panel. To enable MDS debugging,
          create a debug.conf file with &#123; "debug": "...", "host": "...",
          "port": "...", "uid": "..." &#125; (customize values as needed). This
          file is automatically included in the HTML for live preview.
        </Highlight>
      </FeatureItem>

      <FeatureItem>
        <Highlight query=".zip" styles={queryStyle}>
          Workspaces can now be exported and imported as .zip files for easy
          sharing and backup.
        </Highlight>
      </FeatureItem>

      <FeatureItem>
        Added support for uploading single files directly within the Explorer
        Panel.
      </FeatureItem>

      <FeatureItem>
        Introduced a new panel for streamlined dapp building, script management,
        and script deployment.
      </FeatureItem>

      <FeatureItem>
        Image files now open in a dedicated preview mode instead of the editor,
        supporting zoom-in, zoom-out, and panning.
      </FeatureItem>

      <FeatureItem>
        Implemented a new file tree structure for better navigation in the
        Explorer Panel.
      </FeatureItem>

      <FeatureItem>
        Consolidated all script-related panels into a single 'Run and Debug KISS
        VM' panel.
      </FeatureItem>

      <FeatureItem>
        Introduced a light mode, which can be toggled in the new 'Settings'
        panel.
      </FeatureItem>

      <FeatureItem>
        Upgraded the Editor Panel with a new tabbed interface for improved
        multitasking.
      </FeatureItem>

      <FeatureItem>Added a fresh, single-color icon for the dapp.</FeatureItem>

      <FeatureItem>
        Improved the console, allowing direct execution of Minima commands.
      </FeatureItem>

      <FeatureItem>
        The interface now retains its previous session state using local
        storage, ensuring a seamless user experience.
      </FeatureItem>
    </ChangelogItem>
  );
}

export default ChangelogV3_1_0;
