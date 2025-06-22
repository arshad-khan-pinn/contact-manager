import { ThemeProvider } from "./theme/ThemeProvider.tsx";
import { Route, Routes } from "react-router-dom";
import ContactListPage from "./pages/contacts/list.tsx";
import NotFoundPage from "./pages/error/404.tsx";
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import ContactAddPage from "./pages/contacts/new.tsx";
import ContactEditPage from "./pages/contacts/edit.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Link to="/">Contact Manager</Link>
        <Routes>
          <Route path="/" element={<ContactListPage />} />
          <Route path="/contacts/add" element={<ContactAddPage />} />
          <Route path="/contacts/edit/:id" element={<ContactEditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
      <ToastContainer
        autoClose={5000}
        pauseOnHover={false}
        className="fixed top-5 right-5 z-50"
      />
    </HelmetProvider>
  );
}

export default App;
