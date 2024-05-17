import { Dispatch, SetStateAction, useState } from 'react'
import { addMonths, addWeeks } from 'date-fns'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { PrimaryBtn } from '@/conponents/atoms/PrimaryBtn'
import { CreateScheduleModal } from './CreateScheduleModal'
import { Schedule } from '@/types/calendar'

type PropsType = {
  setCurrentDate: Dispatch<SetStateAction<Date>>
  addSchedule: (schedule: Schedule) => void
  setIsWeekly: Dispatch<SetStateAction<boolean>>
  isWeekly: boolean
}

export const CalendarNav = ({
  setCurrentDate,
  addSchedule,
  setIsWeekly,
  isWeekly,
}: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const changeToday = () => setCurrentDate(new Date())
  const goToPrev = () => {
    if (isWeekly) {
      setCurrentDate((prevDate) => addWeeks(prevDate, -1))
    } else {
      setCurrentDate((prevDate) => addMonths(prevDate, -1))
    }
  }
  const goToNext = () => {
    if (isWeekly) {
      setCurrentDate((prevDate) => addWeeks(prevDate, 1))
    } else {
      setCurrentDate((prevDate) => addMonths(prevDate, 1))
    }
  }

  return (
    <div className="w-[80%] flex justify-between mb-2">
      <div className="flex items-center text-white gap-4">
        <FaArrowAltCircleLeft
          className="text-lime-800 text-2xl"
          onClick={goToPrev}
        />
        <PrimaryBtn size="sm" onClick={changeToday}>
          今日
        </PrimaryBtn>
        <FaArrowAltCircleRight
          className="text-lime-800 text-2xl"
          onClick={goToNext}
        />
      </div>
      <PrimaryBtn size="sm" onClick={() => setIsWeekly(!isWeekly)}>
        {isWeekly ? '月表示へ' : '週表示へ'}
      </PrimaryBtn>
      <PrimaryBtn size="sm" onClick={() => setIsOpen(true)}>
        予定作成
      </PrimaryBtn>
      <CreateScheduleModal
        isOpen={isOpen}
        closeModal={closeModal}
        addSchedule={addSchedule}
      />
    </div>
  )
}
