const { getLightHouseReportInfo } = require('./LightHouseData')

async function getReportInfo(parent, args, context, info) {
  const { taskType } = args

  switch (taskType) {
    case 'LIGHTHOUSE':
    default:
      return getLightHouseReportInfo(parent, args, context, info)
  }
}

module.exports = { getReportInfo }
