import React from "react";
// graphQLの追加を忘れずに！
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const WorkPage = ({data}) => (
  <Layout>
    <SEO title="About" />
    <h1>{data.worksYaml.title}</h1>
    <div>{data.worksYaml.desctiprion}</div>
    <div>
      {data.worksYaml.category} - {data.worksYaml.year}
    </div>
    <Link to="/">Go to the homepage</Link>
  </Layout>
)

export const query = graphql`
  query($slug: String!){
    worksYaml(slug: {eq: $slug}) {
      title
      description
      category
      year
    }
  }
`

export default WorkPage