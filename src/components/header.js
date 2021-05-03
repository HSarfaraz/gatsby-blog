import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import blogLogo from "../images/blogging.svg"

// Custom link
const NavLink = props => <Link getProps={isActive} {...props} />

const isActive =({ isCurrent }) => {
  return { className: isCurrent ? 'active' : 'navlink'}
}

const Header = ({ siteTitle }) => (
  <header
    style={{
      // background: `rebeccapurple`,
      background: `#0a66c2`,
      marginBottom: `1.45rem`,
    }}
  >
    {/* This is our title and logo area */}
    <div
      style={{
        display: 'flex', 
        alignItems:'center',
        justifyContent:'space-between',
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0.8rem 1.0875rem`,
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center'}}>
        <img src={blogLogo} alt="blog logo" className="logo m-2" />
        <h4 className="m-0 text-white">
          <NavLink className="text-white" to="/" >
            {siteTitle}
          </NavLink>
        </h4>
      </span>

      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/products">Store</NavLink>

      {/* Add the content of Shopping cart summary in header */}
      <div style={{cursor: 'pointer', display: 'flex'}} className="snipcart-summary snipcart-checkout text-white">
        <div className="m-0">
          <strong>My Cart</strong> 
        </div>
        <div className="px-2">
          <span class="px-2">| </span>Items in cart :
          <span className="snipcart-total-items font-weight-bold badge badge-light badge-pill ml-2"></span>
        </div>
        <div className="px-2">
          <span class="px-2">| </span> Total Price :
          <span className="snipcart-total-price font-weight-bold badge badge-light badge-pill ml-2"></span>
        </div>
      </div>

    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
