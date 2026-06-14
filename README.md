# Body Forge Dashboard - Windows-Friendly Web App

This is a Progressive Web App style fitness dashboard for workouts, nutrition, macros, and progress tracking.

## What it does

- Workout dashboard for a structured physique program
- Gym exercise list by day
- Weight and rep logging
- Wrist-friendly exercise notes
- Macro tracking by breakfast, lunch, dinner, and snacks
- Meal recommendations based on remaining macros
- Progress check-ins: weight, waist, energy, wrist pain, notes
- Stores data locally in the browser using localStorage

## Why this version is better for your situation

You do not need a Mac or Xcode. This runs as a web app and can be opened on your iPhone through Safari. You can add it to your iPhone Home Screen so it behaves like an app.

## Requirements on Windows

Install Node.js LTS:
https://nodejs.org

Then unzip this folder.

## Run locally on your Dell

Open PowerShell in the project folder and run:

```powershell
npm install
npm run dev
```

Vite will show a local address, usually:

```text
http://localhost:5173
```

Open that address in your Windows browser.

## Open it from your iPhone

Your Dell and iPhone must be on the same Wi-Fi.

1. In PowerShell, run:

```powershell
ipconfig
```

2. Find your IPv4 address, usually something like:

```text
192.168.1.25
```

3. On your iPhone Safari, open:

```text
http://YOUR-IP-ADDRESS:5173
```

Example:

```text
http://192.168.1.25:5173
```

4. Tap Share.
5. Tap Add to Home Screen.

## Important note

This first version stores data locally on the device/browser. That means data entered on your Dell and data entered on your iPhone are separate unless later upgraded to cloud sync.

## Good future upgrades

- Cloud sync with Supabase or Firebase
- User login
- Expanded food database
- Barcode scanner
- Apple Health / HealthKit integration
- Charts for strength and waist reduction
- Export workouts to CSV or PDF
- Exercise video links
- Offline-first PWA caching
