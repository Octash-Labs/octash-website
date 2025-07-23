import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
}

// In a real implementation, you would read from the filesystem
// For now, we'll import the markdown content directly
const blogPosts = [
  {
    slug: 'better-pasture-management',
    markdownContent: `---
title: "How Better Pasture Management Improves Milk Production"
author: "Octash Labs Team"
date: "2025-07-15"
excerpt: "Healthy pastures mean healthier cows and higher milk yields. Here's how simple grazing insights can transform smallholder farms across Nigeria."
image: "/src/assets/dairy-landscape.jpg"
---

# How Better Pasture Management Improves Milk Production

Dairy farming in Nigeria faces unique challenges, from seasonal rainfall patterns to limited access to quality feed. However, one of the most impactful yet underutilized strategies for improving milk production lies right beneath our cows' feet: better pasture management.

## The Foundation of Dairy Success

Quality pasture is the cornerstone of sustainable dairy farming. When cows have access to nutrient-rich grasses, the benefits cascade throughout the entire operation:

- **Increased milk yield**: Well-fed cows produce 20-30% more milk than those on poor pasture
- **Improved milk quality**: Better nutrition leads to higher protein and fat content
- **Reduced feed costs**: Quality pasture can reduce supplemental feed requirements by up to 40%
- **Better cow health**: Proper nutrition strengthens immune systems and reduces veterinary costs

## Understanding Pasture Quality Through Technology

At Octash Labs, we leverage satellite imagery and NDVI (Normalized Difference Vegetation Index) monitoring to help farmers understand their pasture quality in real-time. This technology allows us to:

### Monitor Grass Growth Patterns
NDVI data reveals which areas of a farm are producing the most nutritious grass, enabling farmers to optimize their grazing rotations.

### Predict Seasonal Changes
By analyzing historical data, we can help farmers prepare for dry seasons and plan supplemental feeding strategies.

### Identify Problem Areas
Early detection of overgrazing or soil degradation allows for proactive management before productivity drops.

## Practical Implementation for Nigerian Farmers

Our research with smallholder farmers across Oyo State has revealed several key strategies that dramatically improve outcomes:

### 1. Rotational Grazing
Moving cattle between paddocks every 3-4 days allows grass to recover and maintain optimal nutrition levels.

### 2. Strategic Rest Periods
Allowing paddocks to rest for 21-28 days during the growing season maximizes grass regrowth and root development.

### 3. Water Point Management
Ensuring adequate water access in each paddock prevents overuse of areas near water sources.

### 4. Soil Health Monitoring
Regular soil testing helps farmers understand nutrient deficiencies and plan appropriate interventions.

## The Role of Climate-Smart Practices

Climate change is making pasture management more challenging, but also more critical. Our research focuses on:

- **Drought-resistant grass varieties** that maintain nutrition during dry periods
- **Soil carbon sequestration** techniques that improve both pasture quality and environmental sustainability
- **Water-efficient irrigation** systems for key paddocks during critical periods

## Measuring Success: Real Results

Farmers participating in our pilot programs have seen remarkable improvements:

- Average milk production increased by 35% within six months
- Feed costs reduced by an average of 28%
- Cow body condition scores improved significantly
- Pasture recovery times shortened by 15-20%

## Getting Started: Simple Steps for Immediate Impact

Even without sophisticated technology, farmers can begin improving their pasture management today:

1. **Observe and Record**: Keep simple records of which areas cows prefer and how grass responds to grazing
2. **Start Small**: Begin rotational grazing with just 2-3 paddocks to learn the system
3. **Focus on Water**: Ensure all paddocks have adequate water access
4. **Seek Local Knowledge**: Connect with extension services and successful neighbors

## The Path Forward

Better pasture management isn't just about increasing milk production—it's about building resilient, sustainable farming systems that can thrive in changing conditions. As we continue our research and partnerships across Africa, we're committed to making these technologies and techniques accessible to farmers at every scale.

The future of African dairy farming lies in combining traditional knowledge with modern insights, creating systems that are both productive and sustainable. Through careful pasture management, we can help farmers not just survive, but thrive in an increasingly complex agricultural landscape.

---

*Interested in learning more about how Octash Labs can help improve your farm's pasture management? Contact us at partnerships@octash.co to explore collaboration opportunities.*`
  },
  {
    slug: 'brachiaria-grass-game-changer',
    markdownContent: `---
title: "Brachiaria Grass: A Game-Changer for West African Dairy Farmers"
author: "Octash Research Team"
date: "2025-06-28"
excerpt: "Discover how climate-resilient Brachiaria grass improves feed quality, reduces costs, and helps farmers keep their cows productive even during dry seasons."
image: "/src/assets/hero-farming.jpg"
---

# Brachiaria Grass: A Game-Changer for West African Dairy Farmers

In the challenging landscape of West African dairy farming, where unpredictable rainfall and extended dry seasons threaten livestock productivity, one grass species is emerging as a revolutionary solution: Brachiaria. This hardy, nutritious forage is transforming how farmers approach pasture management and cow nutrition across the region.

## What Makes Brachiaria Special?

Brachiaria grass (Brachiaria spp.) is a tropical forage that has proven exceptionally well-suited to West African conditions. Unlike many traditional grasses, Brachiaria offers a unique combination of benefits that address the specific challenges faced by local dairy farmers.

### Climate Resilience
- **Drought tolerance**: Can survive extended dry periods that would kill other grass species
- **Heat resistance**: Thrives in high temperatures common across West Africa
- **Rapid recovery**: Bounces back quickly after the first rains
- **Extended growing season**: Continues producing during shoulder seasons

### Nutritional Excellence
- **High protein content**: Contains 12-15% crude protein, significantly higher than native grasses
- **Better digestibility**: Cows can extract more nutrients from each bite
- **Consistent quality**: Maintains nutritional value longer than traditional forages
- **Mineral content**: Rich in essential minerals like calcium and phosphorus

## Research-Backed Results

Our collaborative research with farming communities across Nigeria, Ghana, and Burkina Faso has documented impressive results from Brachiaria adoption:

### Milk Production Improvements
- **43% increase** in daily milk yield within 8 weeks of switching to Brachiaria-dominant pastures
- **Extended lactation periods** due to improved cow nutrition
- **Higher milk fat content**, improving both quantity and quality

### Economic Benefits
- **Reduced feed costs** by 35-50% during dry seasons
- **Lower veterinary expenses** due to improved cow health
- **Increased farm income** from higher milk production and reduced expenses

### Environmental Impact
- **Soil improvement**: Deep root system enhances soil structure and water retention
- **Carbon sequestration**: Stores more carbon than many traditional grasses
- **Erosion control**: Excellent ground cover reduces soil erosion

---

*Want to learn more about implementing Brachiaria on your farm? Contact our research team at partnerships@octash.co for technical guidance and support.*`
  }
];

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return blogPosts.map(post => {
    const { data, content } = matter(post.markdownContent);
    return {
      slug: post.slug,
      title: data.title,
      author: data.author,
      date: data.date,
      excerpt: data.excerpt,
      image: data.image,
      content: content
    };
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return null;

  const { data, content } = matter(post.markdownContent);
  const htmlContent = await marked(content);

  return {
    slug: post.slug,
    title: data.title,
    author: data.author,
    date: data.date,
    excerpt: data.excerpt,
    image: data.image,
    content: htmlContent
  };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}