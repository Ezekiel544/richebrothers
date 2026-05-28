# 🚀 Deployment Guide - Richie Brothers Tours Jamaica

Complete guide to deploy your website locally, test it, and launch it live.

---

## 📋 Prerequisites

- Node.js 18+ installed
- npm, pnpm, or yarn installed
- GitHub account (for Vercel deployment)
- Custom domain (optional but recommended)

---

## 🏃 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
cd /vercel/share/v0-project
pnpm install
```

### 2. Run Development Server
```bash
pnpm dev
```

Opens at: **http://localhost:3000**

### 3. Make Changes
Edit any file in `components/` or `app/` directory. Changes appear instantly!

### 4. Stop Server
Press `CTRL + C` in terminal

---

## 🧪 Testing Locally

### Test Desktop Version
```bash
pnpm dev
```
Open browser: `http://localhost:3000`

### Test Mobile Version
1. Open DevTools (F12)
2. Click mobile device icon
3. Select "iPhone 12" or similar
4. See responsive layout in action

### Test Different Devices
```bash
# iPhone SE (375x667)
# iPad (768x1024)
# Desktop (1920x1080)
```

### Test Performance
```bash
# Build production version
pnpm build

# Run production version locally
pnpm start
```

---

## 📦 Build for Production

### Create Optimized Build
```bash
pnpm build
```

This creates `.next/` folder with optimized code.

### Output:
```
✓ Compiled successfully
✓ Linting and type checking
✓ Production build ready
```

---

## 🌐 Deploy to Vercel (Recommended)

**Vercel is the official Next.js hosting platform. Free tier includes:**
- ✅ Free hosting
- ✅ Automatic deployments
- ✅ Free SSL certificate
- ✅ Fast CDN worldwide
- ✅ Easy domain setup

### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Richie Brothers Tours Jamaica website"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/richie-tours.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to **[vercel.com](https://vercel.com)**
2. Click "Sign Up" or "Log In"
3. Choose "GitHub" as auth method
4. Click "Import Project"
5. Find and select your `richie-tours` repository
6. Click "Import"
7. Vercel auto-detects Next.js project
8. Click "Deploy"

**That's it!** Your site is live at: `https://richie-tours.vercel.app`

### Step 3: Connect Custom Domain
1. In Vercel dashboard, go to "Settings" > "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `richiebrotherstours.com`)
4. Follow DNS instructions from your domain registrar
5. Wait for DNS to propagate (5-48 hours)

### Automatic Deployments
Every time you push to GitHub:
```bash
git add .
git commit -m "Update pricing"
git push
```
Vercel automatically rebuilds and deploys!

---

## 🔗 Domain Setup

### Option 1: Buy Domain on Vercel
1. In Vercel dashboard: Settings > Domains > "Add Domain"
2. Click "Buy" next to domain input
3. Complete purchase
4. Domain automatically configured

### Option 2: Domain from Other Registrar
Domain registrar examples:
- GoDaddy
- Namecheap
- Google Domains
- Bluehost

**Setup:**
1. Buy domain from registrar
2. In Vercel: Add domain
3. Update DNS records from registrar to point to Vercel
4. Vercel shows exact DNS values needed

---

## 🔐 Environment Variables (If Needed)

Currently, **no environment variables are required**.

If you add features later (payments, emails):

### Add Environment Variables to Vercel
1. Go to Vercel dashboard
2. Project > Settings > Environment Variables
3. Add key-value pairs
4. Redeploy

### For Local Development
Create `.env.local` file:
```env
NEXT_PUBLIC_API_KEY=your_api_key_here
SECRET_KEY=your_secret_key_here
```

**Note**: Variables starting with `NEXT_PUBLIC_` are exposed to browser. Use for non-sensitive data only.

---

## 📊 Monitoring & Analytics

### Vercel Dashboard
Monitor:
- ✅ Deployments & build status
- ✅ Performance metrics
- ✅ Error logs
- ✅ Traffic analytics

### Add Google Analytics
1. Create account at google.com/analytics
2. Get your tracking ID (GA-XXXXX)
3. Add to `app/layout.tsx`:

```javascript
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_XXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_XXXXX');
</script>
```

---

## 🔄 Updating Your Site

### Make Changes
1. Edit files locally
2. Test with `pnpm dev`
3. Commit changes:
```bash
git add .
git commit -m "Update: [describe change]"
git push
```

### Vercel Auto-Deploys
- Vercel rebuilds automatically
- New version live in ~1 minute
- Previous version backed up

### Rollback (If Needed)
Vercel dashboard > Deployments > Click previous version > Redeploy

---

## 🛠️ Troubleshooting

### Issue: "Build Failed"
**Solution:**
1. Check error message in Vercel dashboard
2. Fix error locally: `pnpm build`
3. Push fix: `git push`

### Issue: "Port 3000 Already in Use"
**Solution:**
```bash
# Kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue: "Dependencies Not Installing"
**Solution:**
```bash
# Clear cache
rm -rf node_modules pnpm-lock.yaml

# Reinstall
pnpm install
```

### Issue: "Styling/Colors Not Showing"
**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh: Ctrl+F5
3. Restart dev server

### Issue: "Images Not Loading"
**Solution:**
1. Check image path: Should be `/images/filename.jpg`
2. Verify file exists in `public/` folder
3. Check console for 404 errors

---

## 📱 Before Launch Checklist

### Content
- [ ] Company name updated
- [ ] Contact information correct
- [ ] Pricing accurate
- [ ] Testimonials authentic
- [ ] Images high-quality

### Technical
- [ ] Domain registered
- [ ] DNS configured (if custom domain)
- [ ] Analytics setup
- [ ] Meta tags updated
- [ ] Robots.txt configured

### Testing
- [ ] Desktop browser test
- [ ] Mobile device test
- [ ] Tablet test
- [ ] All links working
- [ ] Contact forms working
- [ ] WhatsApp button working

### Performance
- [ ] Page loads in <3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] Mobile scores high on Lighthouse

### Security
- [ ] SSL certificate active (auto with Vercel)
- [ ] No API keys exposed
- [ ] Form data secure
- [ ] Sensitive data protected

---

## 📈 Post-Launch

### Week 1
- Monitor Vercel dashboard for errors
- Check analytics for traffic
- Test all contact methods
- Fix any reported issues

### Month 1
- Analyze traffic patterns
- Update based on user feedback
- Optimize images
- Monitor performance

### Ongoing
- Regular backups (GitHub)
- Update content seasonally
- Monitor analytics
- Keep dependencies updated

---

## 🚨 Performance Tips

### Optimize Images
```bash
# Use tools like:
# - TinyPNG (tinypng.com)
# - Squoosh (squoosh.app)
# Compress before uploading
```

### Enable Caching
Vercel handles this automatically. For custom:
```javascript
// In next.config.mjs
headers: async () => {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000'
        }
      ]
    }
  ]
}
```

### Monitor Core Web Vitals
1. PageSpeed Insights: https://pagespeed.web.dev/
2. Lighthouse (in DevTools)
3. Vercel Analytics

---

## 💳 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Vercel Hosting | Free | Pro: $20/mo for extra features |
| Domain | $10-15/year | Via Vercel or registrar |
| SSL Certificate | Free | Included with Vercel |
| Email | Free | Use Gmail/Outlook |
| Analytics | Free | Google Analytics |
| **Total** | **~$10-15/year** | Extremely affordable! |

---

## 📞 Support & Help

### Vercel Support
- Docs: https://vercel.com/docs
- Status: https://vercel.statuspage.io
- Help Center: https://vercel.com/help

### Next.js Help
- Docs: https://nextjs.org/docs
- Discussion: https://github.com/vercel/next.js/discussions

### Troubleshooting
1. Check error messages carefully
2. Search error on Google
3. Check GitHub issues
4. Ask on Stack Overflow

---

## ✅ Deployment Success Checklist

After deploying, verify:

- [ ] Website loads at your domain
- [ ] All pages accessible
- [ ] Header navigation works
- [ ] WhatsApp button functional
- [ ] Forms submittable
- [ ] Mobile version responsive
- [ ] Images loading properly
- [ ] No console errors
- [ ] Fast page load time
- [ ] SSL certificate active (green lock icon)
- [ ] Analytics tracking working

---

## 🎉 You're Live!

Congratulations! Your **Richie Brothers Tours Jamaica** website is now live and ready to attract customers!

### Share Your Website
- 📧 Email to contacts
- 📱 Share on WhatsApp
- 👥 Post on social media
- 🔗 Add to Google My Business

### Monitor Performance
- Track analytics weekly
- Monitor visitor behavior
- Test regularly
- Gather feedback

### Keep Improving
- Update content seasonally
- Add new tours/services
- Optimize based on data
- Engage with visitors

---

**Your tourism website is live. Time to welcome some travelers!** ✈️🌴🇯🇲

