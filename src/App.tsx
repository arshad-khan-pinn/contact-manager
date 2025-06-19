import { ThemeProvider } from "./theme/ThemeProvider.tsx";
import { Route, Routes } from "react-router-dom";
import ContactListPage from "./pages/contacts/list.tsx";
import NotFoundPage from "./pages/error/404.tsx";
import { HelmetProvider } from '@dr.pogodin/react-helmet';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<ContactListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
