import React, { useEffect, useState } from 'react'
import { DatePicker } from 'antd'

export interface Time {
  stime: number | undefined
  etime: number | undefined
}

interface TimeSelectProps {
  onChange: (time: Time) => void
}
const TimeSelect = ({ onChange }: TimeSelectProps) => {
  const [time, setTime] = useState({ stime: undefined, etime: undefined })
  const onChangeTime = ([smoment, emoment]: any) => {
    setTime({ stime: smoment.valueOf(), etime: emoment.valueOf() })
  }
  useEffect(() => {
    if (onChange) {
      onChange(time)
    }
  }, [time?.stime, time?.etime])
  return <DatePicker.RangePicker onChange={onChangeTime}></DatePicker.RangePicker>
}
export default TimeSelect
