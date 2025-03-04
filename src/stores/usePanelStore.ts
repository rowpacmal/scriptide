// Import dependencies
import { create } from 'zustand';
// Import stores
import useLivePreviewStore from './useLivePreviewStore';
// Import types
import { IPanelStore } from '@/types';

// Create the store
const usePanelStore = create<IPanelStore>((set) => ({
  bottomBarPanelRef: null,
  setBottomBarPanelRef: (ref) => set({ bottomBarPanelRef: ref }),
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
  setLeftSidePanelRef: (ref) => set({ leftSidePanelRef: ref }),
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
  setRightSidePanelRef: (ref) => set({ rightSidePanelRef: ref }),
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

// Export the store
export default usePanelStore;
