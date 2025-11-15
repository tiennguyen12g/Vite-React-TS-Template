import "./App.css";
import { I18nProvider } from "./i18n";
import { QueryProvider } from "./tanstack_query/QueryProvider";

import CryptoMain from "./components/CryptoMain";
import { Route, Routes } from "react-router-dom";
import Test from "./Test";
const AppContent = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<CryptoMain />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <QueryProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </QueryProvider>
  );
}

export default App;
