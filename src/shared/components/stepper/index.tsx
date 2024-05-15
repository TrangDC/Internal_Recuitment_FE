import { StepConnector, StepConnectorProps, styled } from '@mui/material'
import { useState } from 'react'
import { TinyText } from '../form/styles'
import { get } from 'lodash'
import FlexBox from '../flexbox/FlexBox'
import CheckIcon from '../icons/CheckIcon'

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
}))

interface StepProps {
  steps: string[]
  keySelect?: string
  label?: string
  defaultValue?: number
  inputStepConnector?: StepConnectorProps
}

const StepperComponent = ({
  steps = [],
  label = 'name',
  defaultValue = 0,
  inputStepConnector = {},
}: StepProps) => {
  const [stepper, setStepper] = useState<{ id: number; name: string }[]>(() => {
    return steps.map((step, idx) => ({ id: idx + 1, name: step }))
  })
  const [value, setValue] = useState<number>(defaultValue)

  return (
    <StepperContainer>
      {stepper.map((step, idx) => {
        return (
          <FlexBox
            alignItems={'center'}
            gap={'16px'}
            key={step.id}
            className={
              step.id - value < 0
                ? 'active'
                : step.id - value === 0
                  ? 'completed'
                  : ''
            }
          >
            <BoxStep className="box-step">
              <CheckIcon />
            </BoxStep>
            <TinyText>{get(step, label)}</TinyText>
            {stepper.length - idx > 1 ? (
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
