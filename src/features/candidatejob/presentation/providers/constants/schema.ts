import * as yup from 'yup'

export const schema = yup.object({
  team_id: yup.object(),
  candidate_id: yup.string().required(),
  hiring_job_id: yup.object().required(),
  status: yup.object().required(),
  attachments: yup.mixed(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const chemaChangeStatus = yup.object({
  id: yup.string().required(),
  status: yup.object().required(),
  attachments: yup.mixed(),
  feedback: yup.string(),
})

export type FormDataSchemaChangeStatus = yup.InferType<typeof chemaChangeStatus>