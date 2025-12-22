module.exports = {
  siteMetadata: {
    title: `Younes Bouchbouk | Software Engineer (Go/React)`,
    description: `Software Engineer @21Factory. Go microservices (DDD/Clean Architecture), gRPC, Kubernetes, Datadog, and React/Next.js. Passionate about building scalable, resilient cloud-native systems.`,
    author: `@YounesBouchbouk`,
    // Keep this in sync with your deployed domain (used for sitemap/canonical URLs)
    siteUrl: `https://younesdev.com`,
    // Public path under /static
    image: `/profile-image.png`,
    twitterUsername: `@BouchboukYounes`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://younesdev.com`,
        sitemap: `https://younesdev.com/sitemap/sitemap-index.xml`,
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Younes Bouchbouk Portfolio`,
        short_name: `YounesBouchbouk`,
        start_url: `/`,
        background_color: `#3069ba`,
        theme_color: `#3069ba`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}