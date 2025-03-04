import { create } from 'zustand';
import useLivePreviewStore from './useLivePreviewStore';

interface IPanelStore {
  bottomBarPanelRef: any;
  setBottomBarPanelRef: (ref: any) => void;
  isBottomBarPanelOpen: boolean;
  setIsBottomBarPanelOpen: (isOpen: boolean) => void;
  toggleBottomBarPanel: () => void;

  leftSidePanelRef: any;
  setLeftSidePanelRef: (ref: any) => void;
  isLeftSidePanelOpen: boolean;
  setIsLeftSidePanelOpen: (isOpen: boolean) => void;
  toggleLeftSidePanel: (isSameNav: boolean) => void;

  rightSidePanelRef: any;
  setRightSidePanelRef: (ref: any) => void;
  isRightSidePanelOpen: boolean;
  setIsRightSidePanelOpen: (isOpen: boolean) => void;
  toggleRightSidePanel: () => void;
}

const usePanelStore = create<IPanelStore>((set) => ({
  bottomBarPanelRef: null,
  setBottomBarPanelRef: (ref: any) => set({ bottomBarPanelRef: ref }),
  isBottomBarPanelOpen: false,
  setIsBottomBarPanelOpen: (isOpen: boolean) =>
    set({ isBottomBarPanelOpen: isOpen }),
  toggleBottomBarPanel: () =>
    set((state) => {
      if (!state.bottomBarPanelRef) {
        return state;
      }

      const panel = state.bottomBarPanelRef.current;
      if (panel) {
        if (panel.isCollapsed()) {
          panel.expand();
          return { isBottomBarPanelOpen: true };
        }

        panel.collapse();
        return { isBottomBarPanelOpen: false };
      }

      return state;
    }),
  leftSidePanelRef: null,
  setLeftSidePanelRef: (ref: any) => set({ leftSidePanelRef: ref }),
  isLeftSidePanelOpen: false,
  setIsLeftSidePanelOpen: (isOpen: boolean) =>
    set({ isLeftSidePanelOpen: isOpen }),
  toggleLeftSidePanel: (isSameNav) =>
    set((state) => {
      if (!state.leftSidePanelRef) {
        return state;
      }

      const panel = state.leftSidePanelRef.current;
      if (panel) {
        if (panel.isCollapsed()) {
          panel.expand();
          return { isLeftSidePanelOpen: true };
        } else if (panel.isExpanded() && isSameNav) {
          panel.collapse();
          return { isLeftSidePanelOpen: false };
        }
      }

      return state;
    }),

  rightSidePanelRef: null,
  setRightSidePanelRef: (ref: any) => set({ rightSidePanelRef: ref }),
  isRightSidePanelOpen: false,
  setIsRightSidePanelOpen: (isOpen: boolean) =>
    set({ isRightSidePanelOpen: isOpen }),
  toggleRightSidePanel: () =>
    set((state) => {
      if (!state.rightSidePanelRef) {
        return state;
      }

      const panel = state.rightSidePanelRef.current;
      if (panel) {
        if (panel.isCollapsed()) {
          panel.expand();
          useLivePreviewStore.getState().setShowPreview(true);
          return { isRightSidePanelOpen: true };
        } else {
          panel.collapse();
          useLivePreviewStore.getState().setShowPreview(false);
          return { isRightSidePanelOpen: false };
        }
      }

      return state;
    }),
}));

export default usePanelStore;
