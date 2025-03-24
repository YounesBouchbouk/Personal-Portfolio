exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  
  // Create DSG page
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
  
  // Create blog post pages
  const blogPostTemplate = require.resolve("./src/templates/blog-post.js")
  
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)
  
  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query for blog posts")
    return
  }
  
  // Create blog post pages
  const posts = result.data.allMarkdownRemark.edges
  
  posts.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
  
  // Create blog tag pages
  const tags = new Set()
  
  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => tags.add(tag))
    }
  })
  
  // Create blog technology pages
  const technologies = new Set()
  
  posts.forEach(({ node }) => {
    if (node.frontmatter.technologies) {
      node.frontmatter.technologies.forEach(tech => technologies.add(tech))
    }
  })
}
