import { capitalizeFirstLetter } from 'shared/utils/convert-string'

export const RULE_MESSAGES = {
  MC1: (field: string) => `Please enter ${field.toLowerCase()}`,
  MC2: (field: string, min: number, max: number) =>
    `${capitalizeFirstLetter(
      field.toLowerCase()
    )} must be between ${min} and ${max} characters`,
  MC3: (field: string, value: number) =>
    `${capitalizeFirstLetter(
      field.toLowerCase()
    )} must have at least ${value} characters`,
  MC4: (field: string, value: number) =>
    `${capitalizeFirstLetter(
      field.toLowerCase()
    )} must have maximum ${value} characters`,
  MC5: (field: string) => `Invalid ${field.toLowerCase()}`,
  EW: (field1: string, field2: string) =>
    `${capitalizeFirstLetter(
      field1.toLowerCase()
    )} must be after ${field2.toLowerCase()}`,
  MC6: (field: string) => `${field} has already existed`,
  MC8: (fieldSmall: string | number, fieldBig: string | number) =>
    `The ${fieldSmall} must be after  ${fieldBig}`,
}
