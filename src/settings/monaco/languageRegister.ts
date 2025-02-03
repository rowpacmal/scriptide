// Import constants
import { KISS_VM_LANGUAGE } from '../../constants';

// Language register config
function languageRegister(monaco) {
  monaco.languages.register({ id: KISS_VM_LANGUAGE, extensions: ['.kvm'] });
}

// Export
export default languageRegister;
