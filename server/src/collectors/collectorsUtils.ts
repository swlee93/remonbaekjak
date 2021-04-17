import shortid from 'shortid'

const ensureJson = (data) => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (erro) {
      return {}
    }
  }
  return data
}

const getLightHouseReportIndexData = (original = {}, score = 0) => {
  const data = ensureJson(original)
  const { audits } = data

  let summary = { audits: {}, score, _id_: shortid.generate() }
  if (audits) {
    Object.entries(audits).forEach(
      ([key, { title, score, numericValue, numericUnit, displayValue, scoreDisplayMode }]: any) => {
        if (scoreDisplayMode === 'numeric') {
          summary.audits[key] = { title, score, numericValue, numericUnit, displayValue }
        }
      },
    )
  }

  return summary
}

export { getLightHouseReportIndexData }
