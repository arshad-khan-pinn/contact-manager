import { ThemeProvider } from "./theme/ThemeProvider.tsx";
import { Route, Routes } from "react-router-dom";
import ContactListPage from "./pages/contacts/list.tsx";
import NotFoundPage from "./pages/error/404.tsx";
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import ContactAddPage from "./pages/contacts/new.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<ContactListPage />} />
          <Route path="/contacts/add" element={<ContactAddPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer style={{ zIndex: 9999, position: 'fixed' }} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
