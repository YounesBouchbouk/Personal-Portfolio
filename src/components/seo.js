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
    "sameAs": [
      "https://www.linkedin.com/in/younes-bouchbouk-71a355217/",
      "https://github.com/YounesBouchbouk",
      "https://twitter.com/BouchboukYounes",
      "https://www.facebook.com/younss.bouchbouk.3/"
    ]
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={title === defaultTitle ? title : `%s | ${defaultTitle}`}
      link={[
        { rel: "canonical", href: canonical }
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: `Younes Bouchbouk, Developer, Full Stack, JavaScript, React, Golang, NextJS, Portfolio`,
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
      ].concat(meta)}
    >
      {/* Add structured data schema */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
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