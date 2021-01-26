const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.js");
    resolve(
      graphql(
        `
          {
            allContentfulRecipe {
              edges {
                node {
                  id
                  slug
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.allContentfulRecipe.edges;
        posts.forEach((post) => {
          createPage({
            path: `/recipes/${post.node.slug}/`,
            component: blogPost,
            context: {
              id: post.node.id,
            },
          });
        });
      })
    );
  });
};
