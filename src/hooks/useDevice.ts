import { useState, useEffect } from "react";

export type DeviceType = "mobile" | "desktop";

/**
 * Hook to detect device type based on screen width
 * @param breakpoint - Breakpoint in pixels (default: 768px)
 * @returns Device type: "mobile" or "desktop"
 */
export function useDevice(breakpoint: number = 768): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>(() => {
    // Check if window is available (SSR safety)
    if (typeof window === "undefined") return "desktop";
    return window.innerWidth < breakpoint ? "mobile" : "desktop";
  });

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth < breakpoint ? "mobile" : "desktop");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return deviceType;
}

/**
 * Hook to check if current device is mobile
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  return useDevice(breakpoint) === "mobile";
}

/**
 * Hook to check if current device is desktop
 */
export function useIsDesktop(breakpoint: number = 768): boolean {
  return useDevice(breakpoint) === "desktop";
}
