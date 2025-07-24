import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBlogPosts, formatDate, type BlogPost } from "@/lib/blog";
import ReactGA from "react-ga4"; // ✅ GA import

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const blogPosts = await getAllBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-forest-green mb-6">
              Research Insights & Updates
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Exploring the latest insights, research, and updates from our work and beyond.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card
                key={post.slug}
                className={`hover-lift animate-fade-in-up bg-white shadow-soft border-0 overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Featured Image */}
                <div className="aspect-video overflow-hidden">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-forest-green line-clamp-2 hover:text-sage-green transition-colors">
                    {post.title}
                  </CardTitle>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground mb-6 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>

                  {/* ✅ Track blog post clicks */}
                  <Link
                    to={`/blog/${post.slug}`}
                    onClick={() => {
                      ReactGA.event({
                        category: "Blog",
                        action: "Clicked Blog Post",
                        label: post.title,
                      });
                    }}
                  >
                    <Button variant="outline" className="w-full group">
                      Read More
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          CTA Section
          <div className="mt-20 text-center bg-gradient-subtle rounded-2xl p-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-forest-green mb-4">
              Stay Updated on Our Work
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the latest updates and insights delivered straight to your inbox.
            </p>
            <Link
              to="/#contact"
              onClick={() => {
                ReactGA.event({
                  category: "Blog",
                  action: "Clicked Subscribe to Updates",
                });
              }}
            >
              <Button variant="hero" size="lg">
                Subscribe to Updates
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
