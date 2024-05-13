import { CalendarBody } from '@/conponents/organisms/CalendarBody'
import { CalendarHeader } from '@/conponents/organisms/CalendarHeader'
import { getMonth } from 'date-fns'
import { useCalendar } from '@/hooks/useCalendar'

export default function Home() {
  const today = new Date()
  const { dateList } = useCalendar({ currentDate: today })

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
