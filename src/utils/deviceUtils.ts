import React, { type ComponentType, lazy, type LazyExoticComponent, Suspense } from "react";
import { useDevice } from "@/hooks/useDevice";

/**
 * Creates a component loader that switches between desktop and mobile versions
 * This version checks device at load time (good for code splitting)
 * 
 * Usage in router:
 * 
 * const AuthPage = createResponsiveLoader(
 *   () => import("@/pages/auth/AuthPage"),
 *   () => import("@/pages/auth/AuthPage.m")
 * );
 */
export function createResponsiveLoader<T = {}>(
  desktopLoader: () => Promise<{ default: ComponentType<T> }>,
  mobileLoader: () => Promise<{ default: ComponentType<T> }>
): LazyExoticComponent<ComponentType<T>> {
  return lazy(async () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    return isMobile ? mobileLoader() : desktopLoader();
  });
}

/**
 * Creates a responsive component wrapper that dynamically switches on resize
 * This version re-renders when device type changes (better for responsive behavior)
 * 
 * Usage:
 * 
 * const ResponsiveAuthPage = createResponsiveComponent(
 *   () => import("@/pages/auth/AuthPage"),
 *   () => import("@/pages/auth/AuthPage.m")
 * );
 * 
 * Then use in route:
 * <Route path="/auth" element={<ResponsiveAuthPage />} />
 */
export function createResponsiveComponent<T extends Record<string, unknown> = {}>(
  desktopLoader: () => Promise<{ default: ComponentType<T> }>,
  mobileLoader: () => Promise<{ default: ComponentType<T> }>
): ComponentType<T> {
  const DesktopComponent = lazy(desktopLoader);
  const MobileComponent = lazy(mobileLoader);

  function ResponsiveWrapper(props: T) {
    const deviceType = useDevice();
    const Component = deviceType === "mobile" ? MobileComponent : DesktopComponent;
    
    return React.createElement(
      Suspense,
      {
        fallback: React.createElement(
          "div",
          { className: "flex items-center justify-center min-h-screen" },
          "Loading..."
        )
      },
      React.createElement(Component, props)
    );
  }

  ResponsiveWrapper.displayName = "ResponsiveWrapper";
  
  return ResponsiveWrapper as ComponentType<T>;
}
