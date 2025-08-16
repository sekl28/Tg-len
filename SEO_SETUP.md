# SEO Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://myhighroller.ca

# Strapi CMS
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your_strapi_api_token_here

# SEO
GOOGLE_VERIFICATION_ID=your_google_verification_id
GOOGLE_ANALYTICS_ID=your_google_analytics_id

# Revenue Share Tracking
NEXT_PUBLIC_AFFILIATE_TRACKING=true
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## SEO Features Implemented

### 1. Meta Tags & Open Graph
- Dynamic title generation for each page
- SEO-optimized descriptions
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs
- Keywords optimization

### 2. Structured Data (JSON-LD)
- Organization schema
- Website schema
- Article schema for blog posts
- Review schema for casino pages
- Breadcrumb navigation
- FAQ structured data

### 3. Technical SEO
- `robots.txt` file
- Dynamic XML sitemap
- Proper heading hierarchy (H1, H2, H3)
- Alt tags for all images
- Clean URL structure
- Mobile-responsive design

### 4. Revenue Share Tracking Setup
- All "Play Now" buttons use affiliate tracking links
- Google Analytics events for clicks
- Partner link structure: `casino_url/?ref=myhighroller`

### 5. Page-Specific Optimizations

#### Homepage
- Title: "Best Online Casino Canada 2025 | myHighRoller Canada"
- Focuses on primary keywords
- Features structured data for organization

#### Casino Review Pages
- Dynamic titles with casino name and year
- Review schema markup
- Breadcrumb navigation
- Social sharing optimization

#### Blog Articles
- Article schema markup
- Author and publication date
- Reading time estimation
- Category-based navigation

#### Category Pages
- Dynamic filtering and sorting
- SEO-friendly URLs with parameters
- Category-specific meta descriptions

## Google Analytics Setup

Add this code to your layout.tsx or create a separate analytics component:

```typescript
// Google Analytics tracking
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''),
      });
    }
  }, [pathname, searchParams]);

  return null;
}
```

## Affiliate Link Tracking

For revenue share tracking, update all casino "Play Now" buttons to use this format:

```typescript
// Example affiliate link
const affiliateUrl = `${casino.attributes.websiteUrl}?ref=myhighroller&source=review&campaign=2025`;

// Track clicks in Google Analytics
const trackClick = (casinoName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'affiliate',
      event_label: casinoName,
      value: 1,
    });
  }
};
```

## Performance Optimizations

1. **Image Optimization**: All images use Next.js Image component
2. **Caching**: API calls have appropriate revalidation times
3. **Code Splitting**: Pages load only necessary code
4. **Lazy Loading**: Images load as needed

## Content Strategy for SEO

### Target Keywords
- Primary: "online casino Canada", "best Canadian casinos"
- Secondary: "casino bonuses Canada", "Interac casinos", "casino reviews"
- Long-tail: "best online casino Canada 2025", "Canadian casino welcome bonus"

### Content Guidelines
- Minimum 300 words per page
- Use target keywords naturally (1-2% density)
- Include location-based terms (Canada, Canadian)
- Add fresh content regularly via blog
- Update casino reviews quarterly

## Monitoring & Analytics

### Track These Metrics
1. **Organic traffic growth**
2. **Keyword rankings** for target terms
3. **Click-through rates** on affiliate links
4. **Conversion rates** (registrations/deposits)
5. **Page load speeds**
6. **Core Web Vitals**

### Tools to Use
- Google Search Console
- Google Analytics 4
- Page Speed Insights
- Ahrefs or SEMrush for keyword tracking
- Partner affiliate dashboards

## Next Steps

1. Submit sitemap to Google Search Console
2. Set up Google Analytics 4 with enhanced ecommerce
3. Create affiliate tracking dashboard
4. Monitor Core Web Vitals
5. Build quality backlinks from casino-related sites
6. Regular content updates and SEO audits
