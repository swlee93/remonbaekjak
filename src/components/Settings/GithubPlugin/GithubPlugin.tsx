import React, { useMemo, useState } from 'react'
import { Input } from 'antd'
import { StyledContent } from 'styles/LayoutStyles'
import { SettingsItem, SettingsItemChild, TitleWithIndex } from '../SettingsItemWrapper'
import { UseQuery, UseQueryProps } from 'utils/fetches'
import SettingsInput from '../SettingsInput'

interface GithubPluginProps {}

const GithubPlugin = ({ data }: UseQueryProps<GithubPluginProps>) => {
  const { github_personal_access_token } = useMemo(() => {
    console.log('data', data?.getSettings)
    return data?.getSettings || {}
  }, [data])
  return (
    <StyledContent gap={'20px'}>
      <SettingsItem
        title={<TitleWithIndex label='Github' depth={0} />}
        extra={
          <a
            target='_blank'
            href='https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token'
          >
            Creating a personal access token
          </a>
        }
      >
        <SettingsItemChild label={<TitleWithIndex label='Personal Access Token' depth={1} />}>
          <SettingsInput inputName='github_personal_access_token' value={github_personal_access_token} />
        </SettingsItemChild>
      </SettingsItem>
    </StyledContent>
  )
}
export default UseQuery(GithubPlugin)`
  query GetSettings {
    getSettings {
      userId
      github_personal_access_token
    }
  }
`
