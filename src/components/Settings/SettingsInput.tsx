import { Input } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { UseMutation, UseMutationProps, UseQueryContext } from 'utils/fetches'

type SETTINGS = 'github_personal_access_token'

interface SettingsInputProps {
  inputName: SETTINGS
  value: any
}

const SettingsInputPreLoader = (props: UseMutationProps<SettingsInputProps>) => {
  const { loading: queryLoading, called, refetch } = useContext(UseQueryContext)
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (queryLoading) return <Input placeholder={`${props.inputName} is loading..`} />
  return <SettingsInput {...props} refetch={refetch} isMounted={isMounted} />
}

const SettingsInput = ({ value, inputName, setOptions, isMounted, refetch }: UseMutationProps<SettingsInputProps>) => {
  const [inputValueState, setInputValueState] = useState(value)

  useEffect(() => {
    if (isMounted) {
      setOptions({ settingsInput: { [inputName]: inputValueState } })
    }
  }, [inputValueState])

  const onChangeInputValueState = ({ target: { value } }: any) => {
    setInputValueState(value)
  }

  return <Input defaultValue={inputValueState} onChange={onChangeInputValueState} />
}

export default UseMutation(SettingsInputPreLoader)`
  mutation updateSettings($settingsInput: SettingsInput) {
      updateSettings(settingsInput: $settingsInput) {
          github_personal_access_token
      }
  }
`
