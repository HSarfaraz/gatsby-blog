import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout'

const ProductTemplate = ({ data: { contentfulProduct}, location}) => (

  <Layout>

    {/* Product Info */}
    
    <div className="row col-sm-12">
      <div className="col-sm-6">
        <Img fluid={contentfulProduct.image.fluid}  style={{maxWidth:400, marginLeft:'0 auto'}}/>
      </div>
      <div className="col-sm-6">
        <h2>{contentfulProduct.name} </h2> 
        <small className="badge badge-light p-2 my-3"> Added on {contentfulProduct.createdAt}</small> 

        <h4 className="text-primary">${contentfulProduct.price}</h4>

        <p>{contentfulProduct.description}</p>

        {/* Adding the snipcart here */}
        <button type="button" className="snipcart-add-item btn btn-dark btn-md"
        data-item-id={contentfulProduct.slug}
        data-item-price={contentfulProduct.price}
        data-item-image={contentfulProduct.image.file.url}
        data-item-name={contentfulProduct.name}
        data-item-url={location.pathname}
        >Add to Cart</button>

      </div>

    </div>
  
  </Layout>
)

export const query = graphql`
query($slug: String!){
	contentfulProduct(slug:{ eq:$slug}){
    id
    slug
		name
    price
    description 
    createdAt(formatString:"YYYY MMMM DD, h:mm:ss, a")
    image {
      fluid(maxWidth: 800) {
        ...GatsbyContentfulFluid
      }
      file{
        url
      }
    }
  }
}
`


export default ProductTemplate;