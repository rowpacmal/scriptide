// Import constants
import { APPLICATION_CHANGELOGS } from '@/constants';
// Import components
import { Changelog, FeatureItem } from './ChangelogBase';

// Changelog 3.1.4 component
function ChangelogV3_1_4() {
  // Render
  return (
    <Changelog version="3.1.4" date="March 17, 2025">
      {APPLICATION_CHANGELOGS['3.1.4'].map((item) => (
        <FeatureItem key={item}>{item}</FeatureItem>
      ))}
    </Changelog>
  );
}

// Export
export default ChangelogV3_1_4;
