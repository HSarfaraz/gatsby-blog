/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import "./united_bootstrap.min.css"

const getSiteMetaData = graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title,
          author,
          createdAt
        }
      }
    }
  `

const Layout = ({ children }) => {
  const data = useStaticQuery(getSiteMetaData)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
      </div>
        <footer className="footer bg-light p-2"
          style={{
            marginTop: `2rem`,
          }}
        >
          Built by {data.site.siteMetadata.author}, {' '} 
          {data.site.siteMetadata.createdAt}
        </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
