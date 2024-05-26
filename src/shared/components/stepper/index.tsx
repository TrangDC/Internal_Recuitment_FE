import { StepConnector, StepConnectorProps, styled } from '@mui/material'
import { TinyText } from '../form/styles'
import { get } from 'lodash'
import FlexBox from '../flexbox/FlexBox'
import CheckIcon from '../icons/CheckIcon'
import { IOption } from '../autocomplete/autocomplete-base/interface'

const StepperContainer = styled(FlexBox)(({ theme }) => ({
  width: '100%',
  gap: '16px',

  '& p': {
    color: '#82868C',
  },

  '& .active .box-step svg path': {
    fill: theme.palette.primary[600],
  },
  '& .active .box-step': {
    borderColor: theme.palette.primary[600],
  },
  '& .active .MuiStepConnector-root span': {
    borderColor: theme.palette.primary[600],
    borderWidth: '2px',
  },
  '& .active p': {
    color: '#2A2E37',
  },

  '& .completed .box-step svg path': {
    fill: 'white',
  },
  '& .completed .box-step': {
    borderColor: '#1F84EB',
    backgroundColor: '#1F84EB',
  },
  '& .completed p': {
    color: '#1F84EB',
  },
}))

const StepConnecterStyle = styled(StepConnector)(({ theme }) => ({
  width: '100%',

  '&.active span': {
    borderColor: '#1F84EB',
  },

  '& span': {
    borderWidth: '1.5px',
  },
}))

const BoxStep = styled(FlexBox)(({ theme }) => ({
  width: '36px',
  height: '36px',
  border: `1px solid ${theme.palette.grey[400]}`,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  cursor: 'pointer',
}))

interface StepProps {
  steps: {label: string, value: string}[]
  keySelect?: string
  value?: number
  inputStepConnector?: StepConnectorProps
  onChange?: ({data, value}: {data: IOption, value: number}) => void;
}

const StepperComponent = ({
  steps = [],
  value = 0,
  inputStepConnector = {},
  onChange,
}: StepProps) => {

  return (
    <StepperContainer>
      {steps.map((step, idx) => {
        return (
          <FlexBox
            alignItems={'center'}
            gap={'16px'}
            key={idx}
            className={
              idx - value < 0
                ? 'active'
                : idx - value === 0
                  ? 'completed'
                  : ''
            }
          >
            <BoxStep className="box-step" onClick={() => {
                onChange?.({data: step, value: idx})
              }}>
              <CheckIcon />
            </BoxStep>
            <TinyText>{get(step, 'label')}</TinyText>
            {steps.length - idx > 1 ? (
              <StepConnecterStyle
                sx={{
                  width: '60px',
                  maxWidth: '100%',
                }}
                {...inputStepConnector}
              />
            ) : null}
          </FlexBox>
        )
      })}
    </StepperContainer>
  )
}

export default StepperComponent
