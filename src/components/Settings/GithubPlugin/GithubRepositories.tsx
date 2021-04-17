import React, { useEffect, useMemo, useState } from 'react'
import { UseQuery, UseQueryProps } from 'utils/fetches'
import { List, Spin, Button, Checkbox, Select } from 'antd'

import InfiniteScroll from 'react-infinite-scroller'
import { InfiniteScrollWrapper, InfiniteScrollLoadingWrapper, StyledContent } from 'styles/LayoutStyles'
import { BranchesOutlined, CheckOutlined } from '@ant-design/icons'
import SettingsSelect from '../SettingsSelect'
import ButtonGroup from 'antd/lib/button/button-group'

interface GithubRepositoriesProps {}

const getRepositoryId = ({ nameWithOwner }: any, { name }: any) => `${nameWithOwner}/${name}`

const GithubRepositories = ({
  value,
  valueLoading,
  data,
  loading,
  setOptions,
  error,
}: UseQueryProps<GithubRepositoriesProps>) => {
  const repositories = data?.viewer?.repositories

  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    const updatedDataSource = data?.viewer?.repositories?.edges
    if (updatedDataSource) {
      setDataSource([].concat(dataSource, updatedDataSource))
    }
  }, [data?.viewer?.repositories?.edges])

  const options = useMemo(
    () =>
      dataSource.reduce<any[]>((acc, { node }: any) => {
        if (Array.isArray(node?.refs)) {
          const { refs } = node
          if (refs?.edges) {
            acc = [...acc, ...refs.edges.map(({ node: ref }: any) => ({ value: getRepositoryId(node, ref) }))]
          }
        }
        return acc
      }, []),
    [dataSource],
  )

  // if (!dataSource?.length) return <></>
  return (
    <StyledContent>
      <SettingsSelect
        inputName='github_repositories'
        value={value}
        valueLoading={valueLoading}
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
      setOptions({ endCursor })
    }
  }
  const onCheckRepositories = (v: string) => {
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
      errorMessage={error?.message}
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
          renderItem={(item: any, index) => {
            const refValues = value?.filter((v: string) => v.includes(item?.node?.nameWithOwner))
            return (
              <List.Item
                key={item?.node?.id || index}
                actions={[
                  <Select
                    placeholder='Branch'
                    suffixIcon={<BranchesOutlined />}
                    onSelect={onCheckRepositories}
                    value={refValues}
                    bordered={!!refValues?.length}
                  >
                    {item?.node?.refs?.edges?.map(({ node: ref }: any) => (
                      <Select.Option value={getRepositoryId(item?.node, ref)}>{ref.name}</Select.Option>
                    ))}
                  </Select>,
                ]}
              >
                <List.Item.Meta title={item?.node?.nameWithOwner} description={item?.node?.description} />
              </List.Item>
            )
          }}
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
            nameWithOwner
            description
            refs(refPrefix: "refs/heads/", first: 100) {
              edges {
                node {
                  name 
                  prefix
                }
              }
            }
            
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
