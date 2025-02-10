import { KISS_VM_LANGUAGE } from '@/constants';

function getExtension(file: string) {
  const extension = file.split('.').pop();

  switch (extension) {
    case 'kvm':
      return KISS_VM_LANGUAGE;

    // TODO: Add support for other file extensions
    /* case 'html':
      return 'html';

    case 'css':
      return 'css';

    case 'js':
      return 'javascript'; */

    default:
      return 'plaintext';
  }
}

export default getExtension;
