const fse = require('fs-extra')
const csv = require('csvtojson')

const getTargetFileList = (root, taskId, extention, option = {}) => {
  let files = []
  if (taskId) {
    const path = `${root}/${taskId}`
    let pathFiles = []
    if (fse.pathExistsSync(path)) {
      pathFiles = fse.readdirSync(path)
    }
    pathFiles.forEach((pathFile) => {
      const [name] = pathFile.split(`.${extention}`)
      const timestamp = Number(name)
      // push
      files.push({ path: `${path}/${pathFile}`, name, timestamp, taskId })
    })
  } else {
    // dir 없는 경우 => 전체 dir 읽기
    if (fse.pathExistsSync(root)) {
      const rootfolders = fse.readdirSync(root)
      files = rootfolders.reduce((acc, tid) => {
        const rootpath = `${root}/${tid}`
        let rootpathFiles = []
        if (fse.pathExistsSync(rootpath)) {
          rootpathFiles = fse.readdirSync(rootpath)
        }
        rootpathFiles.forEach((subfile) => {
          const [name] = subfile.split(`.${extention}`)
          const timestamp = Number(name)
          // push
          acc.push({ path: `${rootpath}/${subfile}`, name, timestamp, taskId: tid })
        })
        return acc
      }, [])
    }
  }

  // options
  if (option.stime && option.etime) {
    files = files.filter(({ timestamp }) => option.stime < timestamp && option.etime > timestamp)
  }

  if (option.reverse) {
    files.reverse()
  }

  return files
}

module.exports = {
  getTargetFileList,
}
