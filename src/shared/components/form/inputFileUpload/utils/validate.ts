import { checkMaxFile, checkMaxSize, regexFile, wrapperValidate } from '.'
import { VALIDATE_FILES } from '../types'

export function handleValidate({
  files,
  lengthFileCurrent,
  validator_files,
}: {
  files: File[]
  lengthFileCurrent: number
  validator_files: VALIDATE_FILES
}) {
  let validation = {
    status: true,
    msgError: '',
  }

  if (validator_files?.max_file) {
    const maxFileValidate = wrapperValidate(
      () => checkMaxFile(lengthFileCurrent, validator_files!.max_file!.max),
      validator_files.max_file.msg_error
    )
    if (!maxFileValidate.status) return maxFileValidate
  }

  const validateFile = (file: File) => {
    if (validator_files?.is_valid) {
      const regexValidate = wrapperValidate(
        () => regexFile(file, validator_files!.is_valid!.regex),
        validator_files.is_valid.msg_error
      )
      if (!regexValidate.status) return regexValidate
    }

    if (validator_files?.max_size) {
      const maxSizeValidate = wrapperValidate(
        () => checkMaxSize(file, validator_files!.max_size!.max),
        validator_files.max_size.msg_error
      )
      return maxSizeValidate
    }
  }

  for (const file of files) {
    const fileValidation = validateFile(file)
    if (fileValidation && !fileValidation.status) {
      return fileValidation
    }
  }

  return validation
}
