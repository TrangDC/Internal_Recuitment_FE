import { createContext, MutableRefObject, ReactNode, useContext } from 'react'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import CandidateNote from 'shared/schema/database/candidate_note'
import { CandidateHistoryCall } from 'shared/schema/database/candidate_history_calls'
import EditHistoryCallModal from 'features/candidates/presentation/page-sections/EditHistoryCallModal'
import DeleteCandidateNoteModal from 'features/candidates/presentation/page-sections/DeleteCandidateNoteModal'
import DeleteHistoryCallModal from 'features/candidates/presentation/page-sections/DeleteHistoryCallModal'
import EditCandidateNoteModal from 'features/candidates/presentation/page-sections/EditCandidateNoteModal'
import { useQueryClient } from '@tanstack/react-query'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import useActionCandidateNote, {
  UseActionCandidateNoteReturn,
} from 'features/candidates/hooks/candidate-activity/actions/useActionCandidateNote'
import useActionHistoryCall, {
  UseActionHistoryCallReturn,
} from 'features/candidates/hooks/candidate-activity/actions/useActionHistoryCall'
import useActivityFilter, {
  CandidateActivityFilters,
} from 'features/candidates/hooks/candidate-activity/filters/useActivityFilter'
import useBuildActionCandidateNote from 'features/candidates/hooks/candidate-activity/actions/useBuildActionCandidateNote'
import useBuildActionHistoryCall from 'features/candidates/hooks/candidate-activity/actions/useBuildActionHistoryCall'
import { Dayjs } from 'dayjs'
import DetailCandidateNoteModal from 'features/candidates/presentation/page-sections/DetailCandidateNoteModal'
import DetailCandidateHistoryCallModal from 'features/candidates/presentation/page-sections/DetailCandidateHistoryCallModal'
// --------------------------------------------------------

// props type
type CandidateActivityContextProps = { children: ReactNode }
// --------------------------------------------------------

interface ICandidateActivityContext {
  noteOptionActions: TOptionItem<CandidateNote>[]
  historyCallOptionActions: TOptionItem<CandidateHistoryCall>[]
  noteActions: UseActionCandidateNoteReturn | {}
  historyCallActions: UseActionHistoryCallReturn | {}
  filters: CandidateActivityFilters
  handleSearch: () => void
  searchRef: MutableRefObject<null>
  handleOnChangeDate: (key: 'fromDate' | 'toDate', value: Dayjs | null) => void
}

const CandidateActivityContext = createContext<ICandidateActivityContext>({
  noteOptionActions: [],
  historyCallOptionActions: [],
  historyCallActions: {},
  noteActions: {},
  filters: {
    search: '',
    fromDate: null,
    toDate: null,
  },
  handleSearch: () => {},
  searchRef: { current: null },
  handleOnChangeDate: (key, value) => {},
})

export const CandidateActivityProvider = ({
  children,
}: CandidateActivityContextProps) => {
  const queryClient = useQueryClient()
  const { filters, handleSearch, searchRef, handleOnChangeDate } =
    useActivityFilter()
  const useActionCandidateNoteReturn = useActionCandidateNote()
  const useActionHistoryCallReturn = useActionHistoryCall()
  const { actions: noteOptionActions } = useBuildActionCandidateNote({
    handleOpenDelete: useActionCandidateNoteReturn.handleOpenDelete,
    handleOpenEdit: useActionCandidateNoteReturn.handleOpenEdit,
    handleOpenDetail: useActionCandidateNoteReturn.handleOpenDetail,
  })

  const { actions: historyCallOptionActions } = useBuildActionHistoryCall({
    handleOpenDelete: useActionHistoryCallReturn.handleOpenDelete,
    handleOpenEdit: useActionHistoryCallReturn.handleOpenEdit,
    handleOpenDetail: useActionHistoryCallReturn.handleOpenDetail,
  })

  function refreshList() {
    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.CANDIDATE_ACTIVITY],
    })
    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.CANDIDATE_NOTE],
    })
    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.CANDIDATE_HISTORY_CALL],
    })
  }

  return (
    <CandidateActivityContext.Provider
      value={{
        noteOptionActions,
        historyCallOptionActions,
        historyCallActions: useActionHistoryCallReturn,
        noteActions: useActionCandidateNoteReturn,
        handleSearch,
        filters,
        searchRef,
        handleOnChangeDate,
      }}
    >
      {children}

      {useActionHistoryCallReturn.openEdit && (
        <EditHistoryCallModal
          id={useActionHistoryCallReturn.rowId}
          open={useActionHistoryCallReturn.openEdit}
          setOpen={useActionHistoryCallReturn.setOpenEdit}
          successCallback={refreshList}
        />
      )}
      {useActionHistoryCallReturn.openDelete && (
        <DeleteHistoryCallModal
          id={useActionHistoryCallReturn.rowId}
          open={useActionHistoryCallReturn.openDelete}
          setOpen={useActionHistoryCallReturn.setOpenDelete}
          successCallback={refreshList}
        />
      )}
      {useActionCandidateNoteReturn.openDelete && (
        <DeleteCandidateNoteModal
          id={useActionCandidateNoteReturn.rowId}
          open={useActionCandidateNoteReturn.openDelete}
          setOpen={useActionCandidateNoteReturn.setOpenDelete}
          successCallback={refreshList}
        />
      )}
      {useActionCandidateNoteReturn.openEdit && (
        <EditCandidateNoteModal
          id={useActionCandidateNoteReturn.rowId}
          open={useActionCandidateNoteReturn.openEdit}
          setOpen={useActionCandidateNoteReturn.setOpenEdit}
          successCallback={refreshList}
        />
      )}
      {useActionCandidateNoteReturn.openDetail && (
        <DetailCandidateNoteModal
          id={useActionCandidateNoteReturn.rowId}
          open={useActionCandidateNoteReturn.openDetail}
          setOpen={useActionCandidateNoteReturn.setOpenDetail}
        />
      )}
      {useActionHistoryCallReturn.openDetail && (
        <DetailCandidateHistoryCallModal
          id={useActionHistoryCallReturn.rowId}
          open={useActionHistoryCallReturn.openDetail}
          setOpen={useActionHistoryCallReturn.setOpenDetail}
        />
      )}
    </CandidateActivityContext.Provider>
  )
}

export const useCandidateActivityContext = () =>
  useContext(CandidateActivityContext)
