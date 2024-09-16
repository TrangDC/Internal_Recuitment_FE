import { StepConnector, StepConnectorProps, styled } from '@mui/material'
import { SpanText, TinyText } from '../form/styles'
import { get, isEmpty } from 'lodash'
import FlexBox from '../flexbox/FlexBox'
import CheckIcon from '../icons/CheckIcon'
import { STATUS_CANDIDATE_TEXT } from 'shared/constants/constants'
import { StepType } from 'features/candidatejob/domain/interfaces'
import { format } from 'date-fns'
import { CandidateStatusEnum } from 'shared/schema'
import InProcessIcon from '../icons/InProcessIcon'
import Close from '../icons/Close'

const StepperContainer = styled(FlexBox)(({ theme }) => ({
  width: '100%',
  gap: '16px',

  '& p': {
    color: '#82868C',
  },

  '& .active .MuiStepConnector-root span': {
    borderColor: theme.palette.primary[600],
    borderWidth: '2px',
  },
  '& .active p': {
    color: '#2A2E37',
  },
}))

const StepConnecterStyle = styled(StepConnector)(({ theme }) => ({
  width: '100%',
  borderColor: '#82868C !important',

  '& span': {
    borderColor: '#82868C !important',
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
  borderColor: '#82868C !important'
}))
interface StepProps {
  steps: StepType[]
  keySelect?: string
  value?: string
  inputStepConnector?: StepConnectorProps
  onChange?: ({ data, value }: { data: StepType; value: string }) => void
}

const StepperComponent = ({
  steps = [],
  value = '',
  inputStepConnector = {},
  onChange,
}: StepProps) => {
  
  return (
    <StepperContainer>
      {!isEmpty(steps) &&
        steps.map((step, idx) => {
          const {Icon, mainColor} = getStyleByCandidateStatus({status: step.candidate_job_status, isCheck: idx + 1 !== steps.length});

          return (
            <FlexBox
              alignItems={'center'}
              gap={'16px'}
              key={step.id}
              className={
                step.candidate_job_status === value ? 'completed' : 'active'
              }
            >
              <BoxStep
                className="box-step"
                onClick={() => {
                  onChange?.({ data: step, value: step.candidate_job_status })
                }}
                sx={{
                  borderColor: `${mainColor} !important`
                }}
              >
                <Icon sx={{color: mainColor}}/>
              </BoxStep>
              <FlexBox flexDirection={'column'} gap={0.5}>
                <TinyText color={`${mainColor} !important`}>
                  {STATUS_CANDIDATE_TEXT?.[get(step, 'candidate_job_status')]}
                </TinyText>
                <SpanText color={'#82868C'}>{format(
                  new Date(step.updated_at),
                  'HH:mm, dd/MM/yyyy'
                )} </SpanText>
              </FlexBox>

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

type ParamGetStyleCandidateStatus = {
  status: CandidateStatusEnum
  isCheck: boolean
}
function getStyleByCandidateStatus ({status, isCheck = true}: ParamGetStyleCandidateStatus) {
  const result = {
    Icon:  CheckIcon,
    mainColor: '#82868C'
  }

  if(isCheck) return result;

  switch(status) {
    case 'applied':
    case 'interviewing':
    case 'offering':
      result.Icon = InProcessIcon;
      result.mainColor = '#2499EF';
    break;
    case 'hired':
    case 'ex_staff':
      result.mainColor = '#20A4A9';
    break;
    case 'failed_cv':
    case 'failed_interview':
    case 'offer_lost':
      result.Icon = Close;
      result.mainColor = '#FC105C';
    break;
    default:
      throw new Error("Status not in application")
  }

  return result;
} 
