const { addWebpackAlias, override } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    components: path.resolve(__dirname, 'src/components'),
    styles: path.resolve(__dirname, 'src/styles'),
    contexts: path.resolve(__dirname, 'src/contexts'),
  }),
)
