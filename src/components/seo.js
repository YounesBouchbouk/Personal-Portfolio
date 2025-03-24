/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, lang, meta, title, image, type, pathname }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            image
            twitterUsername
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const metaImage = image || site.siteMetadata.image
  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : site.siteMetadata.siteUrl
  const contentType = type || 'website'

  // Person schema for portfolio
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Younes Bouchbouk",
    "url": site.siteMetadata.siteUrl,
    "image": `${site.siteMetadata.siteUrl}${metaImage}`,
    "jobTitle": "Full Stack Developer",
    "description": "Software Engineer and Full Stack Developer specializing in JavaScript, React, Next.js, Golang, and more.",
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Institut National des postes et télécommunications",
        "sameAs": "https://www.inpt.ac.ma/"
      }
    ],
    "knowsAbout": [
      "JavaScript",
      "React.js",
      "Next.js",
      "Golang",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "AWS",
      "TailwindCSS"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/younes-bouchbouk-71a355217/",
      "https://github.com/YounesBouchbouk",
      "https://twitter.com/BouchboukYounes",
      "https://www.facebook.com/younss.bouchbouk.3/"
    ]
  }
  
  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": site.siteMetadata.siteUrl,
    "name": defaultTitle,
    "description": site.siteMetadata.description,
    "author": {
      "@type": "Person",
      "name": "Younes Bouchbouk"
    }
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={title === defaultTitle ? title : `%s | ${defaultTitle}`}
      link={[
        { rel: "canonical", href: canonical },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: `Younes Bouchbouk, Developer, Full Stack, JavaScript, React, Golang, NextJS, Portfolio, Software Engineer, Web Developer, Frontend Developer, Backend Developer`,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: contentType,
        },
        {
          property: `og:url`,
          content: canonical,
        },
        {
          property: `og:image`,
          content: `${site.siteMetadata.siteUrl}${metaImage}`,
        },
        {
          property: `og:image:alt`,
          content: `Younes Bouchbouk Profile Image`,
        },
        {
          property: `og:site_name`,
          content: defaultTitle,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.twitterUsername || "",
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: `${site.siteMetadata.siteUrl}${metaImage}`,
        },
        // Additional meta tags for better SEO
        {
          name: "application-name",
          content: "Younes Bouchbouk Portfolio"
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes"
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "default"
        },
        {
          name: "apple-mobile-web-app-title",
          content: "Younes Bouchbouk"
        },
        {
          name: "theme-color",
          content: "#3069ba"
        }
      ].concat(meta)}
    >
      {/* Add structured data schema */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  image: null,
  pathname: null,
  type: `website`,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  pathname: PropTypes.string,
  type: PropTypes.string,
}

export default Seo