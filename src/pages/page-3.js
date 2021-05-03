import React from 'react';
import Layout from '../components/layout';
import { Link, graphql, StaticQuery } from 'gatsby'

// Create a variable for query 
const getImageDate = graphql`
    {
      allFile{
        edges{
          node{
            relativePath,
            extension,
            size,
            birthTime
          }
        }
      }
    }
  `

export default () => {

  return (
    <Layout>
      <h1>Hello from Page 3</h1>
      <h3>Image File Data</h3>
      <StaticQuery query={getImageDate} 
        render={data => (
       
        <table>
          <thead>
            <tr>
              <th>Relative Path</th>
              <th>Extension</th>
              <th>Size of Image</th>
              <th>Birth Time</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.relativePath}</td>
                <td>{node.extension}</td>
                <td>{node.size}</td>
                <td>{node.birthTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
       )}/>
      <Link to='/page-2'> Go back to Page 2</Link>
    </Layout>
  )
}

