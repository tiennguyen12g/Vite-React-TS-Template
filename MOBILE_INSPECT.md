✅ Chrome DevTools → Android Chrome (Most common)

Works if your phone is Android and you’re using Chrome

1️⃣ Enable Developer Mode on Android

(On phone)

Settings → About phone → tap "Build number" 7 times


Then:

Settings → Developer options → USB debugging → ON

2️⃣ Connect phone to PC

Use USB cable

Unlock your phone

Accept “Allow USB debugging” popup

3️⃣ Open Chrome DevTools on PC

(On PC Chrome)

chrome://inspect/#devices


You should see:

Your Android device

Open Chrome tabs from the phone

Example:

Pixel 6
  └─ https://172.16.255.206:5173
     [inspect]


Click Inspect → 🎉 DevTools opens!

❌ ERROR
If you refresh inpect/devices page and there is no device show, you should check connect between phone and PC. 
The phone must be asked the permission to grant for pc accessing.
You can Revoke the authorizations permission and reconnect again.