import { Box } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Fragment, useMemo } from 'react'
import BaseModal from 'shared/components/modal'
import { Job } from 'features/jobs/domain/interfaces'
import HistoryLog from '../HistoryLog'
import TabCustomize from 'shared/components/tab'
import GeneralInformationField from '../GeneralInformationField'
import CloseIcon from '@mui/icons-material/Close'
import { JobStatus } from 'shared/class/job-status'
import EditIconJobDetailPermission from 'features/jobs/permission/components/EditIconJobDetailPermission'

interface ITabJobDetail {
  open: boolean
  setOpen: (value: boolean) => void
  job_detail: Job
  handleOpenModalEdit: (id: string) => void
}

export default function TabJobDetail({
  open,
  setOpen,
  job_detail,
  handleOpenModalEdit
}: ITabJobDetail) {
  const renderItem = [
    {
      label: 'Information',
      Component: GeneralInformationField,
    },
    { label: 'History Log', Component: HistoryLog },
  ]

  const showEdit = useMemo(() => {
    return job_detail.status === JobStatus.STATUS_HIRING_JOB.OPENED
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
                <EditIconJobDetailPermission
                  job_detail={job_detail}
                  onClick={() => {
                    handleOpenModalEdit(job_detail.id)
                  }}
                />
              )}
              <CloseIcon
                sx={{
                  height: '24px',
                  width: '24px',
                  color: '#82868C',
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
    </Fragment>
  )
}
