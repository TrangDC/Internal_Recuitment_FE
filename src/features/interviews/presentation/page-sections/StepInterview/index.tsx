import StepperComponent from 'shared/components/stepper'

const StepInterview = () => {
  const steps = ['Offering', 'Interviewing', 'Applied']

  return <StepperComponent steps={steps} defaultValue={2} />
}

export default StepInterview
