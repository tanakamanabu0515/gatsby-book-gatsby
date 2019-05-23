// Node.jsの標準モジュールなのでインストール不要
// 単なるNode.jsなので、モジュールを呼び出すときはrequireを使います。
// src/ 以下は内部的にwebpackを使っているので、importで呼び出します。
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allWorksYaml {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.allWorksYaml.edges.map(edge => {
      const work = edge.node;
      // デバッグ用にログを出力しておくと便利
      console.log("Create Page", `/works/${work.slug}`)
      createPage({
        // workのslugを元にパスを組み立てて文字列で渡します。
        path: `/works/${work.slug}`,
        // path.resolveを使うと絶対パスを渡してくれます。
        component: path.resolve("./src/templates/works.js"),
        // コンポーネントにわたすデータを指定しています。
        // ここに与えた値がGraphQLの変数としてセットされます。
        context: {
          slug: work.slug,
        },
      })
    })
  })
}