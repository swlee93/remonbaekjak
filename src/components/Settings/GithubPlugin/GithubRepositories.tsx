import React, { useEffect, useMemo, useState } from 'react'
import { UseQuery, UseQueryProps } from 'utils/fetches'
import { List, message, Avatar, Spin, Button } from 'antd'

import InfiniteScroll from 'react-infinite-scroller'
import { InfiniteScrollWrapper, InfiniteScrollLoadingWrapper, StyledContent } from 'styles/LayoutStyles'
import { CheckCircleFilled, CheckOutlined } from '@ant-design/icons'
import SettingsSelect from '../SettingsSelect'

interface GithubRepositoriesProps {}
const GithubRepositories = ({
  value,
  data,
  loading,
  setOptions,
  error,
  refetchValue,
}: UseQueryProps<GithubRepositoriesProps>) => {
  const repositories = data?.viewer?.repositories

  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    const updatedDataSource = data?.viewer?.repositories?.edges
    if (updatedDataSource) {
      setDataSource([].concat(dataSource, updatedDataSource))
    }
  }, [data?.viewer?.repositories?.edges])

  const options = useMemo(() => {
    return dataSource.map(({ node: { id, name } }) => ({ label: name, value: `${name}:${id}` }))
  }, [dataSource])

  if (!dataSource?.length) return <></>
  return (
    <StyledContent>
      <SettingsSelect
        inputName='github_repositories'
        value={value}
        options={options}
        dropdownStyle={{ display: 'none' }}
        optionListRenderer={({ setValue, value: valueState }: any) => (
          <OptionListRenderer
            setValue={setValue}
            value={valueState}
            repositories={repositories}
            setOptions={setOptions}
            dataSource={dataSource}
            error={error}
            loading={loading}
          />
        )}
      />
    </StyledContent>
  )
}

const OptionListRenderer = ({ repositories, value, setValue, setOptions, dataSource, error, loading }: any) => {
  const hasNextPage = repositories?.pageInfo?.hasNextPage
  const endCursor = repositories?.pageInfo?.endCursor

  const [totalCount, setTotalCount] = useState(0)
  useEffect(() => {
    const total = repositories?.totalCount
    if (total) {
      setTotalCount(total)
    }
  }, [repositories?.totalCount])

  const handleInfiniteOnLoad = () => {
    if (totalCount && totalCount > dataSource.length) {
      setOptions({ variables: { endCursor } })
    }
  }

  const onClickRepo = ({ id, name }: any) => {
    const v = `${name}:${id}`
    console.log('onClickRepo', v)
    if (Array.isArray(value)) {
      const checked = value.includes(v)
      if (checked) {
        setValue(value.filter((selected: string) => selected !== v))
      } else {
        setValue([...value, v])
      }
    } else {
      setValue([v])
    }
  }
  return (
    <InfiniteScrollWrapper
      hasNextPage={hasNextPage}
      count={dataSource.length}
      total={totalCount}
      error={error?.name}
      loading={loading}
    >
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasNextPage}
        useWindow={false}
      >
        <List
          dataSource={dataSource}
          renderItem={(item: any, index) => (
            <List.Item
              key={item?.node?.id || index}
              actions={[
                <Button
                  type={value?.includes(`${item?.node?.name}:${item?.node?.id}`) ? 'primary' : 'text'}
                  onClick={() => onClickRepo(item?.node)}
                  icon={<CheckOutlined />}
                />,
              ]}
            >
              <List.Item.Meta title={item?.node?.name} description={item?.node?.description} />
            </List.Item>
          )}
        >
          {loading && hasNextPage && (
            <InfiniteScrollLoadingWrapper>
              <Spin />
            </InfiniteScrollLoadingWrapper>
          )}
        </List>
      </InfiniteScroll>
    </InfiniteScrollWrapper>
  )
}

export default UseQuery(GithubRepositories)`
    query  GithubRepositories($endCursor: String) {
        viewer {
            repositories(first: 10, after: $endCursor) {
                totalCount
                edges {
                    node {
                        id
                        name
                        description
                        mirrorUrl
                        openGraphImageUrl
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }

    }
    
`
