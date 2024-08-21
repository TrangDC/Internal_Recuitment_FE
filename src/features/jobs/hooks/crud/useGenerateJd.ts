import { JobDescriptionData } from 'features/jobs/domain/interfaces'
import { useState } from 'react'
import TalenaApiService from 'services/talena-api-services'
import { UploadFormData } from 'shared/schema/talena/talena_jd'

import { isRight, unwrapEither } from 'shared/utils/handleEither'

type UseGenerateJDProps = {
  onSuccess: (data: JobDescriptionData) => void
  formData: {
    name: string
    title: string
    workingLocation: string
    salaryFrom: number
    salaryTo: number
    currency?: string | ''
    staffLevel: string
    working_hour_from: '8:30'
    working_hour_to: '17:30'
  }
}

function useGenerateJD({ onSuccess, formData }: UseGenerateJDProps) {
  const [loading, setLoading] = useState<UploadFormData>('INIT')
  async function generateJD() {
    setLoading('UPLOADING')
    const body = new FormData()
    body.append('name', formData.name)
    body.append('title', formData.title)
    body.append('working_location', formData.workingLocation)
    body.append('salary_from', formData.salaryFrom.toString())
    body.append('salary_to', formData.salaryTo.toString())
    body.append('currency', formData.currency || '')
    body.append('working_hour_from', formData.working_hour_from)
    body.append('working_hour_to', formData.working_hour_to)
    body.append('employment_type', '')
    body.append('employee_level', formData.staffLevel)

    const jdData = await TalenaApiService.generateJD(body)

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
