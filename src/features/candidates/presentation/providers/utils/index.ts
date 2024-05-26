import { toast } from 'react-toastify'
import { checkMaxSize, regexFile } from 'shared/components/input-fields/utils'
import { RULE_MESSAGES } from 'shared/constants/vaildate'

export const handleImportFile = async (
  file: File,
  validation: { regexString: string; maxSize: number },
  callback: (data: any) => void
) => {
  const regex = regexFile(file, validation.regexString)
  if (!regex) {
    toast.error(RULE_MESSAGES.MC5('file'))
    return
  }

  const maxSize = checkMaxSize(file, validation.maxSize)
  if (!maxSize) {
    toast.error(`One excel/csv file only, max to ${validation.maxSize}MB`)
    return
  }

  await callback(file)
}
