module.exports = {
  siteMetadata: {
    title: `Younes Bouchbouk | Full Stack Developer`,
    description: `Younes Bouchbouk - Full Stack Developer and Software Engineer. Specializing in JavaScript, React, NextJS, Golang and more.`,
    author: `@YounesBouchbouk`,
    siteUrl: `https://younesbouchbouk.com`, // Update with your actual domain
    image: `/images/profile-image.jpg`, // Path to your default image for social sharing
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
        host: `https://younesbouchbouk.com`,
        sitemap: `https://younesbouchbouk.com/sitemap/sitemap-index.xml`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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