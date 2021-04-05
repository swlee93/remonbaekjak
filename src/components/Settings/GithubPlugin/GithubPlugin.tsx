import React, { useContext, useMemo, useState } from 'react'
import { Button, Input } from 'antd'

import { SettingsItem, SettingsItemChild, TitleWithIndex } from '../SettingsItemWrapper'
import { UseQuery, UseQueryProps } from 'utils/fetches'
import SettingsInput from '../SettingsInput'
import GithubRepositories from './GithubRepositories'
import { THIRD_PARTY } from 'contexts/ApolloProvider'
import { ReloadOutlined } from '@ant-design/icons'
import { MenuContext } from 'contexts'

interface GithubPluginProps {}

const GithubPlugin = ({ data, loading }: UseQueryProps<GithubPluginProps>) => {
  const { github_personal_access_token, github_repositories } = useMemo(() => data?.getSettings || {}, [data])
  const { refresh } = useContext(MenuContext)
  const [token, setToken] = useState(github_personal_access_token)
  const isDiff = github_personal_access_token !== token
  const onSuccessUpdateToken = (result: any, { storage }: any) => {
    const updatedToken = result?.data?.updateSettings?.github_personal_access_token

    if (updatedToken && storage) {
      storage.set('token', updatedToken)
      setToken(updatedToken)
    }
  }
  return (
    <SettingsItem
      title={<TitleWithIndex label='Github' depth={0} />}
      extra={<Button type={isDiff ? 'primary' : 'default'} icon={<ReloadOutlined onClick={refresh} />} />}
    >
      <SettingsItemChild
        span={3}
        label={
          <TitleWithIndex
            label='Personal Access Token'
            depth={1}
            actions={
              <a
                target='_blank'
                href='https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token'
              >
                Creating a personal access token
              </a>
            }
          />
        }
      >
        <SettingsInput
          inputName='github_personal_access_token'
          value={github_personal_access_token}
          valueLoading={loading}
          onSuccess={onSuccessUpdateToken}
        />
      </SettingsItemChild>

      <SettingsItemChild span={3} label={<TitleWithIndex label='Repositories' depth={1} />}>
        <GithubRepositories client={THIRD_PARTY.GITHUB} value={github_repositories} valueLoading={loading} />
      </SettingsItemChild>
    </SettingsItem>
  )
}
export default UseQuery(GithubPlugin)`
  query GetSettings {
    getSettings {
      userId
      github_personal_access_token
      github_repositories
    }
  }
`
