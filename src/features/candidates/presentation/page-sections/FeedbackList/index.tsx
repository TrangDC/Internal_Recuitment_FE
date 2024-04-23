import React from 'react'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { ButtonHeader, SpanGenaration } from '../../providers/styles'
import CreateFeedbackModal from '../CreateFeedbackModal'
import useActionTable from '../../providers/hooks/useActionTable'
import { FeedBack } from 'features/candidates/domain/interfaces'
import { Add } from '@mui/icons-material'
import { Span, Tiny } from 'shared/components/Typography'
import { Box, styled } from '@mui/material'


const BoxFeedback = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.palette.grey[200]}`,
    padding: '15px',
    borderRadius: '4px',
  
    '& span': {
      fontSize: '15px',
      fontWeight: 600,
      lineHeight: '18.29px',
      color: theme.palette.grey[900],
    },
  
    '& p': {
      fontSize: '13px',
      fontWeight: 600,
      lineHeight: '15.85px',
      color: theme.palette.grey[900],
      marginTop: '10px',
    },
  }))

  

const FeedbackShow = () => {
    const { openCreate, setOpenCreate } = useActionTable<FeedBack>()


  return (
    <>
     <FlexBox flexDirection={'column'} gap={'20px'}>
          <FlexBox alignItems={'center'}>
            <SpanGenaration>Feedbacks</SpanGenaration>
            <ButtonHeader
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenCreate(true)}
            >
              Feedback
            </ButtonHeader>
          </FlexBox>
          <FlexBox flexDirection={'column'} gap={'10px'}>
            <BoxFeedback>
              <Span>Durin Nguyen</Span>
              <Tiny>
                Lorem ipsum dolor sit amet ad suspendisse blandit aliquam ut
                nulla torquent pulvinar cursus pellentesque lectus posuere est
                per eget inceptos adipiscing nibh odio felis ultricies urna
                fermentum ridiculus dolor class potenti
              </Tiny>
            </BoxFeedback>
            <BoxFeedback>
              <Span>Ariana Bui</Span>
              <Tiny>
                Lorem ipsum dolor sit amet ad suspendisse blandit aliquam ut
                nulla torquent pulvinar cursus pellentesque lectus posuere
              </Tiny>
            </BoxFeedback>
            <BoxFeedback>
              <Span>Helena Nguyen</Span>
              <Tiny>
                Lorem ipsum dolor sit amet ad suspendisse blandit aliquam ut
                nulla torquent pulvinar cursus pellentesque lectus posuere est
                per eget inceptos adipiscing nibh odio felis ultricies urna
                fermentum ridiculus dolor class potenti
              </Tiny>
            </BoxFeedback>
          </FlexBox>
        </FlexBox>
        {openCreate && (
        <CreateFeedbackModal open={openCreate} setOpen={setOpenCreate} />
      )}
    </>
  )
}

export default FeedbackShow