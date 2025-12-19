/**
 * Example: Responsive AuthPage that automatically switches between desktop and mobile
 * This demonstrates how to use the same-folder approach with device detection
 * 
 * Usage in router:
 * <Route path="/auth" element={<ResponsiveAuthPage />} />
 */

import React from "react";
import { useDevice } from "@/hooks/useDevice";
import DesktopAuthPage from "@/pages/auth/AuthPage";
import MobileAuthPage from "@/pages/auth/AuthPage.m";

export default function ResponsiveAuthPage() {
  const deviceType = useDevice();

  // Automatically render the appropriate version based on device
  return deviceType === "mobile" ? <MobileAuthPage /> : <DesktopAuthPage />;
}
