import { useState } from 'react'
import FlexBox from '../flexbox/FlexBox'
import ButtonFilter from './ButtonFilter'
import ChipField from '../input-fields/ChipField'
import StatusJobAutoComplete from '../autocomplete/status-job-autocomplete'
import { IOption } from '../autocomplete/autocomplete-base/interface'

interface Props {
  onChange: ({ id, value }: { id: string; value: IOption | null }) => void
}

const StatusJobFilter = ({ onChange }: Props) => {
  const [status, setStatus] = useState<IOption | null>()

  return (
    <FlexBox flexDirection={'column'}>
      <ButtonFilter
        inputLabel={'Status'}
        node={
          <StatusJobAutoComplete
            multiple={false}
            value={status?.value ?? ''}
            onChange={(data) => {
              setStatus(data)
              onChange?.({ id: data?.value as string, value: data })
            }}
            open={true}
            disableCloseOnSelect={true}
            textFieldProps={{
              label: 'Status',
              autoFocus: true,
            }}
          />
        }
      />
      <FlexBox gap={'10px'}>
        {status && (
          <ChipField
            label={status.label}
            onDelete={() => {
              setStatus(null)
              onChange?.({ id: '', value: null })
            }}
          />
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default StatusJobFilter
