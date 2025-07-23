# Setup Instructions for Octash Labs Website

## 📧 EmailJS Configuration

To make the contact form functional, you need to set up EmailJS:

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)

### 2. Set Up Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

### 3. Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: {{subject}}

Dear Octash Labs Team,

You have received a new partnership inquiry:

Organization: {{organization}}
Contact Email: {{contact_email}}

Partnership Interest:
{{partnership_interest}}

Message:
{{message}}

Best regards,
EmailJS Contact Form
```

4. Save the template and note down your **Template ID**

### 4. Get Public Key
1. Go to "Account" → "General" in EmailJS dashboard
2. Copy your **Public Key**

### 5. Update Configuration
Edit `src/lib/emailjs.ts` and replace:
- `your_service_id` with your Service ID
- `your_template_id` with your Template ID  
- `your_public_key` with your Public Key

```typescript
const SERVICE_ID = 'service_abc123'; // Your actual service ID
const TEMPLATE_ID = 'template_xyz789'; // Your actual template ID
const PUBLIC_KEY = 'user_def456'; // Your actual public key
```

### 6. Initialize EmailJS (Optional)
In `src/main.tsx`, add the initialization:

```typescript
import { initializeEmailJS } from './lib/emailjs';

// Initialize EmailJS when app starts
initializeEmailJS();
```

## 📝 Managing Blog Posts

### Option 1: Markdown Files (Current Implementation)
Blog posts are stored in `src/content/blogs/` as markdown files.

#### Adding New Blog Posts:
1. Create a new `.md` file in `src/content/blogs/`
2. Use this front matter format:

```markdown
---
title: "Your Blog Post Title"
author: "Author Name"
date: "2025-01-23"
excerpt: "Brief description of the post..."
image: "/src/assets/your-image.jpg"
---

# Your Blog Post Title

Your content here...
```

3. Add the post to `src/lib/blog.ts` in the `blogPosts` array:

```typescript
{
  slug: 'your-post-slug',
  markdownContent: `[paste your markdown content here]`
}
```

#### Blog Images:
- Store images in `src/assets/`
- Reference them as `/src/assets/image-name.jpg` in the front matter
- Use appropriate alt text for accessibility

### Option 2: Notion Integration (Future Enhancement)
To use Notion as a CMS:

1. Install Notion SDK: `npm install @notionhq/client`
2. Create a Notion database with columns: Title, Author, Date, Excerpt, Image, Content
3. Get a Notion integration token
4. Replace the blog.ts implementation with Notion API calls

## 🔒 Privacy Policy Updates

The privacy policy is located at `src/pages/PrivacyPolicy.tsx`. Update it as needed for:
- Changes in data collection practices
- New features or services
- Legal requirement updates

## 🚀 Deployment Checklist

Before deploying:

1. ✅ Configure EmailJS with your credentials
2. ✅ Test contact form submission
3. ✅ Verify blog posts display correctly
4. ✅ Check all navigation links work
5. ✅ Test responsive design on mobile
6. ✅ Update privacy policy if needed
7. ✅ Verify footer copyright year updates automatically

## 📱 Additional Features

### Analytics (Optional)
Consider adding Google Analytics or similar:
1. Add tracking script to `index.html`
2. Track contact form submissions and blog engagement

### SEO Optimization
- Blog posts include proper meta tags
- Images have alt text
- URLs are SEO-friendly
- Site includes sitemap (consider adding)

### Performance
- Images are optimized
- Lazy loading implemented for blog images
- CSS is minified in production build

## 🆘 Troubleshooting

### Contact Form Issues:
- Check EmailJS configuration in browser console
- Verify service, template, and public key are correct
- Check EmailJS dashboard for delivery status

### Blog Not Loading:
- Verify markdown content is properly formatted
- Check for syntax errors in front matter
- Ensure images exist in the specified paths

### Routing Issues:
- Confirm all routes are added to `App.tsx`
- Check for typos in route paths
- Verify Link components use correct paths

Need help? Contact the development team or refer to the component documentation.