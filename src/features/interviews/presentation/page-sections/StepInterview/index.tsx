import { useEffect, useState } from 'react'
import { IOption } from 'shared/components/autocomplete/autocomplete-base/interface'
import StepperComponent from 'shared/components/stepper'

interface Props {
  onChange?: (status: string) => void
  defaultValue?: string
}

const StepInterview = ({ onChange, defaultValue }: Props) => {
  const steps: IOption[] = [
    {
      label: 'Applied',
      value: 'applied',
    },
    {
      label: 'Interviewing',
      value: 'interviewing',
    },
    {
      label: 'Offering',
      value: 'offering',
    },
  ]
  const [stepValue, setStepValue] = useState<number>(0)

  useEffect(() => {
    const idx = steps.findIndex((item) => item.value === defaultValue);
    setStepValue(idx);
  }, [defaultValue])

  return (
    <StepperComponent
      steps={steps}
      value={stepValue}
      onChange={({data, value}) => {
        setStepValue(value)
        onChange?.(steps[value].value)
      }}
    />
  )
}

export default StepInterview
