import { Collapse } from '@mui/material'
import { useState } from 'react'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13sb, Tiny12md } from 'shared/components/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ShowFile from 'shared/components/input-fields/ItemFile'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import CandidateNote from 'shared/schema/database/candidate_note'
import { downloadOneFile } from 'features/candidatejob/shared/helper'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import dayjs from 'dayjs'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import BoxTextSquare from 'shared/components/utils/boxText'
import checkPermissionCandidateNote from 'features/candidates/permission/utils/checkPermissionCandidateNote'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { ActionCandidateNote } from 'features/candidates/hooks/candidate-activity/actions/useBuildActionCandidateNote'

type NodeProps = {
  candidateNote: CandidateNote
  actions: TOptionItem<CandidateNote>[]
}

function Note({ candidateNote, actions }: NodeProps) {
  const [open, setOpen] = useState(true)
  const { handleGetUrlDownload } = useGetUrlGetAttachment()
  const { role, user } = useAuthorization()
  const removeHistoryLog = candidateNote.edited
    ? actions
    : actions.filter((i) => i.id !== ActionCandidateNote.VIEW)
  const newActions = checkPermissionCandidateNote({
    actions: removeHistoryLog,
    candidateNote,
    me: user,
    role,
  })
  return (
    <FlexBox
      flexDirection={'column'}
      padding={2}
      width={'100%'}
      border={'1px solid #E3E6EB'}
      borderRadius={'4px'}
      marginTop={'16px'}
    >
      <FlexBox
        height={'24px'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginBottom={1}
        width={'100%'}
      >
        <FlexBox alignItems={'center'}
        //  onClick={() => setOpen((prev) => !prev)}
         >
          {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
          <FlexBox gap={1} alignItems={'center'}>
            <Text13sb marginLeft={1}>{candidateNote.name}</Text13sb>
            <Tiny12md color={'grey.500'}>Created by</Tiny12md>
            <Tiny12md color={'primary.600'}>
              {candidateNote.created_by.name}
            </Tiny12md>
            {candidateNote.edited && <BoxTextSquare content="Edited" />}
          </FlexBox>
        </FlexBox>
        <FlexBox alignItems={'center'} gap={1}>
          <Tiny12md color={'grey.500'}>
            {dayjs(candidateNote.created_at).format('DD/MM/YYYY')},{' '}
            {dayjs(candidateNote.created_at).format('HH:mm')}
          </Tiny12md>
          <ActionGroupButtons<CandidateNote>
            rowId={candidateNote.id}
            actions={newActions}
            rowData={candidateNote}
            iconButtonSx={{
              padding: '5px',
            }}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox flexDirection={'column'} gap={1} marginLeft={1}>
        <FlexBox flexDirection={'column'}>
          <Tiny12md color={'grey.500'}>Description</Tiny12md>
          <Text13sb>{candidateNote.description}</Text13sb>
        </FlexBox>
      </FlexBox>
      <Collapse in={open} unmountOnExit>
        <FlexBox flexWrap={'wrap'} gap={'10px'} marginLeft={1} marginTop={1}>
          {candidateNote.attachments.map((a) => (
            <ShowFile
              key={a.id}
              name={a.document_name}
              onClick={() => {
                if (a) {
                  downloadOneFile(a, handleGetUrlDownload)
                }
              }}
              IconEnd={<DownloadIcon />}
              containerSx={{
                width: 'auto',
              }}
            />
          ))}
        </FlexBox>
      </Collapse>
    </FlexBox>
  )
}

export default Note
