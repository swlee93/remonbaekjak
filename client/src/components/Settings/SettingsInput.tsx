import { QuestionCircleFilled } from '@ant-design/icons'
import { Input, Tooltip } from 'antd'

import React, { useContext, useEffect, useMemo, useState } from 'react'
import { UseMutation, UseMutationProps } from 'utils/fetches'
import { SETTINGS } from '.'

interface SettingsInputProps {
  inputName: SETTINGS
  valueLoading?: boolean
  value: any
}

const SettingsInputPlaceHolder = ({ valueLoading, ...props }: UseMutationProps<SettingsInputProps>) => {
  if (valueLoading) return <Input placeholder={'loading'} />
  return <SettingsInput {...props} />
}

const SettingsInput = ({ value, inputName, setOptions, data, help }: UseMutationProps<SettingsInputProps>) => {
  const [isMounted, setMounted] = useState(false)
  const [inputValueState, setInputValueState] = useState(value)
  const updatedValue = useMemo(() => data?.updateSettings?.[inputName] || value, [
    data?.updateSettings?.[inputName] || value,
  ])
  useEffect(() => {
    if (inputValueState !== updatedValue) {
      setOptions({ settingsInput: { [inputName]: inputValueState } })
    }
  }, [inputValueState, updatedValue])

  useEffect(() => {
    if (isMounted) {
      setInputValueState(updatedValue)
    }
  }, [isMounted, updatedValue])

  useEffect(() => {
    setMounted(true)
  }, [])

  const onChangeInputValueState = ({ target: { value: targetValue } }: any) => {
    setInputValueState(targetValue)
  }

  return <Input placeholder={inputName} defaultValue={inputValueState} onChange={onChangeInputValueState} />
}

export default UseMutation(SettingsInputPlaceHolder)`
  mutation updateSettings($settingsInput: SettingsInput) {
      updateSettings(settingsInput: $settingsInput) {
          github_personal_access_token
      }
  }
`
