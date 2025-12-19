import "./App.css";
import "@/i18n/i18next"; // Initialize react-i18next
import { I18nProvider } from "@/i18n"; // Your own i18n (if you still need it)
import { QueryProvider } from "@/state/tanstack_query/QueryProvider";
import { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Test from "./playground/demo/Test";
import Profile from "@/playground/demo/Profile";
import Error404 from "@/components/common/Error404";
import { createResponsiveLoader } from "@/utils/deviceUtils";

// Dynamic import with automatic device detection
// The same route "/auth" will automatically serve desktop or mobile version
const AuthPage = createResponsiveLoader(
  () => import("@/pages/auth/AuthPage"),      // Desktop version
  () => import("@/pages/auth/AuthPage.m")      // Mobile version
);

const AppContent = () => {
  const { pathname } = useLocation();

  // Show language switcher only on these routes
  const showLangSwitcher = pathname.startsWith("/test") || pathname.startsWith("/profile");

  // For auth page, we need full viewport height without wrapper constraints
  const isAuthPage = pathname === "/auth";

  if (isAuthPage) {
    return (
      <Routes>
        <Route 
          path="/auth" 
          element={
            <Suspense fallback={<div className="flex items-center justify-center" style={{ height: "100dvh" }}>Loading...</div>}>
              <AuthPage />
            </Suspense>
          } 
        />
      </Routes>
    );
  }

  return (
    <div className="bg-white px-0 py-0 flex justify-center flex-col items-center min-h-screen w-screen h-full">
      {showLangSwitcher && (
        <div className="flex justify-center p-2">
          <LanguageSwitcher />
        </div>
      )}
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/profile" element={<Profile />} />
        {/* Catch-all */}
        <Route path="*" element={<Error404 />} />
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
