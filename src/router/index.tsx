import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
// import LivePreview from '@/components/ui/LivePreview';

const Router = () => {
  // Render the component.
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          {/* 404 page */}
          <Route path="*" element={<>Page 404</>} />

          {/* Home page */}
          <Route index element={<Layout />} />

          {/* Live preview */}
          {/* TODO - add live preview page for new tabs and new windows */}
          {/* <Route path="/live-preview" element={<LivePreview />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
};

// Export the component.
export default Router;
