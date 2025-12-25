import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Header from "../components/header.jsx"
import { motion } from "framer-motion"
import SideBar from "../components/SideBar"
import Upbutton from "../components/UpButton"
import TableOfContents from "../components/Blog/TableOfContents"
import BlogHeader from "../components/BlogHeader.jsx"

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark
  const { frontmatter, html } = post
  const image = getImage(frontmatter.featuredImage?.childImageSharp?.gatsbyImageData)
  const [theme, setTheme] = useState("dark")
  
  // Initialize theme from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("current-theme")
      let activeTheme;
      
      if (storedTheme) {
        activeTheme = storedTheme;
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        activeTheme = "dark";
      } else {
        activeTheme = "light";
      }
      
      setTheme(activeTheme);
      
      // Apply theme to document
      const root = window.document.documentElement;
      // Remove opposite theme first
      root.classList.remove(activeTheme === "dark" ? "light" : "dark");
      // Add current theme
      root.classList.add(activeTheme);
    }
  }, [])
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  
  // Function to update theme
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("current-theme", newTheme)
      
      // Apply theme to document
      const root = window.document.documentElement
      const isDark = newTheme === "dark"
      
      root.classList.remove(isDark ? "light" : "dark")
      root.classList.add(newTheme)
    }
  }
  
  // Format date
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  // Calculate reading time
  const calculateReadingTime = () => {
    const wordsPerMinute = 200;
    const text = post.html.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  }
  
  const readingTime = calculateReadingTime();
  
  return (
    <div className="bg-slate-50 dark:bg-black-p min-h-screen">
      <Seo 
        title={frontmatter.title}
        description={frontmatter.excerpt || post.excerpt}
        type="article"
        pathname={`/blog/${frontmatter.slug}`}
        image={image ? image.images.fallback.src : ""}
      />
      
      <BlogHeader theme={theme} setTheme={handleThemeChange} />
      <SideBar />
      
      <article className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/blog"
            className="inline-flex items-center text-black-s mb-8 hover:underline"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to all articles
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          <div className="md:w-1/4 order-2 md:order-1">
            <div className="sticky top-24">
              <TableOfContents html={html} />
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-3/4 order-1 md:order-2"
          >
          <h1 className="text-4xl font-bold mb-4 dark:text-white">
            {frontmatter.title}
          </h1>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6 space-x-4">
            <p>{formattedDate}</p>
            <span>•</span>
            <p>{readingTime} min read</p>
          </div>
          
          <div className="mb-6 flex flex-wrap gap-2">
            {frontmatter.tags && frontmatter.tags.map(tag => (
              <Link 
                key={tag} 
                to={`/blog?tag=${tag}`}
                className="text-sm font-medium bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
          
          {image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <GatsbyImage
                image={image}
                alt={frontmatter.title}
                className="w-full"
              />
            </div>
          )}
          
          <div 
            className="prose prose-lg max-w-none text-black-p dark:text-gray-300 dark:prose-invert dark:prose-p:text-gray-300 dark:prose-strong:text-gray-200 dark:prose-li:text-gray-300 dark:prose-li:marker:text-gray-500 prose-headings:text-black-p dark:prose-headings:text-white prose-a:text-black-s"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          
          <div className="mt-10 text-center">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center justify-center py-2 px-4 rounded-md bg-black-s text-white hover:bg-opacity-90 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              Back to top
            </button>
          </div>
          
          {frontmatter.technologies && (
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold mb-3 dark:text-white">
                Technologies mentioned
              </h3>
              <div className="flex flex-wrap gap-2">
                {frontmatter.technologies.map(tech => (
                  <Link 
                    key={tech} 
                    to={`/blog?tech=${tech}`}
                    className="text-sm font-medium bg-black-s text-white px-3 py-1 rounded-full hover:bg-opacity-90 transition-colors"
                  >
                    {tech}
                  </Link>
                ))}
              </div>
            </div>
          )}
          </motion.div>
        </div>
      </article>
      
      <Upbutton scrollToTop={scrollToTop} />
    </div>
  )
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date
        slug
        excerpt
        tags
        technologies
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`

export default BlogPostTemplate