import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import blogLogo from "../images/blogging.svg"
import netilfyIdentity from "netlify-identity-widget"

// Custom link
const NavLink = props => <Link getProps={isActive} {...props} />

const isActive =({ isCurrent }) => {
  return { className: isCurrent ? 'active' : 'navlink'}
}

class Header extends React.Component {

  componentDidMount(){
    netilfyIdentity.init()
  }
  render() {

    const { siteTitle } = this.props
    return (
    <header
      style={{
        // background: `rebeccapurple`,
        background: `#0a66c2`,
        marginBottom: `1.45rem`,
      }}
    >
       <div className="row"
       style={{
          display: 'flex', 
          alignItems:'center',
          justifyContent:'space-between',
          margin: `0 auto`,
          maxWidth: 1060,
          padding: `0.8rem 1.0875rem`,
        }}>
        <div className="col-sm-6 col-md-7" style={{ display: 'flex', alignItems: 'center'}}>

            <img src={blogLogo} alt="blog logo" className="logo m-2" />
            <h5 className="m-0 text-white">
              <NavLink className="text-white" to="/" >
                {siteTitle}
              </NavLink>
            </h5>
        
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/products">Store</NavLink>

          {/* For Netlify Authentication */}
          <div data-netlify-identity-menu />

        </div>
        
        {/* Add the content of Shopping cart summary in header */}
        <div className="col-sm-12 col-md-5">
         
          <div style={{cursor: 'pointer', display: 'flex'}} className="mt-1 pt-1 snipcart-summary snipcart-checkout text-white">
            <strong>My Cart</strong> 
            <div>
              <span className="px-1">|</span>Items in cart:
              <span className="snipcart-total-items font-weight-bold badge badge-light badge-pill ml-1"></span>
            </div>
            <div>
              <span className="px-1">|</span> Total Price:
              <span className="snipcart-total-price font-weight-bold badge badge-light badge-pill ml-1"></span>
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
