import React, { useState } from 'react'
import { Affix, Button, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const URLForm = () => {
  const [addingURL, setAddingURL] = useState<string>('')
  const onChangeAddingURL = ({ target: { value } }: any) => {
    setAddingURL(value)
  }

  const onSave = () => {}

  return (
    <div>
      <Input value={addingURL} onChange={onChangeAddingURL} />
      <Button icon={<PlusOutlined />} onClick={onSave} />
    </div>
  )
}
export default URLForm
