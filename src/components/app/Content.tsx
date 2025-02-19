// Import dependencies
import { Box, HStack } from '@chakra-ui/react';
import {
  // useEffect,
  useRef,
  useState,
} from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
// Import components
import Overview from './ui/Overview';
import Sidebar from './ui/Sidebar';
import ControlPanel from './ui/ControlPanel';
import Console from './ui/Console';
import CodeEditorHeader from './ui/CodeEditorHeader';
import ConsoleHeader from './ui/ConsoleHeader';
import LivePreview from './ui/LivePreview';
import useLivePreviewStore from '@/store/useLivePreviewStore';
import CodeEditorPanel from './ui/CodeEditorPanel';

// Utility component
function PanelHandle({ direction }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <PanelResizeHandle
      className={
        'border-gray-700 relative ' +
        (direction === 'horizontal' ? 'border-t' : 'border-l')
      }
      onDragging={(isDragging) => setIsDragging(isDragging)}
      hitAreaMargins={{ coarse: 5, fine: 5 }}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        h={direction === 'horizontal' ? 1.5 : '100%'}
        w={direction === 'vertical' ? 1.5 : '100%'}
        bg={isDragging ? 'orange.500' : 'transparent'}
        transition="background-color 0.2s linear"
        _hover={{ bg: 'orange.500' }}
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

  // Define effects
  // useEffect(() => {}, []);

  // Define functions
  const handelToggleConsole = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const overview: any = overviewRef.current;

    if (overview) {
      if (overview.isCollapsed()) {
        overview.expand();
        setIsOverviewCollapsed(false);
      } else {
        overview.collapse();
        setIsOverviewCollapsed(true);
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
            <ControlPanel />
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

          {showPreview && (
            <>
              <PanelHandle direction="vertical" />

              <Panel id="panel-live-preview" order={2} minSize={20}>
                <LivePreview />
              </Panel>
            </>
          )}

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
            <Overview />
          </Panel>
        </PanelGroup>
      </HStack>
    </Box>
  );
}

// Export
export default Content;
