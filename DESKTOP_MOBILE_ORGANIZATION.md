# Desktop vs Mobile Component Organization Guide

## Overview
This document explains the two approaches for organizing desktop and mobile components in this project.

## Approach Comparison

### Approach 1: Separate Folders (Current)
```
src/pages/
  ├── desktop/
  │   ├── auth/
  │   │   └── AuthPage.tsx
  │   └── home/
  │       └── Home.tsx
  └── mobile/
      ├── auth/
      │   └── AuthPage.m.tsx
      └── home/
          └── Home.m.tsx
```

**Pros:**
- Clear separation of desktop and mobile code
- Easy to see all mobile/desktop files at once
- Can have different folder structures for each platform

**Cons:**
- Related files are far apart (harder to compare)
- More duplication of folder structure
- Harder to maintain shared logic
- More complex imports
- Difficult to refactor across platforms

---

### Approach 2: Same Folder with Naming Convention (Recommended) ⭐
```
src/pages/
  ├── auth/
  │   ├── AuthPage.tsx      (Desktop)
  │   ├── AuthPage.m.tsx    (Mobile)
  │   └── useAuthLogic.ts   (Shared logic)
  └── home/
      ├── Home.tsx
      └── Home.m.tsx
```

**Pros:**
- ✅ Related files are together (easier to compare and maintain)
- ✅ Shared logic can be extracted to common files
- ✅ Less duplication
- ✅ Easier imports and path aliases
- ✅ Better scalability
- ✅ Simpler refactoring

**Cons:**
- Files can get cluttered if you have many variants
- Need clear naming convention

---

## Recommendation: Use Approach 2 (Same Folder)

The same-folder approach is **better for maintainability** and is the industry standard for responsive React applications.

## Implementation Examples

### Example 1: Using Device Detection Hook

```tsx
// src/pages/auth/AuthPage.tsx (Desktop)
import React from "react";
import AuthLayout from "@/layout/AuthLayout";
// ... desktop-specific code

// src/pages/auth/AuthPage.m.tsx (Mobile)
import React from "react";
import AuthLayout from "@/layout/AuthLayout";
// ... mobile-optimized code

// src/router/index.tsx
import { useDevice } from "@/hooks/useDevice";
import DesktopAuthPage from "@/pages/auth/AuthPage";
import MobileAuthPage from "@/pages/auth/AuthPage.m";

function AuthPageRouter() {
  const deviceType = useDevice();
  return deviceType === "mobile" ? <MobileAuthPage /> : <DesktopAuthPage />;
}
```

### Example 2: Using Dynamic Imports (Better Performance)

```tsx
// src/router/index.tsx
import { createResponsiveLoader } from "@/utils/deviceUtils";

const AuthPage = createResponsiveLoader(
  () => import("@/pages/auth/AuthPage"),
  () => import("@/pages/auth/AuthPage.m")
);

// In your routes
<Route path="/auth" element={<AuthPage />} />
```

### Example 3: Shared Logic Extraction

```tsx
// src/pages/auth/useAuthLogic.ts (Shared)
export function useAuthLogic() {
  const [isLogin, setIsLogin] = useState(true);
  
  const handleLogin = (email: string, password: string) => {
    // Shared login logic
  };
  
  return { isLogin, setIsLogin, handleLogin };
}

// src/pages/auth/AuthPage.tsx (Desktop)
import { useAuthLogic } from "./useAuthLogic";

export default function AuthPage() {
  const { isLogin, setIsLogin, handleLogin } = useAuthLogic();
  // Desktop-specific UI
}

// src/pages/auth/AuthPage.m.tsx (Mobile)
import { useAuthLogic } from "./useAuthLogic";

export default function AuthPage() {
  const { isLogin, setIsLogin, handleLogin } = useAuthLogic();
  // Mobile-specific UI
}
```

## Migration Guide

### Step 1: Move Files
```bash
# Move mobile files to same folder as desktop
mv src/pages/mobile/auth/AuthPage.m.tsx src/pages/auth/AuthPage.m.tsx
mv src/pages/mobile/home/Home.m.tsx src/pages/home/Home.m.tsx
```

### Step 2: Update Imports
Update all imports from:
```tsx
import AuthPage from "@/pages/desktop/auth/AuthPage";
import MobileAuthPage from "@/pages/mobile/auth/AuthPage.m";
```

To:
```tsx
import DesktopAuthPage from "@/pages/auth/AuthPage";
import MobileAuthPage from "@/pages/auth/AuthPage.m";
```

### Step 3: Update Router
Use the device detection hook or dynamic imports as shown in examples above.

### Step 4: Remove Empty Folders
```bash
rm -rf src/pages/desktop
rm -rf src/pages/mobile
```

## Testing

The mobile version has been created at:
- `src/pages/mobile/auth/AuthPage.m.tsx`

You can test it by:
1. Using the device detection hook in your router
2. Manually importing it in App.tsx
3. Using browser dev tools to simulate mobile viewport

## Best Practices

1. **Naming Convention**: Always use `.m.tsx` suffix for mobile versions
2. **Shared Logic**: Extract common logic to separate files (e.g., `useAuthLogic.ts`)
3. **Device Detection**: Use the `useDevice` hook for responsive behavior
4. **Code Splitting**: Use dynamic imports for better performance
5. **Consistency**: Keep the same component structure between desktop and mobile versions
