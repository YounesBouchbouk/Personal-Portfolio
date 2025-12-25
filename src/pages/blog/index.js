import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import Seo from "../../components/seo"
import { motion } from "framer-motion"
import SideBar from "../../components/SideBar"
import Upbutton from "../../components/UpButton"
import BlogCard from "../../components/Blog/BlogCard"
import BlogHeader from "../../components/BlogHeader.jsx"

const BlogPage = ({ data }) => {
  const allPosts = data.allMarkdownRemark.edges
  const [filteredPosts, setFilteredPosts] = useState(allPosts)
  const [activeTag, setActiveTag] = useState("all")
  const [activeTech, setActiveTech] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
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
  
  // Extract all unique tags and technologies
  const allTags = ["all"]
  const allTechnologies = ["all"]
  
  allPosts.forEach(({ node }) => {
    const postTags = node.frontmatter.tags || []
    const postTechnologies = node.frontmatter.technologies || []
    
    postTags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag)
      }
    })
    
    postTechnologies.forEach(tech => {
      if (!allTechnologies.includes(tech)) {
        allTechnologies.push(tech)
      }
    })
  })
  
  // Filter posts whenever filters change
  useEffect(() => {
    let result = allPosts
    
    // Filter by tag
    if (activeTag !== "all") {
      result = result.filter(({ node }) => 
        (node.frontmatter.tags || []).includes(activeTag)
      )
    }
    
    // Filter by technology
    if (activeTech !== "all") {
      result = result.filter(({ node }) => 
        (node.frontmatter.technologies || []).includes(activeTech)
      )
    }
    
    // Filter by search term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase()
      result = result.filter(({ node }) => 
        node.frontmatter.title.toLowerCase().includes(term) ||
        node.frontmatter.excerpt.toLowerCase().includes(term) ||
        node.excerpt.toLowerCase().includes(term)
      )
    }
    
    setFilteredPosts(result)
  }, [activeTag, activeTech, searchTerm, allPosts])
  
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
  
  return (
    <div className="bg-slate-50 dark:bg-black-p min-h-screen">
      <Seo 
        title="Blog"
        description="Articles about web development, software engineering, and technology by Younes Bouchbouk"
        type="website"
        pathname="/blog/"
      />
      
      <BlogHeader theme={theme} setTheme={handleThemeChange} />
      <SideBar  />
      
      <div className="container mx-auto px-4 py-24">
        
        
        {/* Search input */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black-p-l text-black dark:text-white"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                aria-label="Clear search"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          {/* Tag filters */}
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">Filter by Tag</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTag === tag 
                      ? "bg-black-s text-white" 
                      : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Technology filters */}
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">Filter by Technology</h2>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map(tech => (
                <button
                  key={tech}
                  onClick={() => setActiveTech(tech)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTech === tech 
                      ? "bg-black-s text-white" 
                      : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Active filters display */}
        {(activeTag !== "all" || activeTech !== "all" || searchTerm) && (
          <div className="mb-6 p-3 bg-gray-100 dark:bg-black-p-l rounded-lg max-w-4xl mx-auto">
            <h3 className="font-medium dark:text-white">Active filters:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {activeTag !== "all" && (
                <span className="px-3 py-1 bg-black-s text-white rounded-md text-sm flex items-center">
                  Tag: {activeTag}
                  <button 
                    onClick={() => setActiveTag("all")}
                    className="ml-2 text-xs"
                    aria-label="Remove tag filter"
                  >
                    ✕
                  </button>
                </span>
              )}
              
              {activeTech !== "all" && (
                <span className="px-3 py-1 bg-black-s text-white rounded-md text-sm flex items-center">
                  Tech: {activeTech}
                  <button 
                    onClick={() => setActiveTech("all")}
                    className="ml-2 text-xs"
                    aria-label="Remove technology filter"
                  >
                    ✕
                  </button>
                </span>
              )}
              
              {searchTerm && (
                <span className="px-3 py-1 bg-black-s text-white rounded-md text-sm flex items-center">
                  Search: {searchTerm}
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="ml-2 text-xs"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Results count */}
        <p className="mb-6 dark:text-white text-center max-w-4xl mx-auto">
          Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
        </p>
        
        {/* Blog posts list */}
        {filteredPosts.length > 0 ? (
          <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
            {filteredPosts.map(({ node }) => (
              <BlogCard 
                key={node.id} 
                post={node} 
                setTagFilter={setActiveTag} 
                setTechFilter={setActiveTech} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
      
      <Upbutton scrollToTop={scrollToTop} />
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
    ) {
      edges {
        node {
          id
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
                  width: 600
                  height: 300
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                )
              }
            }
          }
        }
      }
    }
  }
`

export default BlogPage