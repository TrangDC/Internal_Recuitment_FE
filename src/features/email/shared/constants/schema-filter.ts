import { createSchemaFilter } from 'shared/components/table/functions'

const customInterfaceEmail = createSchemaFilter({
  event: 'string',
})

export type EmailFilter = typeof customInterfaceEmail