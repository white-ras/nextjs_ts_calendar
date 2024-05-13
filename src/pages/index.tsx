import { CalendarBody } from '@/conponents/organisms/CalendarBody'
import { CalendarHeader } from '@/conponents/organisms/CalendarHeader'
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  getMonth,
  startOfMonth,
} from 'date-fns'
import { useEffect, useState } from 'react'

export default function Home() {
  const today = new Date()
  const [dateList, setDateList] = useState<Date[][]>([])

  useEffect(() => {
    const monthOfSundayList = eachWeekOfInterval({
      start: startOfMonth(today),
      end: endOfMonth(today),
    })
    const newDateList: Date[][] = monthOfSundayList.map((date) => {
      return eachDayOfInterval({
        start: date,
        end: endOfWeek(date),
      })
    })
    setDateList(newDateList)
  }, [])

  return (
    <>
      <div className="pt-[50px] bg-gradient-to-r from-lime-100 to-lime-200 h-screen flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl mb-5">{`${
          getMonth(today) + 1
        }月`}</h1>
        <table className="w-[80%] border-collapse border-2 border-solid border-lime-800 table-fixed">
          <CalendarHeader />
          <CalendarBody currentDate={today} dateList={dateList} />
        </table>
      </div>
    </>
  )
}
