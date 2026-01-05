# Railway Deployment - Backend Only

This directory is configured to deploy the Socket.IO backend server to Railway.

## Important Notes:

- Railway will use **npm** (not pnpm) for the backend deployment
- The frontend (Next.js) should be deployed separately to Netlify
- Only `server.js` and its dependencies are needed for the backend

## Files for Railway:

- `server.js` - The Socket.IO server
- `package.json` - Dependencies
- `nixpacks.toml` - Forces Railway to use npm
- `railway.json` - Railway-specific configuration (optional)

## Environment Variables to Set in Railway:

```
NODE_ENV=production
FRONTEND_URL=https://your-netlify-site.netlify.app
NEXT_PUBLIC_APP_URL=https://your-netlify-site.netlify.app
```

## Build Command:
Railway will automatically detect and run: `npm install`

## Start Command:
`node server.js`

## Port:
Railway will auto-assign a PORT environment variable.
