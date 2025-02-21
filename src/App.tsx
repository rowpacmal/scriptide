// Import dependencies
import { Box } from '@chakra-ui/react';
// Import theme
import useAppTheme from './themes/useAppTheme';
// Import components
import Header from './components/app/Header';
import Content from './components/app/Content';
import Footer from './components/app/Footer';
import NoMobile from './components/app/NoMobile';

// Component
function App() {
  const { bg, color } = useAppTheme();

  // Render
  return (
    <Box
      minH="100vh"
      minW="100vw"
      bg={bg}
      color={color}
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
