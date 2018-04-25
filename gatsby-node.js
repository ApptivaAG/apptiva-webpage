const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const posts = graphql(`
    query {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { templateKey: { regex: "/post/" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
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
      // const none = {
      //   id:
      //     '/Users/philipschonholzer/Development/apptiva-website/src/pages/blog/2015-07-08-der-digitale-wandel.md absPath of file >>> MarkdownRemark',
      //   fields: [Object],
      //   frontmatter: [Object],
      // }
      const prev = index === 0 ? false : edges[index - 1].node
      const next = index === edges.length - 1 ? false : edges[index + 1].node
      const id = node.id
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
            fields {
              slug
            }
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

    edges.forEach(({ node }) => {
      const id = node.id
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

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
