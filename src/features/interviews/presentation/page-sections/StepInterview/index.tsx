import { StepType } from 'features/candidates/domain/interfaces'
import { useEffect, useState } from 'react'
import StepperComponent from 'shared/components/stepper'

interface Props {
  onChange?: (status: string) => void
  defaultValue: string
  steps: StepType[]
}

const StepInterview = ({ onChange, defaultValue, steps }: Props) => {
  const [stepValue, setStepValue] = useState<string>('')
  
  useEffect(() => {
    setStepValue(defaultValue);
  }, [defaultValue])

  return (
    <StepperComponent
      steps={steps}
      value={stepValue}
      onChange={({data, value}) => {
        setStepValue(value)
        onChange?.(value)
      }}
    />
  )
}

export default StepInterview
