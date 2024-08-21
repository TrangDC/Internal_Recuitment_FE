import { Box, Collapse } from '@mui/material'
import { useState } from 'react'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text13sb, Tiny12md } from 'shared/components/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import OutgoingEmail from 'shared/schema/database/out_going_email'
import dayjs from 'dayjs'
import ChipEmailStatus from 'shared/components/chip/ChipEmailStatus'

type EmailProps = {
  outgoingEmail: OutgoingEmail
}

function Email({ outgoingEmail }: EmailProps) {
  const [open, setOpen] = useState(false)

  const date = dayjs(outgoingEmail.created_at).format('DD/MM/YYYY')
  const time = dayjs(outgoingEmail.created_at).format('HH:mm')
  const dateLabel = `${date}, ${time}`

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
        <FlexBox alignItems={'center'} onClick={() => setOpen((prev) => !prev)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          <Text13sb marginLeft={1}>
            {`Email send to  <${outgoingEmail.to.reduce((a, b) => a + ' ' + b, '')}> when ${outgoingEmail.recipient_type}`}
          </Text13sb>
        </FlexBox>
        <Tiny12md color={'grey.500'}>{dateLabel}</Tiny12md>
      </FlexBox>
      <FlexBox gap={3} marginLeft={4}>
        <FlexBox
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Text13sb color={'primary.600'}>{outgoingEmail.subject}</Text13sb>
          <ChipEmailStatus status={outgoingEmail.status} />
        </FlexBox>
      </FlexBox>
      <Collapse in={open} unmountOnExit>
        <Box marginLeft={4}>
          <div
            dangerouslySetInnerHTML={{
              __html: outgoingEmail.content,
            }}
          ></div>
        </Box>
      </Collapse>
    </FlexBox>
  )
}

export default Email
