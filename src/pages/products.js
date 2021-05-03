import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout'
import netlifyIdentity from 'netlify-identity-widget'

class Products extends React.Component {

  state = {
    products: []
  }
  
  componentDidMount(){
    this.getProducts();
    netlifyIdentity.on('login',user => this.getProducts(user));
    netlifyIdentity.on('logout',() => this.getProducts());
  }
  
  getProducts = user => {
    console.log('Current User ',user);
    const  allProducts  = this.props.data.allContentfulProduct.edges;

    const products = netlifyIdentity.currentUser() !== null ? 
      allProducts : 
      allProducts.filter(({ node: product}) => !product.private)

    this.setState({products})
  }



  render(){
  const { products } = this.state;

  return (

   <Layout>
    <h2 className="my-2">Sarfaraz Products</h2>

    <div className="row col-sm-12 p-0">
        {/* Products list */}
        {products.map(({ node: product }) =>(

          <div className="col-sm-6 text-center py-2 my-2"  key={product.id}>
            
              <Link to={`/products/${product.slug}`} style={{textDecoration: 'none', color: 'darkPurple', display: 'flex' }}>
                <h4> {product.name}.{' '}</h4>
                <h5 className="font-weight-bold text-primary ml-3 mt-1 p-0">$ {product.price}</h5>
              </Link>
              <Img fluid={product.image.fluid} style={{maxWidth:400, marginLeft:'0 auto'}}/>
         
          </div>

        ))}
    </div>
    </Layout>
  )
}}

export const query = graphql`
{
  allContentfulProduct{
		edges {
      node {
        id 
        slug 
        name
        price
        private
        image {
          fluid(maxWidth: 800){
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
}
`
// i need to change GatsbyContentfulFluid from GatsbyContentfulFluid_tracedSVG
export default Products;