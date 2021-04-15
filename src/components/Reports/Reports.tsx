import { ExpandOutlined, ShrinkOutlined } from '@ant-design/icons'
import { Button, Collapse, Divider, Drawer, Space } from 'antd'
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
import ReportCompareOption from './ReportCompareButton'
import ReportCompareView from './ReportCompareView'
import ReportInfo from './ReportInfo'
import ReportInfoDrawer from './ReportInfoDrawer'
import ReportList from './ReportList'
import ReportOptionProvider from './ReportOptionProvider'
import ScoreChart from './ScoreChart'

const Reports = () => {
  const [time, setTime] = useState<Time>({ stime: undefined, etime: undefined })

  return (
    <>
      <HeaderPlace>
        <Space>
          <TimeSelect onChange={setTime} />
        </Space>
      </HeaderPlace>
      <StyledContent gap='20px'>
        <ReportOptionProvider>
          {({ viewMode, compareA, compareB, onClickListItem, reportInfo, setShowReportInfo, showReportInfo }) => (
            <>
              <ReportList
                viewMode={viewMode}
                stime={time?.stime}
                etime={time?.etime}
                compareA={compareA}
                compareB={compareB}
                onClickListItem={onClickListItem}
              />
              <ReportInfoDrawer
                reportInfo={reportInfo}
                setShowReportInfo={setShowReportInfo}
                showReportInfo={showReportInfo}
              />
            </>
          )}
        </ReportOptionProvider>
      </StyledContent>
    </>
  )
}

export default Reports
