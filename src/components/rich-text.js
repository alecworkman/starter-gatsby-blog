import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

// Import the new rendering and the render node definitions
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

// Setting the rendering options. Same as:
// https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer
const options = {
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: ({
      data: {
        target: { slug, title },
      },
    }) => <Link to={slug}>{title}</Link>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <Img
          title={node.data.target.title}
          alt={node.data.target.description}
          fluid={node.data.target.fluid}
          style={{ maxWidth: "500px" }}
        />
      );
    },
  },
};

export const RichTextTemplate = ({ body }) => {
  return <div>{renderRichText(body, options)}</div>;
};
