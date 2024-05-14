import { Box, Grid, styled } from '@mui/material'
import { H3, Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { DivField } from '../../providers/styles'
import useCandidateDetail from '../../providers/hooks/useCandidateDetail'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import useTextTranslation from 'shared/constants/text'

const DivWrapperField = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '24px 16px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}))

const GeneralInformationField = () => {
  const { id } = useParams();
  const { candidateDetail } = useCandidateDetail(id as string);

  const translation = useTextTranslation();

  return (
    <DivWrapperField>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <H3>{candidateDetail.name}</H3>
        </Grid>
        <Grid item xs={12}>
          <FlexBox gap={'60px'}>
            <DivField>
              <Span>{translation.COMMON.name}</Span>
              <Tiny>{candidateDetail.name}</Tiny>
            </DivField>
            <DivField>
              <Span>{translation.COMMON.email}</Span>
              <Tiny>{candidateDetail.email}</Tiny>
            </DivField>
            <DivField>
              <Span>{translation.COMMON.phone_number}</Span>
              <Tiny>{candidateDetail.phone}</Tiny>
            </DivField>
            <DivField>
              <Span>{translation.COMMON.dob}</Span>
              <Tiny>
                {candidateDetail.dob && format(new Date(candidateDetail.dob), 'dd/MM/yyyy')}
                </Tiny>
            </DivField>
          </FlexBox>
        </Grid>
      </Grid>
    </DivWrapperField>
  )
}

export default GeneralInformationField
