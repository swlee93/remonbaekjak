import { Input, Select } from 'antd'
import React, {
  CSSProperties,
  JSXElementConstructor,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { UseMutation, UseMutationProps, UseQueryContext } from 'utils/fetches'
import { SETTINGS } from '.'

interface ItemProps {
  label: string
  value: string
}

interface SettingsSelectProps {
  inputName: SETTINGS
  value: string[]
  options: ItemProps[]
  dropdownStyle?: CSSProperties
  optionListRenderer?: ({ setValue }?: any) => ReactElement<any, string | JSXElementConstructor<any>>
}
const SettingsSelectPlaceHolder = ({ valueLoading, ...props }: UseMutationProps<SettingsSelectProps>) => {
  if (valueLoading) return <Select placeholder={'loading'} />
  return <SettingsSelect {...props} />
}
const SettingsSelect = ({
  value,
  options,
  inputName,
  setOptions,

  dropdownStyle,
  optionListRenderer,
  data,
}: UseMutationProps<SettingsSelectProps>) => {
  const [inputValueState, setInputValueState] = useState(value || [])
  const updatedValue = useMemo(() => data?.updateSettings?.[inputName] || value || [], [
    data?.updateSettings?.[inputName] || value,
  ])

  useEffect(() => {
    console.log('inputValueState', 'updatedValue', inputValueState, updatedValue)
    const isDiff = updatedValue.slice().sort().join() !== inputValueState.slice().sort().join()
    if (isDiff) {
      setOptions({ settingsInput: { [inputName]: inputValueState } })
    }
  }, [inputValueState, updatedValue])

  const onChangeValueState = (selects: string[]) => {
    setInputValueState(selects.sort())
  }
  const selectProps = {
    mode: 'multiple' as const,
    style: { width: '100%' },
    value: inputValueState,
    options,
    onChange: onChangeValueState,
    placeholder: inputName,
    maxTagCount: 'responsive' as const,
    dropdownStyle,
  }

  return (
    <>
      <Select {...selectProps} />

      {!!optionListRenderer && (
        <div style={{ padding: 20, width: '100%' }}>
          {optionListRenderer({ setValue: onChangeValueState, value: inputValueState })}
        </div>
      )}
    </>
  )
}

export default UseMutation(SettingsSelectPlaceHolder)`
  mutation updateSettings($settingsInput: SettingsInput) {
      updateSettings(settingsInput: $settingsInput) {
        github_repositories
      }
  }
`
