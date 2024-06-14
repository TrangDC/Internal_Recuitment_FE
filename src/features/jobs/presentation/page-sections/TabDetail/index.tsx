import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Fragment, useMemo } from 'react'
import BaseModal from 'shared/components/modal'
import { Job } from 'features/jobs/domain/interfaces'
import HistoryLog from '../HistoryLog'
import TabCustomize from 'shared/components/tab'
import GeneralInformationField from '../GeneralInformationField'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from 'shared/components/icons/EditIcon'
import useActionTable from '../../providers/hooks/useActionTable'
import EditJobModal from '../EditJobModal'
import { JobStatus } from 'shared/class/job-status'

interface ITabJobDetail {
  open: boolean
  setOpen: (value: boolean) => void
  job_detail: Job
}

export default function TabJobDetail({
  open,
  setOpen,
  job_detail,
}: ITabJobDetail) {
  const renderItem = [
    {
      label: 'Information',
      Component: GeneralInformationField,
    },
    { label: 'History Log', Component: HistoryLog },
  ]

  const { openEdit, setOpenEdit, handleOpenEdit, rowId } =
    useActionTable()

  const showEdit = useMemo(() => {
    return job_detail.status === JobStatus.STATUS_STATE.OPENED
  }, [job_detail?.status])

  return (
    <Fragment>
      <BaseModal.Wrapper open={open} setOpen={setOpen} maxWidth={1200}>
        <BaseModal.Header
          title="Job details"
          setOpen={setOpen}
          EndHeader={
            <FlexBox>
              {showEdit && (
                <EditIcon
                  sx={{
                    height: '24px',
                    width: '24px',
                    color: "#82868C",
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    handleOpenEdit(job_detail.id)
                  }}
                />
              )}

              <CloseIcon
                sx={{
                  height: '24px',
                  width: '24px',
                  color: "#82868C",
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setOpen(false)
                }}
              />
            </FlexBox>
          }
        ></BaseModal.Header>
        <BaseModal.ContentMain maxHeight="500px" sxContentMain={{ padding: 0 }}>
          <Box sx={{ width: '100%' }}>
            <TabCustomize
              renderItem={renderItem}
              TabListProps={{ orientation: 'vertical' }}
            />
          </Box>
        </BaseModal.ContentMain>
      </BaseModal.Wrapper>

      {openEdit && (
        <EditJobModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}
    </Fragment>
  )
}
