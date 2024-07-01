import { useState } from 'react'
import FlexBox from '../flexbox/FlexBox'
import ButtonFilter from './ButtonFilter'
import ChipField from '../input-fields/ChipField'
import FailedReasonAutoComplete from '../autocomplete/failed-reason-auto-complete'
import { IOption } from '../autocomplete/autocomplete-base/interface'

interface Props {
  onChange: ({ ids, value }: { ids: string[]; value: IOption[] }) => void
}

const FailedReasonFilter = ({ onChange }: Props) => {
  const [failedReason, setFailedReason] = useState<IOption[]>([])

  return (
    <FlexBox flexDirection={'column'}>
      <ButtonFilter
        inputLabel={'Failed reason'}
        node={
          <FailedReasonAutoComplete
            multiple
            value={failedReason.map((item) => item.value)}
            onChange={(data: IOption[]) => {
              const ids = data.map((item) => item.value)
              setFailedReason(data)

              onChange?.({ ids, value: data })
            }}
            open={true}
            disableCloseOnSelect={true}
            textFieldProps={{
              label: 'Failed reason',
              autoFocus: true,
            }}
          />
        }
      />
      <FlexBox gap={'10px'}>
        {failedReason.map((fr, idx) => {
          return (
            <ChipField
              key={idx}
              label={fr.label}
              onDelete={() => {
                const failedReasonFilter = failedReason.filter(
                  (item) => item.value !== fr.value
                )
                const ids = failedReasonFilter.map((item) => item.value)
                setFailedReason(failedReasonFilter)

                onChange?.({ ids, value: failedReasonFilter })
              }}
            />
          )
        })}
      </FlexBox>
    </FlexBox>
  )
}

export default FailedReasonFilter
