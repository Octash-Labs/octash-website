// import matter from "gray-matter";
// import { marked } from "marked";

// // Dynamically import all markdown files from content/blogs
// const markdownFiles = import.meta.glob("../content/blogs/*.md", { as: "raw" });

// export interface BlogPost {
//   slug: string;
//   title: string;
//   author: string;
//   date: string;
//   excerpt: string;
//   image: string;
//   content: string;
// }

// // Get all blog posts
// export async function getAllBlogPosts(): Promise<BlogPost[]> {
//   const posts: BlogPost[] = [];

//   // ✅ Add this debug log
//   console.log("📄 Detected markdown files:", Object.keys(markdownFiles));

//   for (const path in markdownFiles) {
//     const rawContent = await markdownFiles[path]();
//     const { data, content } = matter(rawContent);

//     const slug = path.split("/").pop()?.replace(".md", "") || "";

//     posts.push({
//       slug,
//       title: data.title || slug,
//       author: data.author || "Unknown",
//       date: data.date || new Date().toISOString(),
//       excerpt: data.excerpt || "",
//       image: data.image || "",
//       content: content,
//     });
//   }

//   // Sort by date (newest first)
//   return posts.sort(
//     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//   );
// }

// // Get a single blog post and convert markdown → HTML
// export async function getBlogPost(slug: string): Promise<BlogPost | null> {
//   const posts = await getAllBlogPosts();
//   const post = posts.find((p) => p.slug === slug);
//   if (!post) return null;

//   const htmlContent = await marked(post.content);

//   return {
//     ...post,
//     content: htmlContent,
//   };
// }

// export function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

import { marked } from "marked";

// ✅ Force raw markdown text
const markdownFiles = import.meta.glob("../content/blogs/*.md", { as: "raw", eager: true });

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
}

// ✅ Simple YAML frontmatter parser
function parseFrontmatter(raw: string) {
  const frontmatterMatch = /^---\n([\s\S]+?)\n---/.exec(raw);
  let data: any = {};
  let content = raw;

  if (frontmatterMatch) {
    const yamlText = frontmatterMatch[1];
    content = raw.replace(frontmatterMatch[0], "").trim();

    yamlText.split("\n").forEach((line) => {
      const [key, ...rest] = line.split(":");
      data[key.trim()] = rest.join(":").trim().replace(/"/g, "");
    });
  }

  return { data, content };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  for (const path in markdownFiles) {
    const rawContent = markdownFiles[path] as string;
    const { data, content } = parseFrontmatter(rawContent);

    const slug = path.split("/").pop()?.replace(".md", "") || "";

    posts.push({
      slug,
      title: data.title || slug,
      author: data.author || "Unknown",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      image: data.image || "",
      content,
    });
  }

  // Sort by date (newest first)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  const htmlContent = await marked(post.content);
  return { ...post, content: htmlContent };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}