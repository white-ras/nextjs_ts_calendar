import { CalendarBody } from '@/conponents/organisms/CalendarBody'
import { CalendarHeader } from '@/conponents/organisms/CalendarHeader'
import { getMonth } from 'date-fns'
import { useCalendar } from '@/hooks/useCalendar'
import { useState } from 'react'
import { CalendarNav } from '@/conponents/organisms/CalendarNav'

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { dateList, addSchedule, deleteSchedule, editSchedule } = useCalendar({
    currentDate: currentDate,
  })

  return (
    <>
      <div className="pt-[50px] bg-gradient-to-r from-lime-100 to-lime-200 h-screen flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl mb-5">{`${
          getMonth(currentDate) + 1
        }月`}</h1>
        <CalendarNav
          setCurrentDate={setCurrentDate}
          addSchedule={addSchedule}
        />
        <table className="w-[80%] border-collapse border-2 border-solid border-lime-800 table-fixed">
          <CalendarHeader />
          <CalendarBody
            currentDate={currentDate}
            dateList={dateList}
            deleteSchedule={deleteSchedule}
            editSchedule={editSchedule}
          />
        </table>
      </div>
    </>
  )
}
