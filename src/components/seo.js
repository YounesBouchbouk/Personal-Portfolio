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

function Seo({ description, lang, meta, title, image, type, pathname, datePublished, dateModified, noindex }) {
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
    "jobTitle": "Software Engineer (Go/React)",
    "description": "Software Engineer specializing in Go microservices (DDD/Clean Architecture), gRPC, Kubernetes, Datadog observability, and React/Next.js.",
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Institut National des postes et télécommunications",
        "sameAs": "https://www.inpt.ac.ma/"
      }
    ],
    "knowsAbout": [
      "Microservices",
      "Clean Architecture",
      "Domain-Driven Design",
      "gRPC",
      "Observability",
      "Datadog",
      "GitLab",
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
      "TailwindCSS",
      "Three.js",
      "TDD"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/younes-bouchbouk-71a355217/",
      "https://github.com/YounesBouchbouk",
      "https://personal-portfolio-six-lake.vercel.app/",
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

  const isArticle = contentType === 'article'

  // Article schema (blog posts) — enables rich results with author/date
  const articleSchema = isArticle
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
        "headline": title,
        "description": metaDescription,
        "image": `${site.siteMetadata.siteUrl}${metaImage}`,
        "url": canonical,
        ...(datePublished ? { "datePublished": new Date(datePublished).toISOString() } : {}),
        "dateModified": new Date(dateModified || datePublished || Date.now()).toISOString(),
        "author": {
          "@type": "Person",
          "name": "Younes Bouchbouk",
          "url": site.siteMetadata.siteUrl
        },
        "publisher": {
          "@type": "Person",
          "name": "Younes Bouchbouk"
        }
      }
    : null

  // Breadcrumb schema for blog posts (Home › Blog › Post)
  const breadcrumbSchema = isArticle
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": site.siteMetadata.siteUrl },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${site.siteMetadata.siteUrl}/blog` },
          { "@type": "ListItem", "position": 3, "name": title, "item": canonical }
        ]
      }
    : null

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
          name: `google-site-verification`,
          content: `unhJJ2nLjlYyQVbv-85GbaTaE-aVzKak2s85Vef68Cc`,
        },
        {
          name: `robots`,
          content: noindex ? `noindex, nofollow` : `index, follow`,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: `Younes Bouchbouk, Software Engineer, Go, Golang, Microservices, gRPC, Kubernetes, Datadog, Clean Architecture, DDD, React, Next.js, Backend Engineer, Full Stack`,
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
          property: `og:locale`,
          content: `en_US`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata?.twitterUsername || "",
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
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
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
  datePublished: null,
  dateModified: null,
  noindex: false,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  pathname: PropTypes.string,
  type: PropTypes.string,
  datePublished: PropTypes.string,
  dateModified: PropTypes.string,
  noindex: PropTypes.bool,
}

export default Seo