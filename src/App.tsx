// Dependencies
import { Box } from '@chakra-ui/react';
import AppHeader from './components/app/AppHeader';
import AppContent from './components/app/AppContent';
import AppFooter from './components/app/AppFooter';

// Component
function App() {
  // Render
  return (
    <Box
      minH="100vh"
      minW="100vw"
      bg="gray.900"
      color="gray.50"
      display="flex"
      flexDirection="column"
    >
      <AppHeader />

      <AppContent />

      <AppFooter />
    </Box>
  );
}

// Export
export default App;
