import { useCreateFormContext } from 'features/candidates/hooks/crud/useContext'
import { ChangeEvent, useState } from 'react'
import { Controller } from 'react-hook-form'
import FlexBox from 'shared/components/flexbox/FlexBox'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import AvatarUpload from 'shared/components/upload/AvatarUpload'
import useUploadFile from 'shared/components/upload/hooks/useUploadFile'
import {
  AttachmentAction,
  AttachmentFolder,
} from 'shared/schema/database/attachment'
import { v4 as uuidv4 } from 'uuid'

function CandidateAvatar() {
  const { control } = useCreateFormContext()
  const { handleUploadSASURL } = useUploadFile({})
  const [uploadState, setUploadState] = useState({
    message: '',
    url: '',
  })
  async function handOnChangeAvatar(
    e: ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) {
    if (e?.target.files) {
      const state = await handleUploadSASURL([
        {
          id: uuidv4(),
          action: AttachmentAction.UPLOAD,
          file: e?.target.files[0],
          fileName: 'avatar',
          folder: AttachmentFolder.CANDIDATE,
        },
      ])
      if (state[0].state === 'error') {
        setUploadState({
          message: 'can not upload',
          url: '',
        })
      } else {
        const url = URL.createObjectURL(state[0].file)
        setUploadState({
          message: '',
          url,
        })
        onChange(state[0].id)
      }
    }
  }
  return (
    <Controller
      control={control}
      name="avatar"
      render={({ field, fieldState }) => (
        <FlexBox flexDirection={'column'}>
          <AvatarUpload
            onChange={(e) => {
              handOnChangeAvatar(e, field.onChange)
            }}
            height={100}
            width={100}
            url={uploadState.url}
            titleTooltip={uploadState.message}
          />
          <HelperTextForm message={fieldState.error?.message}></HelperTextForm>
        </FlexBox>
      )}
    />
  )
}

export default CandidateAvatar
