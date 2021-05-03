import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby'

// We get the details from query and got into data, here we rename it to post
const PostTemplate = ({ data: post }) => (
  <Layout>
    <div className="card bg-light col-sm-7 p-3 mb-3">
      <h1>{post.markdownRemark.frontmatter.title}</h1>
      <h4>{post.markdownRemark.timeToRead}
      {post.markdownRemark.timeToRead > 1 ? 'minutes' : 'minute'}</h4>
      <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }}/>
    </div>
  </Layout>
)

// we can accept the page query by creating a const for query 
export const query = graphql`

query($slug: String!) {
	markdownRemark(fields: {
    slug: { eq: $slug}
  }){
		html
    timeToRead
    frontmatter {
			title
    }
  }
}`


export default PostTemplate;