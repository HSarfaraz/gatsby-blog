import React from 'react';
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

export default ({ data, pageContext }) => {
  const {
    isFirstPage,
    isLastPage,
    currentPage,
    totalPages
  } = pageContext

  const nextPage = `/blog/${String(currentPage + 1) }`
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${String(currentPage - 1)}`
 
  return(
  <Layout>
    <div>
        <h1 className="mt-1 mb-3 p-0"><u>Let's Explore Gatsby</u> </h1>
          <h4>{data.allMarkdownRemark.totalCount} Posts</h4><br/>
          
          <div className="card bg-light col-sm-7 p-3 mb-3">
            {data.allMarkdownRemark.edges.map( ({ node }) => (
              <div key={node.id} className="card-body">
                <p className="card-title">
                  <span className="h3"><Link to={`/posts${node.fields.slug}`}>{node.frontmatter.title}</Link></span>{' '} <small className="text-info"> - {node.frontmatter.date}</small>
                </p>
                <p className="card-text">{node.excerpt}</p>
              </div>
            ))}
          </div>

          {/* Pagination Links */}
          <div className="col-sm-5">
            {!isFirstPage && (
              <Link to={prevPage} rel="prev">
                <button className="btn btn-dark ml-2 pl-2"> <b> ← </b> Prev Page </button>
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <Link key={index} to={`/blog/${index === 0 ? "": index+1}`}><span className="px-2 mx-2">{index + 1}</span></Link>
            ))}
            {'  '}
            {!isLastPage && (
              <Link to={nextPage} rel="next">
                <button className="btn btn-dark mr-2 pr-2">Next Page <b> → </b></button>
              </Link>
            )}
          </div>
    </div>
  </Layout>
  )
}

export const query = graphql`
query($skip: Int!, $limit:Int!)  {
	allMarkdownRemark(
    skip:$skip,
    limit:$limit, 
    sort:{
        fields:[
          frontmatter___date
        ]
        order:[
          DESC
        ]
      }
    ){
    totalCount
    edges {
      node {
        fields {
          slug
        }
        id
        frontmatter{
          title
          date(formatString: "ddd, YYYY MMMM DD")
        }
        excerpt
      }
    }
  }
}
`

