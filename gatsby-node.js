const path = require('path')

const isSameDay = require('date-fns/isSameDay')
const isBefore = require('date-fns/isBefore')

const remark = require('remark')
const remarkHTML = require('remark-html')

const timestampsData = require('./content/timestamps.json')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const posts = graphql(`{
  allMarkdownRemark(
    limit: 1000
    sort: {order: DESC, fields: [frontmatter___date]}
    filter: {frontmatter: {templateKey: {regex: "/post/"}}}
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          slug
          templateKey
          date(formatString: "DD.MM.YYYY")
          description
          image {
            childImageSharp {
              gatsbyImageData(width: 240, placeholder: BLURRED, layout: FIXED)
            }
          }
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
      const prev = index === 0 ? null : edges[index - 1].node
      const next = index === edges.length - 1 ? null : edges[index + 1].node

      createPage({
        path: path.join('/', node.frontmatter.slug, '/'),
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          slug: node.frontmatter.slug,
          prev,
          next,
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

  return Promise.all([posts, pages])
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
