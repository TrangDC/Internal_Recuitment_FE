import {
  FormDataSchemaCreateCandidate,
  FormDataSchemaEditCandidate,
} from 'features/candidates/shared/constants/formSchema'
import { useFormContext } from 'react-hook-form'

export const useCreateFormContext = () =>
  useFormContext<FormDataSchemaCreateCandidate>()
export const useEditFormContext = () =>
  useFormContext<FormDataSchemaEditCandidate>()
