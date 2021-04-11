import { Button, Collapse, Space } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'
import Text from 'antd/lib/typography/Text'
import { HeaderPlace } from 'components/Header'
import TaskSelect from 'components/Options/TaskSelect'
import TimeSelect, { Time } from 'components/Options/TimeSelect'
import { useEffect, useState } from 'react'
import { StyledContent } from 'styles/LayoutStyles'
import { UseQuery, UseQueryProps } from 'utils/fetches'
import ReportCompareView from './ReportCompareView'
import ReportList from './ReportList'
import ScoreChart from './ScoreChart'
export enum VIEW_MODE {
  DEFAULT = 'DEFAULT',
  COMPARE = 'COMPARE',
}
const Reports = () => {
  const [time, setTime] = useState<Time>({ stime: undefined, etime: undefined })
  const [viewMode, setViewMode] = useState<VIEW_MODE>(VIEW_MODE.DEFAULT)
  const [compareA, setCompareA] = useState<any>()
  const [compareB, setCompareB] = useState<any>()

  const onChangeCompare = (target: 'A' | 'B' | undefined, reportInfo: any | undefined) => {
    if (viewMode !== VIEW_MODE.COMPARE) {
      setViewMode(VIEW_MODE.COMPARE)
    }

    switch (target) {
      case 'A':
        setCompareA(reportInfo)
        break
      case 'B':
        setCompareB(reportInfo)
        break
      default:
    }
  }
  const [activeOptionPanelKey, setActiveOptionPanelKey] = useState<string[] | string>([])
  const onClickCompareMode = (evt: CheckboxChangeEvent) => {
    evt.preventDefault()
    setViewMode(evt?.target?.checked ? VIEW_MODE.COMPARE : VIEW_MODE.DEFAULT)
    evt.stopPropagation()
  }
  useEffect(() => {
    if (viewMode === VIEW_MODE.COMPARE && !!compareA && !!compareB) {
      setActiveOptionPanelKey(['compare'])
    } else if (viewMode !== VIEW_MODE.COMPARE || !compareA || !compareB) {
      setActiveOptionPanelKey([])
    }
  }, [viewMode === VIEW_MODE.COMPARE, !!compareA, !!compareB])
  return (
    <>
      <HeaderPlace>
        <Space>
          <TimeSelect onChange={setTime} />
        </Space>
      </HeaderPlace>
      <StyledContent gap='20px'>
        <Collapse activeKey={activeOptionPanelKey} onChange={setActiveOptionPanelKey}>
          <CollapsePanel
            key='compare'
            showArrow={false}
            disabled={!compareA || !compareB}
            extra={
              <ButtonGroup size='small'>
                <Button
                  type={compareA ? 'primary' : 'dashed'}
                  onClick={(e) => {
                    onChangeCompare('A', undefined)
                    e.stopPropagation()
                  }}
                  children={
                    !!compareA?.timestamp ? (
                      <Space>
                        <Text type='secondary'>A</Text>
                        <Text>{new Date(compareA.timestamp).toLocaleString()}</Text>
                      </Space>
                    ) : (
                      'A'
                    )
                  }
                />

                <Button
                  type={compareB ? 'primary' : 'dashed'}
                  onClick={(e) => {
                    onChangeCompare('B', undefined)
                    e.stopPropagation()
                  }}
                  children={
                    !!compareB?.timestamp ? (
                      <Space>
                        <Text type='secondary'>B</Text>
                        <Text>{new Date(compareB.timestamp).toLocaleString()}</Text>
                      </Space>
                    ) : (
                      'B'
                    )
                  }
                />
              </ButtonGroup>
            }
            header={<Checkbox onChange={onClickCompareMode}>Compare</Checkbox>}
          >
            <ReportCompareView compareA={compareA} compareB={compareB} />
          </CollapsePanel>
          <CollapsePanel header={'Score Timeline'} key='score'>
            <ScoreChart {...time} />
          </CollapsePanel>
        </Collapse>
        <ReportList
          {...time}
          viewMode={viewMode}
          onChangeCompare={onChangeCompare}
          compareA={compareA}
          compareB={compareB}
        />
      </StyledContent>
    </>
  )
}

export default Reports
