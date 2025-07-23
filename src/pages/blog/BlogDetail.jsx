import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { blogApi } from "../../utils/blogApi";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedElements, setAnimatedElements] = useState(new Set());

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    (async () => {
      try {
        const blogData = await blogApi.getById(id);
        setBlog(blogData);
        // Fetch related blogs (same category, exclude current)
        const allBlogs = await blogApi.getAll();
        const related = allBlogs
          .filter((b) => b._id !== id && b.category === blogData.category)
          .slice(0, 3);
        setRelatedBlogs(related);
      } catch (err) {
        setError("Blog not found or failed to fetch.");
      } finally {
        setIsLoading(false);
      }
    })();
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

  // Debug output for blog and error
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileX" size={48} className="text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Article Not Found</h2>
          <p className="text-slate-600 mb-6">{error || "The article you're looking for doesn't exist."}</p>
          <pre className="bg-slate-100 text-xs text-left p-4 rounded max-w-xl mx-auto overflow-x-auto mb-4">{JSON.stringify(blog, null, 2)}</pre>
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

  // Show warning if required fields are missing
  if (!blog.content || !blog.title) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertTriangle" size={48} className="text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Blog Data Incomplete</h2>
          <p className="text-slate-600 mb-6">This blog is missing required fields (content or title).</p>
          <pre className="bg-slate-100 text-xs text-left p-4 rounded max-w-xl mx-auto overflow-x-auto mb-4">{JSON.stringify(blog, null, 2)}</pre>
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
      navigator.clipboard.writeText(window.location.href);
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
            <Link to="/blog" className="hover:text-primary transition-colors duration-200">Blog</Link>
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
                <span>{blog.category}</span>
              </span>
            </div>
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">{blog.title}</h1>
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-8">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{blog.publishDate || blog.date}</span>
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
            {blog.tags && blog.tags.length > 0 && (
              <div
                data-animate
                id="tags"
                className={`mt-12 pt-8 border-t border-slate-200 transition-all duration-700 delay-400 ${
                  animatedElements.has("tags")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Tags</h3>
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
            )}
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
                Continue exploring {blog.category?.toLowerCase()} topics
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog, index) => (
                <div
                  key={relatedBlog._id || relatedBlog.id}
                  data-animate
                  id={`related-${index}`}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/50 hover-lift cursor-pointer transition-all duration-700 ${
                    animatedElements.has(`related-${index}`)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                  onClick={() => navigate(`/blogs/${relatedBlog._id || relatedBlog.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center space-x-1 px-2 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs rounded-full">
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
                      <span>{relatedBlog.publishDate || relatedBlog.date}</span>
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
