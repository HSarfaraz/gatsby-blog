const path = require('path');
const {createFilePath} =  require('gatsby-source-filesystem')

const PostTemplate = path.resolve('./src/templates/post-template.js')

// Give the reference of blog template page here 
const BlogTemplate = path.resolve('./src/templates/blog-template.js')

const ProductTemplate = path.resolve('./src/templates/product-template.js')


// Create a slug
exports.onCreateNode = ({ node, getNode, actions }) => {

  const { createNodeField } = actions;

  if(node.internal.type === 'MarkdownRemark'){
    const slug = createFilePath({ node, getNode, basePath: 'posts' })

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

// Create pages 
exports.createPages = async ({ graphql, actions }) => {

  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(limit:1000){
        edges {
          node {
            fields{
              slug
            }      
          }
        }
      }

      
      allContentfulProduct{
        totalCount
        edges{
          node{
            slug       
          }
        }
      }
      

    }
  `)
  
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach( ({ node: post }) => {

    createPage({
      path:`posts${post.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.fields.slug
      }
    })

  })

  //---------- code for 2 posts per page here ----------------
  const postsPerPage = 2
  const totalPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: totalPages }).forEach((_, index ) => {
    const currentPage = index + 1 //1 2 3 4
    const isFirstPage = index === 0 
    const isLastPage = currentPage === totalPages 

    createPage({
      path: isFirstPage ? '/blog': `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages
      }
    })

  })

  //---------- code for 1 post per page here ----------------

  // posts.forEach((_, index, postsArr ) => {
  //   const totalPages = postsArr.length //postsArr is total post in an array
  //   const postsPerPage = 1 
  //   const currentPage = index + 1
  //   const isFirstPage = index === 0 
  //   const isLastPage = currentPage === totalPages 

  //   createPage({
  //     path: isFirstPage ? '/blog': `/blog/${currentPage}`,
  //     component: BlogTemplate,
  //     context: {
  //       limit: postsPerPage,
  //       skip: index * postsPerPage,
  //       isFirstPage,
  //       isLastPage,
  //       currentPage,
  //       totalPages
  //     }
  //   })

  // })

  const products = result.data.allContentfulProduct.edges

  products.forEach(({ node:product }) => {
    createPage({
      path: `/products/${product.slug}`,
      component: ProductTemplate,
      context: {
        slug: product.slug
      }
    })
  })

}
