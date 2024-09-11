import { Collapse } from '@mui/material'
import { useState } from 'react'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13sb, Tiny12md } from 'shared/components/Typography'
import ShowFile from 'shared/components/input-fields/ItemFile'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import { CandidateHistoryCall } from 'shared/schema/database/candidate_history_calls'
import dayjs from 'dayjs'
import { capitalizeFirstLetter } from 'shared/utils/convert-string'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import BoxTextSquare from 'shared/components/utils/boxText'
import useGetUrlGetAttachment from 'shared/hooks/graphql/useGetUrlAttachment'
import { downloadOneFile } from 'features/candidatejob/shared/helper'
import checkPermissionCandidateHistoryCall from 'features/candidates/permission/utils/checkPermissionCandidateHistoryCall'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { ActionHistoryCall } from 'features/candidates/hooks/candidate-activity/actions/useBuildActionHistoryCall'

type CallProps = {
  candidateHistoryCall: CandidateHistoryCall
  actions: TOptionItem<CandidateHistoryCall>[]
}

function Call({ candidateHistoryCall, actions }: CallProps) {
  const [open, setOpen] = useState(true)
  const { role, user } = useAuthorization()
  const { handleGetUrlDownload } = useGetUrlGetAttachment()
  const date = dayjs(candidateHistoryCall.date).format('DD/MM/YYYY')
  const startTime = dayjs(candidateHistoryCall.start_time).format('HH:mm')
  const endTime = dayjs(candidateHistoryCall.end_time).format('HH:mm')
  const dateLabel =
    !candidateHistoryCall.start_time && !candidateHistoryCall.end_time
      ? `${date}`
      : `${date}, ${startTime} - ${dayjs(endTime).isValid() ? endTime : ''}`

  const removeHistoryLog = candidateHistoryCall.edited
    ? actions
    : actions.filter((i) => i.id !== ActionHistoryCall.VIEW)
  const newActions = checkPermissionCandidateHistoryCall({
    actions: removeHistoryLog,
    candidateHistoryCall,
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
        // onClick={() => setOpen((prev) => !prev)}
        >
          {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
          <FlexBox gap={1} alignItems={'center'}>
            <Text13sb marginLeft={1}>{candidateHistoryCall.name}</Text13sb>
            <Tiny12md color={'grey.500'}>Created by</Tiny12md>
            <Tiny12md color={'primary.600'}>
              {candidateHistoryCall.created_by.name}
            </Tiny12md>
            {candidateHistoryCall.edited && <BoxTextSquare content="Edited" />}
          </FlexBox>
        </FlexBox>
        <FlexBox alignItems={'center'} gap={1}>
          <Tiny12md color={'grey.500'}>
            {dayjs(candidateHistoryCall.createdAt).format('DD/MM/YYYY')},{' '}
            {dayjs(candidateHistoryCall.createdAt).format('HH:mm')}
          </Tiny12md>
          <ActionGroupButtons<CandidateHistoryCall>
            rowId={candidateHistoryCall.id}
            actions={newActions}
            rowData={candidateHistoryCall}
            iconButtonSx={{
              padding: '5px',
            }}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox gap={3} marginLeft={1}>
        <FlexBox flexDirection={'column'}>
          <Tiny12md color={'grey.500'}>Contact time</Tiny12md>
          <Text13sb>{dateLabel}</Text13sb>
        </FlexBox>
        <FlexBox flexDirection={'column'}>
          <Tiny12md color={'grey.500'}>Contact to</Tiny12md>
          <Text13sb>
            {capitalizeFirstLetter(candidateHistoryCall.type)}
          </Text13sb>
        </FlexBox>
        {/* {candidateHistoryCall.type === CandidateHistoryCallTypeEnum.OTHERS && (
          <FlexBox flexDirection={'column'}>
            <Tiny12md color={'grey.500'}>Contact to</Tiny12md>
            <Text13sb>{candidateHistoryCall.contact_to}</Text13sb>
          </FlexBox>
        )} */}
      </FlexBox>
      <Collapse in={open} unmountOnExit>
        <FlexBox marginLeft={1} marginTop={1} flexDirection={'column'} gap={1}>
          <FlexBox flexDirection={'column'}>
            <Tiny12md color={'grey.500'}>Description</Tiny12md>
            <Text13sb>{candidateHistoryCall.description}</Text13sb>
          </FlexBox>
          <FlexBox flexWrap={'wrap'} gap={'10px'}>
            {candidateHistoryCall.attachments.map((i) => (
              <ShowFile
                key={i.id}
                name={i.document_name}
                onClick={() => {
                  if (i) {
                    downloadOneFile(i, handleGetUrlDownload)
                  }
                }}
                IconEnd={<DownloadIcon />}
                containerSx={{
                  width: 'auto',
                }}
              />
            ))}
          </FlexBox>
        </FlexBox>
      </Collapse>
    </FlexBox>
  )
}

export default Call
