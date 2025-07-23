import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

// Extended blog data with full content
const getBlogData = () => {
  const featuredPost = {
    id: 1,
    title: "The Future of React: Server Components and Concurrent Features",
    excerpt: `Explore how React's latest innovations are revolutionizing web development. From Server Components to Concurrent Rendering, discover the tools that will shape the next generation of user experiences.`,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    category: "Web Development",
    categoryIcon: "Code",
    date: "July 14, 2025",
    readTime: 8,
    views: "5.2K",
    likes: "234",
    author: {
      name: "Sarah Chen",
      role: "Senior React Developer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Sarah is a passionate React developer with 8+ years of experience building scalable web applications. She's a core contributor to several open-source projects and loves sharing knowledge with the developer community.",
    },
    tags: [
      "React",
      "Server Components",
      "Concurrent Features",
      "Web Development",
      "JavaScript",
    ],
    content: `
      <h2>Introduction</h2>
      <p>React has been at the forefront of web development innovation for nearly a decade, and its latest features are set to revolutionize how we build user interfaces. In this comprehensive guide, we'll explore React's Server Components and Concurrent Features, two groundbreaking additions that promise to enhance performance, user experience, and developer productivity.</p>
      
      <h2>Understanding Server Components</h2>
      <p>Server Components represent a paradigm shift in how we think about React applications. Unlike traditional client-side components, Server Components run on the server and send their rendered output to the client. This approach offers several key advantages:</p>
      
      <ul>
        <li><strong>Reduced Bundle Size:</strong> Server Components don't ship JavaScript to the client, significantly reducing bundle sizes</li>
        <li><strong>Direct Database Access:</strong> Components can directly access databases and APIs without exposing sensitive information</li>
        <li><strong>Improved Performance:</strong> Faster initial page loads and better Core Web Vitals scores</li>
        <li><strong>SEO Benefits:</strong> Content is rendered on the server, making it immediately available to search engines</li>
      </ul>
      
      <h3>Implementing Server Components</h3>
      <p>Here's a simple example of a Server Component that fetches data directly from a database:</p>
      
      <pre><code>// app/posts/page.js (Server Component)
async function PostsPage() {
  const posts = await db.posts.findMany();
  
  return (
    &lt;div&gt;
      &lt;h1&gt;Latest Posts&lt;/h1&gt;
      {posts.map(post =&gt; (
        &lt;PostCard key={post.id} post={post} /&gt;
      ))}
    &lt;/div&gt;
  );
}</code></pre>
      
      <h2>Concurrent Features: The Power of Non-Blocking Rendering</h2>
      <p>React's Concurrent Features enable the framework to work on multiple tasks simultaneously, prioritizing urgent updates while keeping the UI responsive. Key features include:</p>
      
      <h3>Suspense for Data Fetching</h3>
      <p>Suspense allows components to "wait" for something before rendering, providing a smooth loading experience:</p>
      
      <pre><code>function ProfilePage() {
  return (
    &lt;Suspense fallback={&lt;ProfileSkeleton /&gt;}&gt;
      &lt;ProfileDetails /&gt;
      &lt;Suspense fallback={&lt;PostsSkeleton /&gt;}&gt;
        &lt;ProfilePosts /&gt;
      &lt;/Suspense&gt;
    &lt;/Suspense&gt;
  );
}</code></pre>
      
      <h3>Automatic Batching</h3>
      <p>React 18 automatically batches multiple state updates, reducing unnecessary re-renders and improving performance:</p>
      
      <pre><code>function handleClick() {
  setCount(c =&gt; c + 1);
  setFlag(f =&gt; !f);
  // React will batch these updates automatically
}</code></pre>
      
      <h2>Best Practices and Implementation Tips</h2>
      <p>When implementing these new features, consider the following best practices:</p>
      
      <ol>
        <li><strong>Start Small:</strong> Begin by converting leaf components to Server Components</li>
        <li><strong>Understand the Boundary:</strong> Clearly distinguish between server and client components</li>
        <li><strong>Optimize Data Fetching:</strong> Use Suspense boundaries strategically to improve perceived performance</li>
        <li><strong>Monitor Performance:</strong> Use React DevTools to track concurrent features impact</li>
      </ol>
      
      <h2>Real-World Performance Impact</h2>
      <p>In our recent project migration, we observed:</p>
      <ul>
        <li>40% reduction in initial bundle size</li>
        <li>25% improvement in First Contentful Paint (FCP)</li>
        <li>60% faster time-to-interactive for data-heavy pages</li>
        <li>Improved user engagement metrics across all devices</li>
      </ul>
      
      <h2>Looking Ahead</h2>
      <p>The future of React is incredibly exciting. With Server Components and Concurrent Features, we're moving toward a more performant, user-friendly web. These features represent just the beginning of React's evolution, with more innovations on the horizon.</p>
      
      <p>As developers, embracing these new paradigms will be crucial for building the next generation of web applications. Start experimenting with these features today, and you'll be well-prepared for the future of React development.</p>
    `,
  };

  const blogPosts = [
    {
      id: 2,
      title: "Building Scalable E-commerce Platforms with Next.js 14",
      excerpt:
        "Learn how to leverage Next.js 14's app router and server actions to create high-performance e-commerce solutions that scale with your business.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?w=1200&h=600&fit=crop",
      category: "E-commerce Trends",
      // categoryIcon: "ShoppingCart",
      date: "July 12, 2025",
      // readTime: 6,
      // views: "2.1K",
      // likes: "89",
      // author: {
      //   name: "Michael Rodriguez",
      //   role: "Full Stack Developer",
      //   avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      //   bio: "Michael specializes in building scalable e-commerce solutions with modern web technologies. He has helped numerous startups and enterprises optimize their online presence.",
      // },
      tags: ["Next.js", "E-commerce", "React", "Performance", "Scalability"],
      content: `
        <h2>Introduction to Next.js 14</h2>
        <p>Next.js 14 introduces revolutionary features that make building e-commerce platforms more efficient and performant than ever before. In this comprehensive guide, we'll explore how to leverage these new capabilities to create scalable online stores.</p>
        
        <h2>App Router: The New Foundation</h2>
        <p>The App Router in Next.js 14 provides a more intuitive and powerful way to structure your e-commerce application:</p>
        
        <pre><code>// app/products/[id]/page.js
export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  
  return (
    &lt;div&gt;
      &lt;ProductDetails product={product} /&gt;
      &lt;RelatedProducts categoryId={product.categoryId} /&gt;
    &lt;/div&gt;
  );
}</code></pre>
        
        <h2>Server Actions for E-commerce</h2>
        <p>Server Actions simplify form handling and data mutations in e-commerce applications:</p>
        
        <pre><code>// app/cart/actions.js
'use server'

export async function addToCart(productId, quantity) {
  const session = await getSession();
  await db.cartItems.create({
    userId: session.userId,
    productId,
    quantity
  });
  revalidatePath('/cart');
}</code></pre>
        
        <h2>Performance Optimization Strategies</h2>
        <p>Key strategies for optimizing e-commerce performance:</p>
        <ul>
          <li>Image optimization with Next.js Image component</li>
          <li>Strategic use of static and dynamic rendering</li>
          <li>Efficient data fetching patterns</li>
          <li>Caching strategies for product catalogs</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Next.js 14 provides all the tools needed to build world-class e-commerce platforms. By following these patterns and best practices, you can create fast, scalable, and maintainable online stores that delight both users and developers.</p>
      `,
    },
    {
      id: 3,
      title: "Mobile-First Design: Creating Responsive Experiences",
      excerpt:
        "Discover the principles and techniques for designing mobile-first applications that provide seamless experiences across all devices.",
      image:
        "https://images.pixabay.com/photo/2016/11/29/06/15/mobile-phone-1867510_1280.jpg?w=1200&h=600&fit=crop",
      category: "Mobile Technology",
      categoryIcon: "Smartphone",
      date: "July 10, 2025",
      readTime: 5,
      views: "1.8K",
      likes: "67",
      author: {
        name: "Emily Johnson",
        role: "UX/UI Designer",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        bio: "Emily is a passionate UX/UI designer with expertise in mobile-first design principles. She has designed award-winning mobile applications for various industries.",
      },
      tags: ["Mobile Design", "Responsive", "UX", "UI", "CSS"],
      content: `
        <h2>The Mobile-First Mindset</h2>
        <p>Mobile-first design isn't just about making websites work on phones—it's a fundamental shift in how we approach web design. By starting with the most constrained environment, we create better experiences for all users.</p>
        
        <h2>Core Principles</h2>
        <p>Essential principles for mobile-first design:</p>
        <ul>
          <li><strong>Progressive Enhancement:</strong> Start with core functionality and enhance for larger screens</li>
          <li><strong>Touch-First Interactions:</strong> Design for fingers, not cursors</li>
          <li><strong>Performance Priority:</strong> Optimize for slower networks and limited processing power</li>
          <li><strong>Content Hierarchy:</strong> Prioritize the most important content and actions</li>
        </ul>
        
        <h2>Implementation Strategies</h2>
        <p>Practical approaches to mobile-first development:</p>
        
        <pre><code>/* Mobile-first CSS */
.container {
  padding: 1rem;
  max-width: 100%;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}</code></pre>
        
        <h2>Testing and Optimization</h2>
        <p>Ensure your mobile-first designs work across all devices with comprehensive testing strategies and performance optimization techniques.</p>
      `,
    },
    // Add more blog posts with full content...
  ];

  return [featuredPost, ...blogPosts];
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [animatedElements, setAnimatedElements] = useState(new Set());

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);

    setTimeout(() => {
      const allBlogs = getBlogData();
      const currentBlog = allBlogs.find((b) => b.id === parseInt(id));

      if (currentBlog) {
        setBlog(currentBlog);
        // Get related blogs from same category
        const related = allBlogs
          .filter(
            (b) => b.id !== parseInt(id) && b.category === currentBlog.category
          )
          .slice(0, 3);
        setRelatedBlogs(related);
      }

      setIsLoading(false);
    }, 800);
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [blog]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Icon
            name="FileX"
            size={48}
            className="text-slate-400 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Article Not Found
          </h2>
          <p className="text-slate-600 mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Button
            variant="default"
            onClick={() => navigate("/blog")}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="absolute top-20 left-1/4 w-4 h-4 bg-primary/20 rounded-full geometric-float"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-secondary/20 rounded-full geometric-float animation-delay-200"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div
            data-animate
            id="breadcrumb"
            className={`flex items-center space-x-2 text-sm text-slate-600 mb-6 transition-all duration-700 ${
              animatedElements.has("breadcrumb")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              to="/blog"
              className="hover:text-primary transition-colors duration-200"
            >
              Blog
            </Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-slate-400">{blog.category}</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-slate-400 truncate">{blog.title}</span>
          </div>

          {/* Article Header */}
          <div
            data-animate
            id="article-header"
            className={`transition-all duration-700 delay-100 ${
              animatedElements.has("article-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Category Badge */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                {/* <Icon name={blog.categoryIcon} size={14} /> */}
                <span>{blog.category}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-8">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{blog.date}</span>
              </div>
              <div>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-200"
                >
                  <Icon name="Share2" size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div
          data-animate
          id="featured-image"
          className={`transition-all duration-700 delay-200 ${
            animatedElements.has("featured-image")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1  gap-12">
          {/* Main Content */}
          <div>
            <div
              data-animate
              id="article-content"
              className={`prose prose-lg prose-slate max-w-none transition-all duration-700 delay-300 ${
                animatedElements.has("article-content")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="prose-headings:text-slate-800 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-slate-100"
              />
            </div>

            {/* Tags */}
            <div
              data-animate
              id="tags"
              className={`mt-12 pt-8 border-t border-slate-200 transition-all duration-700 delay-400 ${
                animatedElements.has("tags")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              data-animate
              id="related-header"
              className={`text-center mb-12 transition-all duration-700 delay-700 ${
                animatedElements.has("related-header")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Related <span className="brand-gradient-text">Articles</span>
              </h2>
              <p className="text-xl text-slate-600">
                Continue exploring {blog.category.toLowerCase()} topics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog, index) => (
                <div
                  key={relatedBlog.id}
                  data-animate
                  id={`related-${index}`}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/50 hover-lift cursor-pointer transition-all duration-700 ${
                    animatedElements.has(`related-${index}`)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                  onClick={() => navigate(`/blogs/${relatedBlog.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center space-x-1 px-2 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs rounded-full">
                        {/* <Icon name={relatedBlog.categoryIcon} size={12} /> */}
                        <span>{relatedBlog.category}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{relatedBlog.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;
