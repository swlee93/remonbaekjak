import { Button, Collapse, Space } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'
import Checkbox from 'antd/lib/checkbox/Checkbox'
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
  const [compareA, setCompareA] = useState()
  const [compareB, setCompareB] = useState()

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
  const [activeOptionPanelKey, setActiveOptionPanelKey] = useState<string | string[]>('')

  useEffect(() => {
    if (viewMode === VIEW_MODE.COMPARE && !!compareA && !!compareB) {
      setActiveOptionPanelKey(['compare'])
    }
  }, [viewMode, !!compareA, !!compareB])
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
                <Button type={compareA ? 'primary' : 'dashed'} onClick={() => onChangeCompare(undefined, undefined)}>
                  A
                </Button>
                <Button type={compareB ? 'primary' : 'dashed'} onClick={() => onChangeCompare(undefined, undefined)}>
                  B
                </Button>
              </ButtonGroup>
            }
            header={
              <Checkbox
                onChange={({ target: { checked } }) => setViewMode(checked ? VIEW_MODE.COMPARE : VIEW_MODE.DEFAULT)}
              >
                Compare
              </Checkbox>
            }
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
