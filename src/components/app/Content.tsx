// Import dependencies
import { Box, HStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
// Import store
import useLivePreviewStore from '@/stores/useLivePreviewStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import components
import Console from '@/components/ui/systems/Console';
import ConsoleHeader from '@/components/ui/ConsoleHeader';
import LeftSidePanel from '@/components/ui/LeftSidePanel';
import LivePreview from '@/components/ui/LivePreview';
import MainPanel from '@/components/ui/panels/MainPanel';
import MainPanelHeader from '@/components/ui/MainPanelHeader';
import Sidebar from '@/components/ui/Sidebar';
import usePanelStore from '@/stores/usePanelStore';

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

  // Define store
  const showPreview = useLivePreviewStore((state) => state.showPreview);
  const setShowPreview = useLivePreviewStore((state) => state.setShowPreview);
  const setBottomBarPanelRef = usePanelStore(
    (state) => state.setBottomBarPanelRef
  );
  const setIsBottomBarPanelOpen = usePanelStore(
    (state) => state.setIsBottomBarPanelOpen
  );
  const setLeftSidePanelRef = usePanelStore(
    (state) => state.setLeftSidePanelRef
  );
  const setIsLeftSidePanelOpen = usePanelStore(
    (state) => state.setIsLeftSidePanelOpen
  );
  const rightSidePanel = usePanelStore((state) => state.rightSidePanelRef);
  const setRightSidePanelRef = usePanelStore(
    (state) => state.setRightSidePanelRef
  );
  const setIsRightSidePanelOpen = usePanelStore(
    (state) => state.setIsRightSidePanelOpen
  );

  // Define effects
  useEffect(() => {
    setBottomBarPanelRef(consoleRef);
    setLeftSidePanelRef(controlPanelRef);
    setRightSidePanelRef(overviewRef);

    return () => {
      setBottomBarPanelRef(null);
      setLeftSidePanelRef(null);
      setRightSidePanelRef(null);
    };
  }, [
    consoleRef,
    controlPanelRef,
    overviewRef,
    setBottomBarPanelRef,
    setLeftSidePanelRef,
    setRightSidePanelRef,
  ]);
  useEffect(() => {
    if (!rightSidePanel) {
      return;
    }

    const panel = rightSidePanel.current;
    if (panel) {
      if (panel.isExpanded()) {
        setShowPreview(true);
      }
    }
  }, [rightSidePanel, setShowPreview]);

  // Render
  return (
    <Box h="calc(100vh - 2.5rem)">
      <HStack h="100%" gap={0}>
        <Sidebar />

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
            onCollapse={() => setIsLeftSidePanelOpen(false)}
            onExpand={() => setIsLeftSidePanelOpen(true)}
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
              <MainPanelHeader />

              <Panel collapsible={true} collapsedSize={0} minSize={15}>
                <MainPanel />
              </Panel>

              <PanelHandle direction="horizontal" />

              <ConsoleHeader />

              <Panel
                ref={consoleRef}
                collapsible={true}
                collapsedSize={0}
                defaultSize={20}
                minSize={15}
                onCollapse={() => setIsBottomBarPanelOpen(false)}
                onExpand={() => setIsBottomBarPanelOpen(true)}
              >
                <Console />
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelHandle direction="vertical" />

          <Panel
            id="panel-overview"
            order={3}
            ref={overviewRef}
            collapsible={true}
            collapsedSize={0}
            defaultSize={0}
            minSize={20}
            onCollapse={() => setIsRightSidePanelOpen(false)}
            onExpand={() => setIsRightSidePanelOpen(true)}
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
