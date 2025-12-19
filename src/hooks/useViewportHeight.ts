import { useEffect } from "react";

/**
 * Hook to set CSS custom property for actual viewport height
 * This fixes the mobile browser address bar issue where 100vh includes the address bar
 * but the actual visible viewport is smaller
 * 
 * Uses --dvh custom property as fallback for browsers that don't support native dvh
 */
export function useViewportHeight() {
  useEffect(() => {
    const setViewportHeight = () => {
      // Get the actual viewport height (excluding address bar on mobile)
      // This is more reliable than relying on dvh support
      const vh = window.innerHeight * 0.01;
      // Set CSS custom property - this will override dvh if needed
      document.documentElement.style.setProperty("--dvh", `${vh}px`);
    };

    // Set initial value immediately
    setViewportHeight();

    // Update on resize and orientation change
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);
    
    // Update on scroll (address bar might show/hide)
    window.addEventListener("scroll", setViewportHeight, { passive: true });

    // Also update after delays to catch address bar animations
    const timeoutId1 = setTimeout(setViewportHeight, 100);
    const timeoutId2 = setTimeout(setViewportHeight, 300);

    return () => {
      window.removeEventListener("resize", setViewportHeight);
      window.removeEventListener("orientationchange", setViewportHeight);
      window.removeEventListener("scroll", setViewportHeight);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, []);
}
