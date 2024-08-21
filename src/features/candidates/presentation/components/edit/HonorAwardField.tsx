import { FormControl } from '@mui/material'
import { Controller } from 'react-hook-form'
import FlexBox from 'shared/components/flexbox/FlexBox'
import UploadFileBox from 'shared/components/form/uploadFileBox'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import UploadIconSmall from 'shared/components/icons/UploadIconSmall'
import AppDateField from 'shared/components/input-fields/AppDateField'
import AppTextField from 'shared/components/input-fields/AppTextField'
import { Text13sb, Text15sb, Tiny12md } from 'shared/components/Typography'
import BoxContainer from '../BoxContainer'
import DeleteBox from '../DeleteBox'
import { useCreateFormContext } from 'features/candidates/hooks/crud/useContext'
import dayjs from 'dayjs'

type HonorAwardFieldProps = {
  index: number
  onDelete: () => void
  name: 'candidate_award'
}

function HonorAwardField({ index, onDelete, name }: HonorAwardFieldProps) {
  const { control } = useCreateFormContext()
  return (
    <FlexBox width={'100%'} gap={2} marginBottom={2}>
      <BoxContainer flex={1}>
        <FlexBox
          alignItems={'center'}
          justifyContent={'space-between'}
          marginBottom={2}
        >
          <Text15sb>Honor/ Awards {index + 1}</Text15sb>
        </FlexBox>
        <FlexBox flexDirection={'column'} gap={2}>
          <FlexBox gap={2}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name={`${name}.${index}.name`}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppTextField
                      value={field.value}
                      onChange={field.onChange}
                      label="Name"
                      size="small"
                      required
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </FlexBox>
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                control={control}
                name={`${name}.${index}.achieved_date`}
                render={({ field, fieldState }) => (
                  <FlexBox flexDirection={'column'}>
                    <AppDateField
                      value={field.value ? dayjs(field.value) : null}
                      onChange={field.onChange}
                      label="Achieved date"
                    />
                    <HelperTextForm
                      message={fieldState.error?.message}
                    ></HelperTextForm>
                  </FlexBox>
                )}
              />
            </FormControl>
          </FlexBox>
          <Controller
            name={`${name}.${index}.attachments`}
            shouldUnregister
            control={control}
            render={({ field, fieldState }) => (
              <FlexBox flexDirection={'column'}>
                <UploadFileBox
                  name={field.name}
                  Icon={<UploadIconSmall />}
                  multiple={true}
                  onChange={field.onChange}
                  validator_files={{
                    max_file: {
                      max: 10,
                      msg_error: 'Up to 10 files and 20MB/file',
                    },
                    max_size: {
                      max: 20,
                      msg_error: 'Up to 10 files and 20MB/file',
                    },
                  }}
                  descriptionFile={() => (
                    <FlexBox flexDirection={'column'} alignItems={'flex-start'}>
                      <Text13sb>Attach file</Text13sb>
                      <Tiny12md>Up to 10 files and 20MB/file</Tiny12md>
                    </FlexBox>
                  )}
                  folder="candidate"
                  value={field.value || []}
                  boxContainerSx={{
                    width: 400,
                    padding: '10px 6px',
                  }}
                />
                <HelperTextForm
                  message={fieldState.error?.message}
                ></HelperTextForm>
              </FlexBox>
            )}
          />
        </FlexBox>
      </BoxContainer>
      <DeleteBox onClick={onDelete} />
    </FlexBox>
  )
}

export default HonorAwardField
