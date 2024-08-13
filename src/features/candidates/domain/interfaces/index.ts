import { FormDataSchemaAttachment } from 'features/candidates/shared/constants/formSchema'
import { SchemaInputNote } from 'shared/schema'
import TalenaCandidateCV from 'shared/schema/talena/talena_candidate'

export type DeleteCandidateInput = SchemaInputNote

export type BlackListCandidateInput = {
  note: string
  is_black_list: boolean
}

export type CandidateCVData = {
  data: TalenaCandidateCV
  file: FormDataSchemaAttachment
}
