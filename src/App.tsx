// Import dependencies
import { Box } from '@chakra-ui/react';
// Import components
import Header from './components/app/Header';
import Content from './components/app/Content';
import Footer from './components/app/Footer';
import NoMobile from './components/app/NoMobile';

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

      <Box className="sm:hidden">
        <NoMobile />
      </Box>

      <Box className="hidden sm:block">
        <Content />
      </Box>

      <Footer />
    </Box>
  );
}

// Export
export default App;
