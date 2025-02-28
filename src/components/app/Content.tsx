/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { Box, HStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
// Import components
import Sidebar from '@/components/ui/Sidebar';
import LeftSidePanel from '@/components/ui/LeftSidePanel';
import Console from '@/components/ui/systems/Console';
import CodeEditorHeader from '@/components/ui/CodeEditorHeader';
import ConsoleHeader from '@/components/ui/ConsoleHeader';
import LivePreview from '@/components/ui/LivePreview';
import useLivePreviewStore from '@/stores/useLivePreviewStore';
import CodeEditorPanel from '@/components/ui/panels/CodeEditorPanel';
import useAppTheme from '@/themes/useAppTheme';

// Utility component
function PanelHandle({ direction }) {
  const { accent, borderColor } = useAppTheme();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <PanelResizeHandle
      className="relative"
      onDragging={(isDragging) => setIsDragging(isDragging)}
      hitAreaMargins={{ coarse: 5, fine: 5 }}
    >
      <Box
        h="100%"
        w="100%"
        borderLeft={direction === 'vertical' ? '1px solid' : ''}
        borderTop={direction === 'horizontal' ? '1px solid' : ''}
        borderColor={borderColor}
      />

      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        h={direction === 'horizontal' ? 1.5 : '100%'}
        w={direction === 'vertical' ? 1.5 : '100%'}
        bg={isDragging ? accent : 'transparent'}
        transition="background-color 0.2s linear"
        _hover={{ bg: accent }}
        zIndex={99}
      />
    </PanelResizeHandle>
  );
}

// App content component
function Content() {
  // Define ref
  const consoleRef = useRef(null);
  const controlPanelRef = useRef(null);
  const overviewRef = useRef(null);

  // Define states
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false);
  const [isControlPanelCollapsed, setIsControlPanelCollapsed] = useState(false);
  const [isOverviewCollapsed, setIsOverviewCollapsed] = useState(false);

  // Define store
  const showPreview = useLivePreviewStore((state) => state.showPreview);
  const setShowPreview = useLivePreviewStore((state) => state.setShowPreview);

  // Define effects
  useEffect(() => {
    const overview: any = overviewRef.current;

    if (overview) {
      if (overview.isExpanded()) {
        setShowPreview(true);
      }
    }
  }, []);

  // Define functions
  const handelToggleConsole = () => {
    const codeConsole: any = consoleRef.current;

    if (codeConsole) {
      if (codeConsole.isCollapsed()) {
        codeConsole.expand();
        setIsConsoleCollapsed(false);
      } else {
        codeConsole.collapse();
        setIsConsoleCollapsed(true);
      }
    }
  };

  const handelToggleControlPanel = (isNavSame: boolean) => {
    const controlPanel: any = controlPanelRef.current;

    if (controlPanel) {
      if (controlPanel.isCollapsed()) {
        controlPanel.expand();
        setIsControlPanelCollapsed(false);
      } else if (controlPanel.isExpanded() && isNavSame) {
        controlPanel.collapse();
        setIsControlPanelCollapsed(true);
      }
    }
  };

  const handelToggleOverview = () => {
    const overview: any = overviewRef.current;

    if (overview) {
      if (overview.isCollapsed()) {
        overview.expand();
        setIsOverviewCollapsed(false);
        setShowPreview(true);
      } else {
        overview.collapse();
        setIsOverviewCollapsed(true);
        setShowPreview(false);
      }
    }
  };

  // Render
  return (
    <Box h="calc(100vh - 3rem)">
      <HStack h="100%" gap={0}>
        <Sidebar
          isControlPanelCollapsed={isControlPanelCollapsed}
          handelToggleControlPanel={handelToggleControlPanel}
        />

        <PanelGroup
          direction="horizontal"
          autoSaveId="panel-group-1"
          storage={localStorage}
        >
          <Panel
            id="panel-control"
            order={0}
            ref={controlPanelRef}
            collapsible={true}
            collapsedSize={0}
            defaultSize={20}
            minSize={15}
            onCollapse={() => setIsControlPanelCollapsed(true)}
            onExpand={() => setIsControlPanelCollapsed(false)}
          >
            <LeftSidePanel />
          </Panel>

          <PanelHandle direction="vertical" />

          <Panel id="panel-code-editor" order={1} minSize={40}>
            <PanelGroup
              direction="vertical"
              autoSaveId="panel-group-2"
              storage={localStorage}
            >
              <CodeEditorHeader
                isOverviewCollapsed={isOverviewCollapsed}
                handelToggleOverview={handelToggleOverview}
              />

              <Panel collapsible={true} collapsedSize={0} minSize={15}>
                <CodeEditorPanel />
              </Panel>

              <PanelHandle direction="horizontal" />

              <ConsoleHeader
                isConsoleCollapsed={isConsoleCollapsed}
                handelToggleConsole={handelToggleConsole}
              />

              <Panel
                ref={consoleRef}
                collapsible={true}
                collapsedSize={0}
                defaultSize={20}
                minSize={15}
                onCollapse={() => setIsConsoleCollapsed(true)}
                onExpand={() => setIsConsoleCollapsed(false)}
              >
                <Console />
              </Panel>
            </PanelGroup>
          </Panel>

          {/*
          {showPreview && (
            <>
              <PanelHandle direction="vertical" />

              <Panel id="panel-live-preview" order={2} minSize={20}>
                <LivePreview />
              </Panel>
            </>
          )}
          */}

          <PanelHandle direction="vertical" />

          <Panel
            id="panel-overview"
            order={3}
            ref={overviewRef}
            collapsible={true}
            collapsedSize={0}
            defaultSize={20}
            minSize={15}
            onCollapse={() => setIsOverviewCollapsed(true)}
            onExpand={() => setIsOverviewCollapsed(false)}
          >
            {showPreview && <LivePreview overviewRef={overviewRef} />}
          </Panel>
        </PanelGroup>
      </HStack>
    </Box>
  );
}

// Export
export default Content;
