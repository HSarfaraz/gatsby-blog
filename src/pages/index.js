import * as React from "react"
import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"
// import Img from 'gatsby-image';

import Layout from "../components/layout"
import Seo from "../components/seo"

 import bloggerimage from "../images/blogger.jpg"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Hi friends</h1>
    <p>Welcome to my Gatsby site.</p>
    <p>I am going good in this Pendemic, Kindly be safe, stay at home, follow social distancing and get vaccinated.</p>
    {/* <StaticImage
      src="../images/blogger.jpg"
      width={350}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="Programmer"
      style={{ marginBottom: `1.45rem` }}
    /> */}
     <img src={bloggerimage}  style={{maxWidth:250, marginLeft:'0 auto'}} alt="Programmer"/>
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>
  </Layout>
)

export default IndexPage
