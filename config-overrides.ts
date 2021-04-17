import darkTheme from '@ant-design/dark-theme'
import { addWebpackAlias, override, fixBabelImports, addLessLoader } from 'customize-cra'
import path from 'path'

export default override(
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
