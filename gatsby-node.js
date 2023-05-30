const path = require('path')

const isSameDay = require('date-fns/isSameDay')
const isBefore = require('date-fns/isBefore')

const remark = require('remark')
const remarkHTML = require('remark-html')

const timestampsData = require('./content/timestamps.json')
const { knowledgeRoute, referenzenRoute } = require('./src/config')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const posts = graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { regex: "/post/" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    const { edges } = result.data.allMarkdownRemark

    edges.forEach(({ node }, index) => {
      const prevId = index === 0 ? null : edges[index - 1].node.id
      const nextId =
        index === edges.length - 1 ? null : edges[index + 1].node.id

      createPage({
        path: path.join('/', node.frontmatter.slug, '/'),
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id: node.id,
          prevId,
          nextId,
        },
      })
    })
    return null
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
              slug
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    const { edges } = result.data.allMarkdownRemark

    edges.forEach(({ node }) => {
      createPage({
        path: path.join('/', node.frontmatter.slug, '/'),
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          slug: node.frontmatter.slug,
        },
      })
    })
    return null
  })

  const knowledge = graphql(`
    query NotionQuery {
      allNotion(
        filter: { properties: { slug: { value: { ne: "" } } } }
        sort: {
          order: DESC
          fields: [properties___publishedAt___value___start]
        }
      ) {
        nodes {
          id
          properties {
            slug {
              value
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    const { nodes } = result.data.allNotion

    nodes.forEach((node, index) => {
      const prevId = index === 0 ? null : nodes[index - 1].id
      const nextId = index === nodes.length - 1 ? null : nodes[index + 1].id

      createPage({
        path: path.join(`/${knowledgeRoute}/`, node.properties.slug.value, '/'),
        component: path.resolve(`src/templates/knowledge-page.js`),
        context: {
          id: node.id,
          prevId,
          nextId,
          slug: node.properties.slug.value,
        },
      })
    })
    return null
  })

  const referenzen = graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { fields: frontmatter___order, order: ASC }
        filter: { frontmatter: { templateKey: { regex: "/referenz/" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    const { edges } = result.data.allMarkdownRemark

    edges.forEach(({ node }, index) => {
      const prevId = index === 0 ? null : edges[index - 1].node.id
      const nextId =
        index === edges.length - 1 ? null : edges[index + 1].node.id

      createPage({
        path: path.join(`/${referenzenRoute}/`, node.frontmatter.slug, '/'),
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id: node.id,
          prevId,
          nextId,
        },
      })
    })
    return null
  })

  return Promise.all([posts, pages, knowledge, referenzen])
}

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  const { frontmatter: { introduction } = {} } = node

  if (introduction) {
    const value = remark().use(remarkHTML).processSync(introduction).toString()

    createNodeField({
      name: `introduction`,
      node,
      value,
    })
  }
}

const getUpdatedAtDate = (node) => {
  const timestamps =
    timestampsData[node.fileAbsolutePath?.replace(`${__dirname}/`, '')]

  if (timestamps) {
    const { created, modified } = timestamps
    const gitCreateTime = new Date(created * 1000)
    const gitModificationTime = new Date(modified * 1000)
    const hasBeenUpdated = !isSameDay(gitCreateTime, gitModificationTime)
    const publishedBeforeModified = isBefore(
      new Date(node.frontmatter.date),
      gitModificationTime
    )

    if (hasBeenUpdated && publishedBeforeModified)
      return gitModificationTime.toISOString()
  }
}

exports.createSchemaCustomization = ({ actions, schema, getNode }) => {
  actions.createTypes([
    schema.buildObjectType({
      name: 'MarkdownRemark',
      interfaces: ['Node'],
      fields: {
        updatedAt: {
          type: 'Date',
          extensions: {
            dateformat: {},
          },
          resolve: getUpdatedAtDate,
        },
      },
    }),
  ])
}
