# MediQuick - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Go to [Vercel](https://vercel.com)**
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Click "Deploy"**
   - Vercel will automatically build and deploy your app
   - You'll get a live URL like: `https://your-app.vercel.app`

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🔧 Important Configuration

### `vercel.json` File (Already Created)

This file is **required** for React Router to work properly on Vercel:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**What it does**: Redirects all routes to `index.html` so React Router can handle client-side routing.

**Without this file**: 
- ❌ Direct URL access (e.g., `/login`, `/products`) will show 404
- ❌ Page refresh on any route will fail
- ❌ Shared links won't work

**With this file**:
- ✅ All routes work correctly
- ✅ Page refresh works
- ✅ Direct URL access works
- ✅ Shared links work

---

## 📝 Deployment Checklist

Before deploying, make sure:

- [x] `vercel.json` exists in root directory
- [x] All dependencies are in `package.json`
- [x] Build command is `npm run build`
- [x] Output directory is `dist`
- [x] No environment variables needed (all data is mock)
- [x] All routes are defined in `App.jsx`

---

## 🌐 After Deployment

### Test Your Deployment

1. **Home Page**: `https://your-app.vercel.app/`
2. **Login Page**: `https://your-app.vercel.app/login`
3. **Products Page**: `https://your-app.vercel.app/products`
4. **Any Route**: Should work without 404 errors

### Common Issues & Solutions

#### Issue: 404 on Direct Route Access

**Problem**: Going to `/login` directly shows 404

**Solution**: Make sure `vercel.json` is in the root directory and redeploy:
```bash
vercel --prod
```

#### Issue: Build Fails

**Problem**: Deployment fails during build

**Solution**: 
1. Check build locally first:
   ```bash
   npm run build
   ```
2. Fix any errors
3. Commit and push changes
4. Redeploy

#### Issue: Blank Page After Deployment

**Problem**: App loads but shows blank page

**Solution**:
1. Check browser console for errors
2. Ensure all imports are correct
3. Check that `index.html` is in the root directory
4. Verify `dist` folder is being generated

---

## 🔄 Updating Your Deployment

### Automatic Deployment (Recommended)

If you connected via GitHub:
1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Vercel automatically rebuilds and deploys

### Manual Deployment

```bash
# Deploy latest changes
vercel --prod
```

---

## 🎨 Custom Domain (Optional)

1. Go to your project on Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-10 minutes)

---

## 📊 Environment Variables

This app doesn't need environment variables since it uses mock data. But if you add a backend later:

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Environment Variables"
3. Add your variables:
   - `VITE_API_URL`
   - `VITE_API_KEY`
   - etc.
4. Redeploy for changes to take effect

---

## 🚀 Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Gzip compression
- ✅ HTTP/2
- ✅ Edge caching
- ✅ Automatic image optimization

---

## 📱 Preview Deployments

Every push to a branch (not main) creates a preview deployment:
- Unique URL for testing
- Perfect for reviewing changes
- Doesn't affect production

---

## 🔍 Monitoring

View deployment logs and analytics:
1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments" to see all builds
4. Click "Analytics" for visitor stats

---

## 🛠️ Troubleshooting Commands

```bash
# Check if build works locally
npm run build

# Preview production build locally
npm run preview

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Force redeploy on Vercel
vercel --prod --force
```

---

## 📦 Build Output

After running `npm run build`, you should see:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── vite.svg
```

This `dist` folder is what Vercel deploys.

---

## ✅ Deployment Success Checklist

After deployment, verify:

- [ ] Home page loads (`/`)
- [ ] Login page works (`/login`)
- [ ] Can navigate between pages
- [ ] Direct URL access works (e.g., `/products`)
- [ ] Page refresh doesn't break
- [ ] Bottom navigation works
- [ ] All images/icons load
- [ ] Responsive design works on mobile
- [ ] No console errors

---

## 🎉 Your App is Live!

Once deployed, share your app:
- **Production URL**: `https://your-app.vercel.app`
- **Custom Domain**: `https://your-domain.com` (if configured)

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router on Vercel](https://vercel.com/guides/deploying-react-with-vercel)

---

**Your MediQuick app is now deployed and accessible worldwide! 🌍🎉**
