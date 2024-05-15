import Modal from 'react-modal'
import { Schedule } from '@/types/calendar'
import { format } from 'date-fns'
import { PrimaryBtn } from '../atoms/PrimaryBtn'

type PropsType = {
  selectedSchedule: Schedule | null
  closeModal: () => void
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
}: PropsType) => {
  const deleteSchedule = () => {
    const confirmationMessage: string = `${format(
      selectedSchedule!.date,
      'yyyy年M月d日'
    )}:[${selectedSchedule!.title}]スケジュールを削除しますか？`
    const confirmDelete = window.confirm(confirmationMessage)

    if (confirmDelete) {
      alert('データが削除されました')
      closeModal()
    } else {
      alert('キャンセルされました')
      closeModal()
    }
  }

  return (
    <Modal
      isOpen={!!selectedSchedule}
      style={customStyles}
      onRequestClose={closeModal}
    >
      {selectedSchedule && (
        <div className="flex flex-col gap-8">
          <h3 className="text-center text-3xl text-lime-800 font-bold pb-5">
            {selectedSchedule.title}
          </h3>

          <p>{format(selectedSchedule.date, 'yyyy年M月d日')}</p>

          <p>{selectedSchedule.description}</p>
          <div className="flex items-center text-white gap-4">
            <PrimaryBtn size="sm" onClick={deleteSchedule}>
              削除
            </PrimaryBtn>
          </div>
        </div>
      )}
    </Modal>
  )
}
