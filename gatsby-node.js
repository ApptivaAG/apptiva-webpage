const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const posts = graphql(`
    query {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { regex: "/post/" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              path
              templateKey
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const edges = result.data.allMarkdownRemark.edges

    edges.forEach(({ node }, index) => {
      const prev = index === 0 ? null : edges[index - 1].node
      const next = index === edges.length - 1 ? null : edges[index + 1].node
      const { id } = node
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          prev,
          next,
        },
      })
    })
  })

  const pages = graphql(`
    query {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { templateKey: { regex: "/page/" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              path
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const edges = result.data.allMarkdownRemark.edges

    edges.forEach(({ node }) => {
      const { id } = node
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })
  })

  return Promise.all([posts, pages])
}
