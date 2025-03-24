import React, { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import SectionTitle from "./SectionTitle"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required")
      return false
    }
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Email is invalid")
      return false
    }
    if (!formData.message.trim()) {
      setError("Message is required")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    
    if (!validateForm()) return

    setLoading(true)
    
    try {
      // Create a mailto URL with the form data
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      
      // Open the user's email client
      window.open(`mailto:younesbouchbouk.py@gmail.com?subject=${subject}&body=${body}`)
      
      // Reset the form and show success message
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (error) {
      setLoading(false)
      setError("Failed to send message. Please try again or email me directly.")
    }
  }

  return (
    <div className="w-full py-16" id="contact">
      <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8">
        <SectionTitle label={"Get In Touch"} />

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="w-full shadow-lg rounded-lg p-8 sm:p-10 bg-white dark:bg-black-p-l mt-8"
        >
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                Thank you!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your message has been received. I'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 dark:bg-red-900 dark:border-red-600 dark:text-red-100">
                  {error}
                </div>
              )}
              
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Your name"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Your email"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-white h-32 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Your message"
                ></textarea>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`font-semibold text-white py-3 px-8 rounded-md transition-all duration-300 ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </motion.div>
            </form>
          )}
        </motion.div>
        
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p>Prefer direct email? Reach me at:</p>
          <a 
            href="mailto:younesbouchbouk.py@gmail.com" 
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            younesbouchbouk.py@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact