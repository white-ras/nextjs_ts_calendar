import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameWeek,
  startOfMonth,
} from 'date-fns'
import { useEffect, useState } from 'react'
import { DateList, Schedule } from '@/types/calendar'
import { getScheduleList } from '@/pages/api/calendar'

type PropsType = {
  currentDate: Date
}

export const useCalendar = ({ currentDate }: PropsType) => {
  const [dateList, setDateList] = useState<DateList>([])
  const getDateListIndex = (
    currentDateList: DateList,
    schedule: Schedule
  ): number[] => {
    const firstIndex = currentDateList.findIndex((oneWeek) => {
      return oneWeek.some((item) => isSameDay(item.date, schedule.date))
    })
    if (firstIndex === -1) return [-1, -1]
    const secondIndex = currentDateList[firstIndex].findIndex((item) => {
      return isSameDay(item.date, schedule.date)
    })
    return [firstIndex, secondIndex]
  }

  const addSchedule = (schedule: Schedule) => {
    const newDateList = [...dateList]

    const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule)
    if (firstIndex === -1) return

    newDateList[firstIndex][secondIndex].schedules = [
      ...newDateList[firstIndex][secondIndex].schedules,
      schedule,
    ]
    setDateList(newDateList)
  }

  const deleteSchedule = (deleteSchedule: Schedule) => {
    const newDateList: DateList = dateList.map((dateItem) => {
      return dateItem.map((item) => {
        return {
          ...item,
          schedules: item.schedules.filter(
            (schedule) => schedule.id !== deleteSchedule.id
          ),
        }
      })
    })
    setDateList(newDateList)
  }

  const editSchedule = (selectedSchedule: Schedule, newTitle: string) => {
    const newSchedule: Schedule = {
      id: selectedSchedule.id,
      date: selectedSchedule.date,
      title: newTitle,
      description: selectedSchedule.description,
    }

    const newDateList: DateList = dateList.map((dateItem) => {
      return dateItem.map((item) => {
        return {
          ...item,
          schedules: item.schedules.filter(
            (schedule) => schedule.id !== selectedSchedule.id
          ),
        }
      })
    })

    const [firstIndex, secondIndex] = getDateListIndex(newDateList, newSchedule)
    if (firstIndex === -1) return

    newDateList[firstIndex][secondIndex].schedules = [
      ...newDateList[firstIndex][secondIndex].schedules,
      newSchedule,
    ]
    setDateList(newDateList)
  }

  useEffect(() => {
    const monthOfSundayList = eachWeekOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    })
    const newDateList: DateList = monthOfSundayList.map((date) => {
      return eachDayOfInterval({
        start: date,
        end: endOfWeek(date),
      }).map((date) => ({ date, schedules: [] as Schedule[] }))
    })

    const scheduleList = getScheduleList()
    scheduleList.forEach((schedule) => {
      const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule)
      if (firstIndex === -1) return

      newDateList[firstIndex][secondIndex].schedules = [
        ...newDateList[firstIndex][secondIndex].schedules,
        schedule,
      ]
    })

    setDateList(newDateList)
  }, [currentDate])

  const getWeekContainingDate = (dateList: DateList, currentDate: Date) => {
    for (const week of dateList) {
      for (const day of week) {
        if (isSameWeek(day.date, currentDate)) {
          return week
        }
      }
    }
    return null
  }

  return {
    dateList,
    addSchedule,
    deleteSchedule,
    editSchedule,
    getWeekContainingDate,
  }
}
