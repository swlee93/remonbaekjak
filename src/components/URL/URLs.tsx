import React, { useState } from 'react'
import { Affix, Button, Input } from 'antd'
import URLForm from './URLForm'
const URLs = () => {
  const [urls] = useState([])

  return (
    <div>
      <URLForm />
    </div>
  )
}
export default URLs
