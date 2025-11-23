import "./App.css"
import "@/i18n/i18next"; // Initialize react-i18next
import { I18nProvider } from "@/i18n"; // Your own i18n (if you still need it)
import { QueryProvider } from "@/state/tanstack_query/QueryProvider";
import AuthPage from "@/components/auth/AuthPage";
import Profile from "@/playground/demo/Profile";
import { Route, Routes, useLocation } from "react-router-dom";
// import Test from "@/playground/demo/Test";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { icons } from "./components/ui/icons/Icons";
import AuthLayout from "@/layout/AuthLayout";
import Test from "./playground/demo/Test";


const AppContent = () => {
  const { pathname } = useLocation();

  // Show language switcher only on these routes
  const showLangSwitcher =
    pathname.startsWith("/test") || pathname.startsWith("/profile");

  return (
    <div className="bg-white px-0 py-0 flex justify-center flex-col items-center min-h-screen" >
            {showLangSwitcher && (
        <div className="flex justify-center p-2">
          <LanguageSwitcher />
        </div>
      )}
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<Profile />} />
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
