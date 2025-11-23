1. Full Folder Context
src/
  services/
    auth.service.ts
  lib/
    axios.ts         ← api instance
  state/
    queries/
      auth.query.ts  ← useLogin hook
  pages/
    AuthPage.tsx     ← calls useLogin()


2. The api instance (axios client)
This lives in src/lib/axios.ts
This file centralizes your Axios config.
```bash
// src/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Optional: interceptors
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

3. The Service Layer (API definitions)

This lives in src/services/auth.service.ts

This layer includes NO React code.
It only contains reusable API functions.

```bash
// src/services/auth.service.ts
import { api } from "@/lib/axios";

export const AuthService = {
  login: (data: { email: string; password: string }) =>
    api.post("/login", data),

  register: (data: { email: string; password: string }) =>
    api.post("/register", data),

  logout: () => api.post("/logout"),
};

```

4. The React Query Layer (server state execution)

This lives in src/state/queries/auth.query.ts

Here you connect the API service → React Query hook.

```bash
// src/state/queries/auth.query.ts
import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () =>
  useMutation({
    mutationFn: AuthService.login,
  });

export const useRegister = () =>
  useMutation({
    mutationFn: AuthService.register,
  });

export const useLogout = () =>
  useMutation({
    mutationFn: AuthService.logout,
  });

```
5. Usage inside a UI Component

```bash
// src/pages/AuthPage.tsx
import { useLogin } from "@/state/queries/auth.query";

export default function AuthPage() {
  const login = useLogin();

  function handleSubmit() {
    login.mutate(
      { email: "test@mail.com", password: "123" },
      {
        onSuccess: (res) => console.log("Logged in!", res),
        onError: (err) => console.error(err),
      }
    );
  }

  return (
    <button disabled={login.isPending} onClick={handleSubmit}>
      {login.isPending ? "Loading..." : "Login"}
    </button>
  );
}

```

6. Final Clean Flow (Very Important)
[frontend form] → useLogin()
                    ↓
         [React Query mutation]
                    ↓
        AuthService.login(data)
                    ↓
              api.post()
                    ↓
               Backend API
