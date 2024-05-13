import { CalendarBody } from '@/conponents/organisms/CalendarBody'
import { CalendarHeader } from '@/conponents/organisms/CalendarHeader'
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  getMonth,
  isSameDay,
  startOfMonth,
} from 'date-fns'
import { useEffect, useState } from 'react'
import { DateList, Schedule } from '@/types/calendar'
import { getScheduleList } from './api/calendar'

export default function Home() {
  const today = new Date()
  const [dateList, setDateList] = useState<DateList>([])

  useEffect(() => {
    const monthOfSundayList = eachWeekOfInterval({
      start: startOfMonth(today),
      end: endOfMonth(today),
    })
    const newDateList: DateList = monthOfSundayList.map((date) => {
      return eachDayOfInterval({
        start: date,
        end: endOfWeek(date),
      }).map((date) => ({ date, schedules: [] as Schedule[] }))
    })

    const scheduleList = getScheduleList() // from API
    // schedule:id,date,title,description
    scheduleList.forEach((schedule) => {
      const firstIndex = newDateList.findIndex((oneWeek) =>
        oneWeek.some((item) => isSameDay(item.date, schedule.date))
      )
      if (firstIndex === -1) return
      const secondIndex = newDateList[firstIndex].findIndex((item) =>
        isSameDay(item.date, schedule.date)
      )

      newDateList[firstIndex][secondIndex].schedules = [
        ...newDateList[firstIndex][secondIndex].schedules,
        schedule,
      ]
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
