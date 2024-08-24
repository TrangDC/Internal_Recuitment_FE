import { JobDescriptionData } from 'features/jobs/domain/interfaces'
import { useState } from 'react'
import TalenaApiService, { GenerateJDPayload } from 'services/talena-api-services'
import { UploadFormData } from 'shared/schema/talena/talena_jd'

import { isRight, unwrapEither } from 'shared/utils/handleEither'

type UseGenerateJDProps = {
  onSuccess: (data: JobDescriptionData) => void
}

function useGenerateJD({ onSuccess }: UseGenerateJDProps) {
  const [loading, setLoading] = useState<UploadFormData>('INIT')
  async function generateJD(data:GenerateJDPayload) {
    setLoading('UPLOADING')
    const jdData = await TalenaApiService.generateJD(data)
    if (isRight(jdData)) {
      const data = unwrapEither(jdData)
      onSuccess({
        data: data,
      })
      setLoading('DONE')
    }
  }

  return {
    generateJD,
    loading,
  }
}

export default useGenerateJD
