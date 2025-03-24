import React from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"

const TableOfContents = ({ html }) => {
  // Extract headings from HTML
  const extractHeadings = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      .filter(heading => heading.id) // Only include headings with IDs
      .map(heading => ({
        id: heading.id,
        text: heading.textContent,
        level: parseInt(heading.tagName.substring(1), 10)
      }))
      .filter(heading => heading.level <= 3); // Only include h1, h2, h3
    
    return headings;
  };

  const headings = extractHeadings();
  
  if (headings.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-black-p-l rounded-lg p-4 shadow-md mb-8 sticky top-24"
    >
      <h3 className="text-lg font-bold mb-3 text-black-p dark:text-white">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li 
            key={index} 
            className={`${
              heading.level === 1 ? 'ml-0' : 
              heading.level === 2 ? 'ml-4' : 
              heading.level === 3 ? 'ml-8' : 'ml-0'
            }`}
          >
            <a
              href={`#${heading.id}`}
              className="text-black-s hover:underline transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TableOfContents;