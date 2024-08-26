import { CandidateCVData } from 'features/candidates/domain/interfaces'
import { FormDataSchemaAttachment } from 'features/candidates/shared/constants/formSchema'
import { useState } from 'react'
import { toast } from 'react-toastify'
import TalenaApiService from 'services/talena-api-services'
import { FileUploadAttachment } from 'shared/components/form/uploadFileBox/types'
import { UploadCVState } from 'shared/schema/talena/talena_candidate'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

type UseImportCVProps = {
  onSuccess: (data: CandidateCVData) => void
}

function useImportCV({ onSuccess }: UseImportCVProps) {
  const [loading, setLoading] = useState<UploadCVState>('INIT')
  async function importCV(attachment: FileUploadAttachment) {
    const file = attachment.file
    const attachmentData: FormDataSchemaAttachment = {
      document_id: attachment.document_id,
      document_name: attachment.document_name,
      id: attachment.id,
      file: null,
      status: 'old',
      url: '',
    }
    if (file) {
      setLoading('UPLOADING')
      const formData = new FormData()
      formData.append('file', file)
      const cvData = await TalenaApiService.extractCV(formData)
      if (isRight(cvData)) {
        const data = unwrapEither(cvData)
        if (data.state === 'FAILED') {
          toast.error('Invalid CV. Please try another file')
          return setLoading('FAILED')
        }
        if (data.state === 'DONE' || data.state === 'DUPLICATED') {
          onSuccess({
            data: data,
            file: attachmentData,
          })
        }
        setLoading('DONE')
        toast.success('CV import success')
      } else {
        setLoading('FAILED')
      }
    }
  }
  return {
    importCV,
    loading,
  }
}

export default useImportCV
