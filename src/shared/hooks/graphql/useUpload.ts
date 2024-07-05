import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import handleAuthLocalStorage from 'services/auth-local-storage-service'
const { getToken } = handleAuthLocalStorage()

interface IErrorData {
  field: string
  value: string
}
export const useImportFile = () => {
  const { t } = useTranslation()
  const [errorsData, setErrorsData] = useState<IErrorData[]>([])
  const [isloading, setIsloading] = useState(false)
  const queryClient = useQueryClient()

  const submit = async (file: Blob) => {
    const token = await getToken()
    setIsloading(true)
    const config = {
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=<calculated when request is sent>',
        Accept: '*/*',
        Authorization: `Bearer ${token?.accessToken}`,
      },
    }
    const operation = {
      query: 'mutation ($file: Upload!) { ImportCandidate (file: $file)}',
      variables: {
        file: null,
      },
    }

    const bodyFormData = new FormData()

    bodyFormData.append('operations', JSON.stringify(operation))
    bodyFormData.append('map', JSON.stringify({ 0: ['variables.file'] }))
    bodyFormData.append('0', file)

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, errors }: any = await axios.post(
        process.env.REACT_APP_ENDPOINT_API as string,
        bodyFormData,
        config
      )
      if (data) {
        if (data?.['errors'] !== 'null' && data?.['errors']) {
          const jsonData = data?.['errors']

          Array.isArray(jsonData) &&
            jsonData.forEach((error) => {
              toast.error(t(error.message))
            })

          setErrorsData(jsonData)
        } else {
          queryClient.invalidateQueries({
            queryKey: [MODLUE_QUERY_KEY.CANDIDATE],
          })
          toast.success(t('Create successfully'))
        }
      } else {
        if (errors) {
          toast.error(errors.message)
        }
      }
    } catch (error) {
      toast.error('Internal server error: ' + error)
    }
    setIsloading(false)
  }
  return {
    submit,
    errorsData,
    isloading,
  }
}
