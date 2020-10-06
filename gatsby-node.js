const path = require('path')
const { execSync } = require('child_process')

const isSameDay = require('date-fns/isSameDay')

const remark = require('remark')
const remarkHTML = require('remark-html')

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
              title
              slug
              templateKey
              date(formatString: "DD.MM.YYYY")
              description
              image {
                childImageSharp {
                  fixed(width: 260) {
                    srcSet
                    srcWebp
                    src
                    base64
                    width
                    srcSetWebp
                    aspectRatio
                    height
                    originalName
                  }
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

  if (node.internal.type === 'MarkdownRemark') {
    const gitModificationTime = execSync(
      `git log -1 --pretty=format:%aI ${node.fileAbsolutePath}`
    ).toString()
    const gitCreateTime = execSync(
      `git log -1 --diff-filter=A --follow --pretty=format:%aI ${node.fileAbsolutePath}`
    ).toString()

    const hasBeenUpdated = !isSameDay(
      new Date(gitCreateTime),
      new Date(gitModificationTime)
    )

    createNodeField({
      node,
      name: 'updatedAt',
      value: hasBeenUpdated ? gitModificationTime : null,
    })
  }
}
