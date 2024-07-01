import { useState } from 'react'
import FlexBox from '../flexbox/FlexBox'
import ButtonFilter from './ButtonFilter'
import ChipField from '../input-fields/ChipField'
import { IOption } from '../autocomplete/autocomplete-base/interface'
import PriorityAutoComplete from '../autocomplete/priority-auto-complete'

interface Props {
  onChange: ({ id, value }: { id: string; value: IOption | null }) => void
}

const PriorityFilter = ({ onChange }: Props) => {
  const [priority, setPriority] = useState<IOption | null>()

  return (
    <FlexBox flexDirection={'column'}>
      <ButtonFilter
        inputLabel={'Priority'}
        node={
          <PriorityAutoComplete
            multiple={false}
            value={priority?.value ?? ''}
            onChange={(data) => {
              setPriority(data)
              onChange?.({ id: data?.value as string, value: data })
            }}
            open={true}
            disableCloseOnSelect={true}
            textFieldProps={{
              label: 'Priority',
              autoFocus: true,
            }}
          />
        }
      />
      <FlexBox gap={'10px'}>
        {priority && (
          <ChipField
            label={priority.label}
            onDelete={() => {
              setPriority(null)
              onChange?.({ id: '', value: null })
            }}
          />
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default PriorityFilter
