import { H3, Text15md, Tiny } from 'shared/components/Typography'
import { BoxCandidateInfor } from '../../components/Container'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Box } from '@mui/material'
import dayjs from 'dayjs'

type CandidateAboutProps = {
  name: string
  email: string
  address: string
  gender: string
  phone: string
  dob: string
}

function CandidateAbout({
  gender,
  phone,
  address,
  dob,
  email,
  name,
}: CandidateAboutProps) {
  return (
    <BoxCandidateInfor>
      <H3 sx={{ color: 'primary.800', fontWeight: 500 }} marginBottom={1}>
        About the candidate
      </H3>
      <FlexBox>
        <FlexBox display="flex" flexDirection="column" flex="1">
          <Box marginY="4px">
            <Tiny>Name</Tiny>
            <Text15md color={'grey.900'}>{name}</Text15md>
          </Box>
          <Box marginY="4px">
            <Tiny>Email</Tiny>
            <Text15md color={'grey.900'}>{email}</Text15md>
          </Box>
          <Box marginY="4px">
            <Tiny>Address</Tiny>
            <Text15md color={'grey.900'}>{address}</Text15md>
          </Box>
        </FlexBox>

        <FlexBox display="flex" flexDirection="column" flex="1">
          <Box marginY="4px">
            <Tiny>Gender</Tiny>
            <Text15md color={'grey.900'}>{gender}</Text15md>
          </Box>
          <Box marginY="4px">
            <Tiny>Phone</Tiny>
            <Text15md color={'grey.900'}>{phone}</Text15md>
          </Box>
          <Box marginY="4px">
            <Tiny>DOB</Tiny>
            {dob && <Text15md>{dayjs(dob).format('DD/MM/YYYY')}</Text15md>}
          </Box>
        </FlexBox>
      </FlexBox>
    </BoxCandidateInfor>
  )
}

export default CandidateAbout
