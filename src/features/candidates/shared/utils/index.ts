import { toast } from 'react-toastify'
import { checkMaxSize, regexFile } from 'shared/components/form/inputFileUpload/utils';

export const handleImportFile = async (
  file: File,
  validation: { regexString: string; maxSize: number },
  callback: (data: any) => void
) => {
  const regex = regexFile(file, validation.regexString)
  if (!regex) {
    toast.error(`One excel/csv file only, max to ${validation.maxSize}MB`)
    return
  }

  const maxSize = checkMaxSize(file, validation.maxSize)
  if (!maxSize) {
    toast.error(`One excel/csv file only, max to ${validation.maxSize}MB`)
    return
  }

  await callback(file)
}
