## Create pem file for using https local.
#### Prerequired.
1. Intall Choco for window. Open PowerShell with administrator. (if you are not install choco yet)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))  

2. Install mkcert
choco install mkcert

3. Create certificate file
mkcert -install
mkcert localhost 127.0.0.1 or PC's IP (172.16.255.206)
// mkcert localhost 127.0.0.1 172.16.255.206
We got: localhost-key.pem
localhost.pem

Copy to the vite project (root path)

4. Config vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
    },
    port: 5185,
    host: "localhost",
  },
});

5. If your phone still says “untrusted,” you need to install the mkcert root certificate (so it trusts your dev cert).
* Android

Run this on your PC:

mkcert -CAROOT

→ It shows a path like /Users/you/Library/Application Support/mkcert.

Copy the file:

rootCA.pem

to your phone (via USB or file share).

On your phone (find the CA certificate):

Go to Settings → Security → Encryption & credentials → Install a certificate → CA certificate

Select the file rootCA.pem.

Confirm installation (it warns about trusting user CAs — OK for dev use).