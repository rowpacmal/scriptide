// Import dependencies
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useMemo } from 'react';
// Import store
import useModalStore, { MODAL_TYPES } from '@/stores/useModalStore';
// Import components
import DeployedScripts from '../ui/modals/DeployedScripts';
import FilesDeleteAll from '../ui/modals/FilesDeleteAll';
import FilesUpload from '../ui/modals/FilesUpload';
import KissVMFileCreate from '../ui/modals/KissVMFileCreate';
import KissVMFileRename from '../ui/modals/KissVMFileRename';
import WorkspaceCreateBlank from '@/components/ui/modals/WorkspaceCreateBlank';
import WorkspaceCopy from '@/components/ui/modals/WorkspaceCopy';
import WorkspaceDelete from '@/components/ui/modals/WorkspaceDelete';
import WorkspaceDeleteAll from '@/components/ui/modals/WorkspaceDeleteAll';
import WorkspaceExport from '@/components/ui/modals/WorkspaceExport';
import WorkspaceImport from '@/components/ui/modals/WorkspaceImport';
import WorkspaceRename from '@/components/ui/modals/WorkspaceRename';
import ModalNotFound from '../ui/modals/ModalNotFound';
import KissVMFileDelete from '../ui/modals/KissVMFileDelete';
import KissVMFileDeleteAll from '../ui/modals/KissVMFileDeleteAll';

// Modals component
function Modals() {
  // Define store
  const modalType = useModalStore((state) => state.modalType);
  const isOpen = useModalStore((state) => state.isOpen);
  const onClose = useModalStore((state) => state.onClose);

  // Define state
  const currentModal = useMemo(() => {
    switch (modalType) {
      // Workspace modals
      case MODAL_TYPES.RENAME_WORKSPACE:
        return <WorkspaceRename onClose={onClose} />;

      case MODAL_TYPES.CREATE_BLANK_WORKSPACE:
        return <WorkspaceCreateBlank onClose={onClose} />;

      case MODAL_TYPES.COPY_WORKSPACE:
        return <WorkspaceCopy onClose={onClose} />;

      case MODAL_TYPES.EXPORT_WORKSPACE:
        return <WorkspaceExport onClose={onClose} />;

      case MODAL_TYPES.IMPORT_WORKSPACE:
        return <WorkspaceImport onClose={onClose} />;

      case MODAL_TYPES.DELETE_WORKSPACE:
        return <WorkspaceDelete onClose={onClose} />;

      case MODAL_TYPES.DELETE_ALL_WORKSPACES:
        return <WorkspaceDeleteAll onClose={onClose} />;

      // File modals
      case MODAL_TYPES.UPLOAD_FILE:
        return <FilesUpload onClose={onClose} />;

      case MODAL_TYPES.DELETE_ALL_FILES:
        return <FilesDeleteAll onClose={onClose} />;

      // Other modals
      case MODAL_TYPES.VIEW_SCRIPT:
        return <DeployedScripts onClose={onClose} />;

      case MODAL_TYPES.RENAME_SCRIPT:
        return <KissVMFileRename onClose={onClose} />;

      case MODAL_TYPES.CREATE_SCRIPT:
        return <KissVMFileCreate onClose={onClose} />;

      case MODAL_TYPES.DELETE_SCRIPT:
        return <KissVMFileDelete onClose={onClose} />;

      case MODAL_TYPES.DELETE_ALL_SCRIPT:
        return <KissVMFileDeleteAll onClose={onClose} />;

      default:
        return <ModalNotFound onClose={onClose} />;
    }
  }, [modalType]);

  // Render
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      {currentModal}
    </Modal>
  );
}

// Export
export default Modals;
