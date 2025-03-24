import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { motion } from "framer-motion"

const BlogCard = ({ post, setTagFilter, setTechFilter }) => {
  const { frontmatter, excerpt } = post
  const image = getImage(frontmatter.featuredImage?.childImageSharp?.gatsbyImageData)
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-black-p-l rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row hover:shadow-xl transition-shadow"
    >
      <Link to={`/blog/${frontmatter.slug}`} className="block md:w-1/4 h-48 md:h-auto overflow-hidden">
        {image ? (
          <GatsbyImage
            image={image}
            alt={frontmatter.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </Link>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags && frontmatter.tags.map(tag => (
              <button 
                key={tag} 
                className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setTagFilter && setTagFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        
        <h2 className="text-2xl font-bold mb-3">
          <Link to={`/blog/${frontmatter.slug}`} className="text-black-p dark:text-white hover:text-black-s dark:hover:text-black-s transition-colors">
            {frontmatter.title}
          </Link>
        </h2>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">
          {frontmatter.excerpt || excerpt}
        </p>
        
        <div className="flex justify-between items-end mt-auto">
          <div className="flex flex-wrap gap-2">
            {frontmatter.technologies && frontmatter.technologies.map(tech => (
              <button 
                key={tech} 
                className="text-xs font-medium bg-black-s bg-opacity-10 dark:bg-opacity-20 text-black-s px-2 py-1 rounded cursor-pointer hover:bg-opacity-20 dark:hover:bg-opacity-30"
                onClick={() => setTechFilter && setTechFilter(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
          
          <Link 
            to={`/blog/${frontmatter.slug}`}
            className="text-black-s font-medium hover:underline inline-flex items-center"
          >
            Read more
            <svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default BlogCard