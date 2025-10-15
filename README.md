# Secure Closed Group Communication (Frontend Demo)

This is a static, frontend-only prototype built with HTML + Tailwind (CDN) + vanilla JS. It demonstrates:

- Clean, minimal UI with subtle animations
- Hash-based SPA routing (no build tools required)
- Local signup/login stored in localStorage/sessionStorage (demo only)
- Dashboard, Profile, and WhatsApp-style Chat UI with simulated replies
- Floating AI Assistant that can optionally call OpenAI (enter your API key at runtime)

## Run locally

- Just open `index.html` in your browser. Or serve the folder with a simple HTTP server.

On Windows PowerShell:

```
cd "C:\\Users\\thila\\OneDrive\\Desktop\\SIH!"
Start-Process msedge.exe index.html
```

Or use Python:

```
python -m http.server 8080
# then open http://localhost:8080/
```

## Notes
- This is a UI/UX demo. There is no real backend or encryption. All data is in your browser.
- OpenAI calls may be blocked by CORS in file://. Using a local server is recommended.
- To reset demo data, clear browser storage for this page (localStorage + sessionStorage).

## Structure
```
index.html
src/
  main.js
  router.js
  state/
    auth.js
  ui/components/
    navbar.js
    floatingAssistant.js
  views/
    Home.js
    Login.js
    Signup.js
    Dashboard.js
    Profile.js
    Chat.js
```


