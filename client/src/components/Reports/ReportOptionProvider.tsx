import { Collapse } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import React, { FunctionComponent, useEffect, useState } from 'react'
import CompareButton from './ReportCompareButton'
import ReportCompareView from './ReportCompareView'
import ScoreChart from './ScoreChart'
interface ChildrenProps {
  viewMode: VIEW_MODE
  compareA: any
  compareB: any
  onClickListItem: (reportInfo: any, callback?: Function) => void
  reportInfo: any
  showReportInfo: boolean
  setShowReportInfo: (visible: boolean) => void
}
interface ReportOptionProviderProps {
  children: FunctionComponent<ChildrenProps>
  stime?: number
  etime?: number
}

export enum VIEW_MODE {
  DEFAULT = 'DEFAULT',
  COMPARE = 'COMPARE',
}

export type CompareKey = 'A' | 'B'

const CollapsePanel = Collapse.Panel

const ReportOptionProvider = ({ children, stime, etime }: ReportOptionProviderProps) => {
  const [viewMode, setViewMode] = useState<VIEW_MODE>(VIEW_MODE.DEFAULT)
  const [activeOptionPanelKey, setActiveOptionPanelKey] = useState<string[] | string>([])
  const [compareA, setCompareA] = useState<any>()
  const [compareB, setCompareB] = useState<any>()
  const [reportInfo, setReportInfo] = useState<any>()
  const [showReportInfo, setShowReportInfo] = useState<boolean>(false)

  const onChangeCompare = (target: CompareKey | undefined, reportInfo: any | undefined) => {
    if (target === 'A') {
      setCompareA(reportInfo)
    } else if (target === 'B') {
      setCompareB(reportInfo)
    }

    if (viewMode !== VIEW_MODE.COMPARE) {
      setViewMode(VIEW_MODE.COMPARE)
    }
  }

  const onClickCompareMode = (evt: CheckboxChangeEvent) => {
    evt.preventDefault()
    setViewMode(evt?.target?.checked ? VIEW_MODE.COMPARE : VIEW_MODE.DEFAULT)
    evt.stopPropagation()
  }

  const onClickListItem = (info: any, callback?: Function) => {
    switch (viewMode) {
      case VIEW_MODE.COMPARE:
        if (onChangeCompare) {
          const isCompareA = compareA?.timestamp === info?.timestamp
          const isCompareB = compareB?.timestamp === info?.timestamp
          if (!compareA) {
            onChangeCompare('A', info)
          } else if (isCompareA) {
            onChangeCompare('A', undefined)
          } else if (!compareB) {
            onChangeCompare('B', info)
          } else if (isCompareB) {
            onChangeCompare('B', undefined)
          } else {
            onChangeCompare('B', info)
          }
        }
        break
      case VIEW_MODE.DEFAULT:
      default:
        setReportInfo(info)
        setShowReportInfo(true)
    }
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
      <Collapse activeKey={activeOptionPanelKey} onChange={setActiveOptionPanelKey}>
        <CollapsePanel
          key='compare'
          header={<Checkbox onChange={onClickCompareMode}>Compare</Checkbox>}
          showArrow={false}
          disabled={!compareA || !compareB}
          extra={
            <ButtonGroup size='small'>
              <CompareButton compareKey={'A'} compareValue={compareA} onChangeCompare={onChangeCompare} />
              <CompareButton compareKey={'B'} compareValue={compareB} onChangeCompare={onChangeCompare} />
            </ButtonGroup>
          }
        >
          <ReportCompareView compareA={compareA} compareB={compareB} />
        </CollapsePanel>
        <CollapsePanel header={'Score Timeline'} key='score'>
          <ScoreChart stime={stime} etime={etime} />
        </CollapsePanel>
      </Collapse>
      {children({ viewMode, compareA, compareB, reportInfo, onClickListItem, showReportInfo, setShowReportInfo })}
    </>
  )
}

export default ReportOptionProvider
