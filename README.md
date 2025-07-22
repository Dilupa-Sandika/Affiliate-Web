# Smart Home Authority - Affiliate & Lead Generation Website

A modern, performance-optimized website built with Eleventy (11ty) for smart home product reviews and Las Vegas installation services.

## Features

- **Dual Business Model**: Affiliate marketing + Local lead generation
- **Performance Optimized**: Built for Core Web Vitals and fast loading
- **SEO Friendly**: Structured data, sitemaps, and optimized meta tags
- **Lead Generation**: Netlify Forms integration for service inquiries
- **Mobile First**: Responsive design for all devices
- **Las Vegas Focused**: Local SEO optimization for Nevada market

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run serve
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── _layouts/           # Page templates
│   ├── base.njk       # Main layout with navigation/footer
│   ├── page.njk       # Standard page layout
│   └── review.njk     # Product review template
├── _includes/         # Reusable components
├── assets/            # CSS, JS, images
├── reviews/           # Product review articles
├── services/          # Las Vegas service pages
├── smart-cameras/     # Camera reviews hub
├── smart-locks/       # Smart lock reviews hub
├── smart-lighting/    # Lighting reviews hub
├── contact.njk        # Contact form with lead generation
└── index.njk          # Homepage
```

## Content Management

### Adding Product Reviews

1. Create new `.md` file in `src/reviews/`
2. Use the review layout with required frontmatter:

```yaml
---
layout: review.njk
title: "Product Name Review"
description: "SEO description"
featuredImage: "/assets/images/product.jpg"
author: "Smart Home Authority Team"
date: 2025-01-15
amazonLink: "https://amazon.com/dp/PRODUCT?tag=yourtag-20"
pros:
  - "Advantage 1"
  - "Advantage 2"
cons:
  - "Disadvantage 1"
  - "Disadvantage 2"
---
```

### Service Pages

Local service pages are in `src/services/` and include:
- Smart lock installation
- Security camera installation  
- Smart lighting installation

## SEO Features

- Automatic sitemap generation
- Structured data (Organization, LocalBusiness, Product reviews)
- Open Graph meta tags
- Performance optimized (targets 90+ PageSpeed score)
- Mobile-first responsive design

## Lead Generation

Contact forms use Netlify Forms with:
- Spam protection (honeypot)
- Form validation
- Auto-redirect to thank you page
- Email notifications to business owner

## Deployment

### Netlify Deployment

1. **Connect to GitHub:**
   - Push code to GitHub repository
   - Connect repository to Netlify

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `_site`

3. **Environment Variables:**
   - Set NODE_VERSION to `18`

4. **Forms Setup:**
   - Enable Netlify Forms in dashboard
   - Configure notification emails

### GitHub Setup

1. **Initialize Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Connect to GitHub:**
   ```bash
   git remote add origin https://github.com/yourusername/your-repo.git
   git branch -M main
   git push -u origin main
   ```

## Customization

### Affiliate Links
Replace placeholder affiliate tags in review articles:
- Update `amazonLink` fields in review frontmatter
- Replace `youraffiliatetag-20` with your Amazon Associate tag

### Contact Information
Update contact details in:
- `src/contact.njk` - Contact form page
- `src/_layouts/base.njk` - Footer
- `src/_includes/structured-data.njk` - Business schema

### Branding
- Update site title and description in `.eleventy.js`
- Replace placeholder images in `src/assets/images/`
- Customize CSS colors in `src/assets/css/style.css`

## Performance

The site is built for performance with:
- Minimal JavaScript usage
- Optimized CSS
- Compressed images
- Fast Netlify CDN delivery
- Efficient 11ty static generation

Target metrics:
- Google PageSpeed: 90+ (Desktop/Mobile)
- Core Web Vitals: All "Good"
- First Contentful Paint: <1.5s

## License

This project is for commercial use. All content and code are proprietary.

## Support

For technical support or customization needs, contact the development team.