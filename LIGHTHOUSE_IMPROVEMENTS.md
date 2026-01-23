# Lighthouse Performance Improvements

## Overview
Current Lighthouse Score Issues:
- Render-blocking resources (CSS, fonts, JS)
- Missing cache headers on static assets
- Critical path latency: 398ms

---

## Priority 1: Add Cache Headers ⭐⭐⭐

**Problem:** All static assets have `Cache TTL: None`

**Solution:** Configure cache headers on your server/hosting:

### Recommended Cache Lifetimes
- **Images** (.webp, .png): 1 year (31536000 seconds)
- **JS/CSS bundles**: 1 month (2592000 seconds)
- **HTML**: No cache or 5 minutes (disable for auto-updates)
- **Fonts**: 1 year (31536000 seconds)

### Implementation
**If using Vite + Express/Node:**
```javascript
app.use(express.static('dist', {
  maxAge: '1y',
  etag: false
}));

app.get('/*.html', (req, res) => {
  res.set('Cache-Control', 'public, max-age=0, must-revalidate');
  res.sendFile(path.join(__dirname, 'dist', req.path));
});
```

**If using Nginx (see your nginx.conf):**
```nginx
location ~* \.(webp|png|jpg|js|css)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location ~* \.html$ {
  expires -1;
  add_header Cache-Control "public, max-age=0, must-revalidate";
}
```

**Size Impact:** 544 KiB of assets
- /1.webp: 143 KiB
- /2.webp: 111 KiB
- /3.webp: 108 KiB
- /4.webp: 100 KiB
- assets/index-gSeiUrBA.js: 58 KiB
- Other files: ~24 KiB

---

## Priority 2: Defer Non-Critical CSS (Fonts) ⭐⭐⭐

**Problem:** Google Fonts requests are blocking initial render (440ms total)

**Current Impact:**
- /css2?family=Agdasima: 120ms + 120ms
- /css2?family=Inter: 200ms
- /css2?family=Barrio: 120ms
- woff2 font files: 398ms each

**Solution:** Implement async font loading in [index.html](index.html)

Replace render-blocking font links with:
```html
<!-- Preconnect for faster font loading -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load fonts asynchronously -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" media="print" onload="this.media='all'" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">

<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&display=swap">
<link rel="stylesheet" media="print" onload="this.media='all'" href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&display=swap">

<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&family=Barrio&display=swap">
<link rel="stylesheet" media="print" onload="this.media='all'" href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&family=Barrio&display=swap">

<!-- Fallback for no-JS -->
<noscript>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&family=Barrio&display=swap">
</noscript>
```

**Expected Improvement:** Removes ~440ms from critical path

---

## Priority 3: Optimize Image Delivery ⭐⭐

**Problem:** Total image size is 544 KiB (very large for LCP)

**Current Images:**
- 1.webp: 143 KiB
- 2.webp: 111 KiB
- 3.webp: 108 KiB
- 4.webp: 100 KiB
- KuschelTier_logo.png: 12 KiB
- KuschelTier.png: 8 KiB

**Solutions:**

1. **Compress further** (use TinyPNG, ImageOptim, or ffmpeg)
   - WebP is already optimal, but might reduce 10-20%

2. **Lazy load images:**
   ```html
   <img src="image.webp" loading="lazy" alt="description">
   ```

3. **Responsive images with srcset:**
   ```html
   <picture>
     <source srcset="image-small.webp" media="(max-width: 600px)">
     <source srcset="image-large.webp">
     <img src="image-large.webp" alt="description">
   </picture>
   ```

4. **Serve different sizes** based on viewport/device

---

## Priority 4: Reduce JS Bundle Size ⭐

**Problem:** JS bundle is 58 KiB (second largest)

**Current Load:** 369ms

**Checklist:**
- [ ] Remove unused dependencies: `npm audit`
- [ ] Tree-shake unused code in components
- [ ] Code-split route components (lazy load):
  ```javascript
  // In router.js
  const Home = () => import('./components/Home.js');
  const Contact = () => import('./components/Contact.js');
  ```
- [ ] Check for large libraries that could be replaced

---

## Priority 5: Critical Path Optimization ⭐

**Current maximum critical path latency: 398ms**

**Critical Chain:**
1. HTML document (181ms) → 0.97 KiB
2. Inter font CSS (183ms) → 1.50 KiB
3. Main JS (369ms) → 58.30 KiB
4. CSS (285ms) → 2.84 KiB
5. Agdasima font CSS (294ms) → 1.14 KiB
6. Font files (398ms) → 11-27 KiB each

**To Reduce:**
- ✅ Defer fonts (removes from critical path)
- ✅ Inline critical CSS
- ✅ Add cache headers (helps repeat visits)
- Consider: Preload above-the-fold images only

---

## Implementation Checklist

- [ ] Update nginx.conf with cache headers
- [ ] Modify index.html to defer font loading
- [ ] Compress/optimize images further
- [ ] Test with Lighthouse
- [ ] Consider code-splitting in router.js
- [ ] Monitor with Web Vitals (LCP, FCP)

---

## Quick Wins (High Impact, Low Effort)

1. **Add cache headers** → Instant improvement for repeat visits
2. **Defer Google Fonts** → Removes 440ms from critical path
3. **Compress images** → Could save 50-100 KiB

---

## Testing

After each change:
```bash
npm run build  # or your build command
# Test with Lighthouse in Chrome DevTools
# Lighthouse > Generate report
```

Track your improvements:
- Current LCP: Measure after each change
- FCP: Should improve significantly with font deferral
- TTI (Time to Interactive): Related to JS bundle size
