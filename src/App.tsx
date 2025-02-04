// Dependencies
import { Box } from '@chakra-ui/react';
import Header from './components/app/Header';
import Content from './components/app/Content';
import Footer from './components/app/Footer';

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
      <Header />

      <Content />

      <Footer />
    </Box>
  );
}

// Export
export default App;
