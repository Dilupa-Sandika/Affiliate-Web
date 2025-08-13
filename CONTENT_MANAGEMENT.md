# Vegas Tech Hub Content Management Guide

This guide explains how to manage blog posts and reviews in the new folder-based structure.

## 📁 **Content Structure**

```
src/content/
├── blog/
│   ├── tv-remote-replacement-guide/
│   │   ├── index.md                    # Main article
│   │   ├── images/                     # Article images
│   │   │   ├── tv-remote-broken.jpg
│   │   │   ├── google-tv-app.jpg
│   │   │   └── amazon-remote.png
│   │   └── tv-remote-broken.jpg        # Featured image
│   └── wifi-dead-zones-solution/
│       ├── index.md
│       ├── images/
│       └── wifi-mesh-solution.jpg
└── reviews/
    ├── august-wifi-smart-lock/
    │   ├── index.md
    │   ├── images/
    │   │   ├── august-lock-installed.jpg
    │   │   ├── app-screenshots.jpg
    │   │   └── activity-log.jpg
    │   └── august-lock-hero.jpg
    └── ring-video-doorbell-pro-2/
        ├── index.md
        ├── images/
        └── ring-pro-2-hero.jpg
```

## ✏️ **Creating New Blog Posts**

### 1. Create the Folder Structure
```bash
src/content/blog/your-article-name/
├── index.md          # Main article file
├── images/           # Supporting images
└── hero-image.jpg    # Featured image
```

### 2. Blog Post Template (`index.md`)
```yaml
---
layout: blog-post.njk
title: "Your Article Title"
description: "SEO-friendly description for search engines and social media"
date: 2025-08-13
tags: ["blog", "hometech", "diy", "problem-solving"]
featuredImage: "/content/blog/your-article-name/hero-image.jpg"
featured: true  # Set to true for homepage featuring
author: "Vegas Tech Hub Team"
readingTime: "6 min read"
---

# Your Article Content Here

Write your article content in Markdown format...
```

### 3. Image Guidelines
- **Featured Image**: 1200x630px (optimal for social sharing)
- **Article Images**: 800x600px minimum
- **Formats**: JPG (photos), PNG (graphics/screenshots)
- **File Naming**: Use descriptive, kebab-case names

## 📝 **Creating New Product Reviews**

### 1. Review Folder Structure
```bash
src/content/reviews/product-name/
├── index.md          # Main review
├── images/           # Review images
└── product-hero.jpg  # Main product image
```

### 2. Review Template (`index.md`)
```yaml
---
layout: blog-post.njk
title: "Product Name: Complete Review After X Months"
description: "Detailed review of Product Name after real-world testing"
date: 2025-08-13
tags: ["review", "product-category", "brand-name"]
featuredImage: "/content/reviews/product-name/product-hero.jpg"
featured: false
author: "Vegas Tech Hub Team"
readingTime: "10 min read"
productName: "Full Product Name"
rating: 4.2
price: "$199"
pros: ["Pro 1", "Pro 2", "Pro 3"]
cons: ["Con 1", "Con 2", "Con 3"]
---

# Product Review Content
```

## 🎯 **Featured Article System**

### How It Works
- Set `featured: true` in any article's frontmatter
- Featured articles appear first on the blog homepage
- Multiple featured articles rotate based on date

### Best Practices
- Keep 2-3 articles featured at most
- Feature your most helpful/popular content
- Update featured status regularly

## 📷 **Image Management**

### Image Organization
```
article-folder/
├── index.md
├── article-hero.jpg          # Featured image (required)
├── images/                   # Supporting images folder
│   ├── step-1-photo.jpg
│   ├── before-after.png
│   ├── app-screenshot.jpg
│   └── installation-steps.jpg
```

### Image References in Articles
```markdown
<!-- Featured image (set in frontmatter) -->
featuredImage: "/content/blog/article-name/hero-image.jpg"

<!-- Article images -->
![Description](/content/blog/article-name/images/step-1-photo.jpg)
![App Screenshot](/content/blog/article-name/images/app-screenshot.jpg)
```

### Image Optimization Tips
- **Compress images** before uploading (use TinyPNG or similar)
- **Use descriptive alt text** for accessibility
- **Consistent naming** convention (kebab-case)

## 🔍 **SEO Best Practices**

### Title Guidelines
- **50-60 characters** maximum
- **Include target keywords** naturally
- **Be specific and descriptive**
- **Add location** when relevant ("Las Vegas", "Vegas")

### Description Guidelines
- **150-160 characters** maximum
- **Compelling and click-worthy**
- **Include main benefit/solution**
- **Natural keyword inclusion**

### Tag Strategy
**Blog Post Tags:**
- `blog` (always include)
- `hometech`, `diy`, `problem-solving`
- Specific product/issue tags

**Review Tags:**
- `review` (always include)
- Product category (`smart-lock`, `doorbell`, `camera`)
- Brand name (`ring`, `august`, `yale`)

## 📊 **Content Performance Tracking**

### Analytics to Monitor
- **Page views** per article
- **Time on page** (engagement)
- **Bounce rate** (content quality)
- **Social shares** (shareability)
- **Comments** (Giscus engagement)

### Content Optimization
- **Update old content** regularly
- **Add new sections** based on comments/questions
- **Refresh featured images** seasonally
- **Cross-link** related articles

## 🚀 **Publishing Workflow**

### 1. Content Creation
1. **Create folder** with descriptive name
2. **Write index.md** with proper frontmatter
3. **Add images** to images/ folder
4. **Set featured image** as main file

### 2. Review Process
1. **Check all links** work correctly
2. **Verify image paths** are correct
3. **Test on mobile** devices
4. **Review SEO elements**

### 3. Publishing
1. **Commit changes** to GitHub
2. **Check Netlify build** succeeds
3. **Verify live site** looks correct
4. **Submit to search engines** (optional)

## 🔧 **Technical Details**

### Collections
- **`collections.blog`**: All blog posts
- **`collections.featuredBlog`**: Only featured posts
- **`collections.reviews`**: All product reviews

### URL Structure
- **Blog posts**: `/blog/article-name/`
- **Reviews**: `/reviews/product-name/`
- **Images**: `/content/blog|reviews/folder-name/image.jpg`

### Build Process
- **Eleventy** processes all `index.md` files
- **Images** are copied to `_site/content/`
- **Collections** are automatically generated
- **RSS feeds** are created automatically

## 📋 **Content Checklist**

### Before Publishing
- [ ] Frontmatter complete and accurate
- [ ] Featured image set and optimized
- [ ] All article images working
- [ ] Internal links functional
- [ ] Tags appropriate and consistent
- [ ] SEO title and description optimized
- [ ] Content proofread and edited
- [ ] Mobile formatting checked

### After Publishing
- [ ] Live site verified
- [ ] Social media shared
- [ ] Internal linking from related posts
- [ ] Analytics tracking confirmed
- [ ] Comments monitored

This structure ensures consistent, manageable content that performs well in search engines and provides value to your Vegas audience!