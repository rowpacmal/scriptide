// Import dependencies
import { HStack } from '@chakra-ui/react';
// Import store
import useFileStore from '@/stores/useFileStore';
// Import components
import {
  RightSidebarButton,
  RunScriptButton,
  SaveFileButtons,
  ZoomEditorButtons,
} from './CodeEditorHeaderButtons';

// Code editor header component
function MainPanelHeader({ isOverviewCollapsed, handelToggleOverview }) {
  // Define store
  const currentFile = useFileStore((state) => state.currentFile);

  // Render
  return (
    <HStack gap={0} justify="space-between">
      <HStack gap={0}>
        {currentFile?.endsWith('.kvm') && <RunScriptButton />}

        <SaveFileButtons />

        <ZoomEditorButtons />
      </HStack>

      <RightSidebarButton
        isOverviewCollapsed={isOverviewCollapsed}
        handelToggleOverview={handelToggleOverview}
      />
    </HStack>
  );
}

// Export
export default MainPanelHeader;
