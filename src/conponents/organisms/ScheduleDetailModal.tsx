import Modal from 'react-modal'
import { Schedule } from '@/types/calendar'
import { format } from 'date-fns'
import { PrimaryBtn } from '@/conponents/atoms/PrimaryBtn'
import { Dispatch, useState, SetStateAction } from 'react'
import { Input } from '../atoms/Input'

type PropsType = {
  selectedSchedule: Schedule | null
  closeModal: () => void
  deleteSchedule: (schedule: Schedule) => void
  editSchedule: (schedule: Schedule, newTitle: string) => void
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '30%',
    transform: 'translate(-50%, -50%)',
  },
}

export const ScheduleDetailModal = ({
  selectedSchedule,
  closeModal,
  deleteSchedule,
  editSchedule,
  isEditing,
  setIsEditing,
}: PropsType) => {
  const [title, setTitle] = useState(
    selectedSchedule ? selectedSchedule.title : ''
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDeleteSchedule = () => {
    const confirmationMessage: string = `${format(
      selectedSchedule!.date,
      'yyyy年M月d日'
    )}:[${selectedSchedule!.title}]スケジュールを削除しますか？`
    const confirmDelete = window.confirm(confirmationMessage)

    if (confirmDelete) {
      deleteSchedule(selectedSchedule!)
      alert('データが削除されました')
      closeModal()
    } else {
      alert('キャンセルされました')
      closeModal()
    }
  }

  const handleEditSchedule = () => {
    editSchedule(selectedSchedule!, title)
    setIsEditing(false)
    closeModal()
  }

  const handleCancel = () => {
    setIsEditing(false)
    closeModal()
  }

  return (
    <Modal
      isOpen={!!selectedSchedule}
      style={customStyles}
      onRequestClose={closeModal}
    >
      {selectedSchedule && (
        <div className="flex flex-col gap-8">
          {isEditing ? (
            <>
              <Input onChange={handleChange} value={title} />
              <p>{format(selectedSchedule.date, 'yyyy年M月d日')}</p>

              <p>{selectedSchedule.description}</p>
              <div className="flex items-center text-white gap-4">
                <PrimaryBtn size="sm" onClick={handleEditSchedule}>
                  決定
                </PrimaryBtn>
                <PrimaryBtn size="sm" onClick={handleCancel}>
                  キャンセル
                </PrimaryBtn>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-center text-3xl text-lime-800 font-bold pb-5">
                {selectedSchedule.title}
              </h3>
              <p>{format(selectedSchedule.date, 'yyyy年M月d日')}</p>

              <p>{selectedSchedule.description}</p>
              <div className="flex items-center text-white gap-4">
                <PrimaryBtn
                  size="sm"
                  onClick={() => {
                    setTitle(selectedSchedule ? selectedSchedule.title : '')
                    setIsEditing(true)
                  }}
                >
                  編集
                </PrimaryBtn>
                <PrimaryBtn size="sm" onClick={handleDeleteSchedule}>
                  削除
                </PrimaryBtn>
              </div>
            </>
          )}
        </div>
      )}
    </Modal>
  )
}
