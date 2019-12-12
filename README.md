# Apptiva Webpage

This repo contains the website of [Apptiva AG](https://apptiva.ch/)

## Prerequisites

- Node (I recommend using v8.2.0 or higher)

## Getting Started (Recommended)

`npm i`

### Local development

```bash
npm start     #run the page locally with "hot reloading"
npm run clean #clean caches
npm run build #build a static version locally
npm run serve #serve the local build
```

### Push update

To test and review an update make a Pull Request on Github. A preview will be built on netlify, which you can share.

After changes of routes or usage of fonts run `npm run preload-fonts` to have the correct fonts be preloaded via http2.

To make a change to the live page apptiva.ch just git commit/push to the master branch. A new version will be built automatically and deployed to netlify.

## Author blog post

Blog post are written in Markdown and in the folder `content/blog`. New blog post should be in a new folder.

### Markdown

The post are written in [Markdown](https://daringfireball.net/projects/markdown/syntax).

Special are the custom-blocks which are configures [here](gatsby-config.js).

Custom blocks are written as following:

```markdown
[[left]]
| content
```

The following custom-blocks are configures:

- left (float left)
- right (float right)
- row (grid row)
- col (grid column)
- button (button link)
- avatar (round image)
- 'no-margin' (no margin between content)

Read more about custom-blocks [here](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-custom-blocks)

### Frontmatter

The data of the blog post is written in Frontmatter/YAML. The structure is the following:

`title`: Title of the post  
`slug`: URL of the post. Only lowercase letters and "-"  
`templateKey`: blog-post (which template should be used; for post it needs to be "blog-post")  
`image`: URI to the hero image of the post. Also used for SEO.  
`date`: Date of the post. Format like 2019-01-07  
`author`: Roman Schaller  
`description`: Lead text and used for SEO. Should be around 180 characters.  
`categories`:

- Allgemein
- Multiple categories

How to format a multiline sting in YAML Frontmatter: [Docs](https://yaml-multiline.info)
