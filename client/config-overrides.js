const darkTheme = require('@ant-design/dark-theme')
const { addWebpackAlias, override, fixBabelImports, addLessLoader } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    components: path.resolve(__dirname, 'src/components'),
    styles: path.resolve(__dirname, 'src/styles'),
    contexts: path.resolve(__dirname, 'src/contexts'),
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: darkTheme.default,
  }),
)
