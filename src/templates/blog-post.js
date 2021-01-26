import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";

import heroStyles from "../components/hero.module.css";
import { RichTextTemplate } from "../components/rich-text";

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, "data.contentfulRecipe");
    const recipeBodyDoc = get(this.props, "data.contentfulRecipe.body");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    // console.log(JSON.stringify(recipeBodyDoc));
    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <p>{post.title}</p>
          <Img style={{ width: "200px" }} fluid={post.heroImage.fluid} />
          <RichTextTemplate body={recipeBodyDoc} />
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query RecipeById($id: String!) {
    contentfulRecipe(id: { eq: $id }) {
      title
      heroImage {
        fluid(maxWidth: 200) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      body {
        raw
        references {
          ... on ContentfulAsset {
            # contentful_id is required to resolve the references
            contentful_id
            description
            title
            __typename
            fluid(maxWidth: 550) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
