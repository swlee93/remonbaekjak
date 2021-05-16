import { normaliseCategory } from './normalise'

const normaliseNavtimingData = (data) => {
  let result = normaliseCategory('navtiming', data, 'nt_nav_st')

  if (result) {
    result.type = data.nt_nav_type
  }

  return result
}

export default normaliseNavtimingData
