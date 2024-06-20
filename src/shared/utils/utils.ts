import { formatISO } from 'date-fns'
import _, { isEmpty } from 'lodash'
import { FormState } from 'react-hook-form'
import { BaseRecord } from 'shared/interfaces'

export const searchByName = (listData: any[], searchValue: string) => {
  if (searchValue.length > 0) {
    const searchResult = listData.filter((item) =>
      item.name.toLocaleLowerCase().match(searchValue.toLowerCase())
    )
    return searchResult
  } else {
    return listData
  }
}

export const getRoute = (pathname: string) => {
  const str = pathname.split('/')
  return `/${str[1]}`
}
/**
 *
 * @param key of localstorge
 */
const getStatusByKey = (key: string) => {
  const value = window.localStorage.getItem(key)
  return value ? JSON.parse(value) : value
}

const updateStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const deleteLocalStorge = (key: string) => {
  window.localStorage.removeItem(key)
}

export const handleLocalStorage = () => {
  return {
    getStatusByKey,
    updateStorage,
    deleteLocalStorge,
  }
}

export const transformListItem = (array: any[], name: string = 'id') => {
  return array.map((item) => item?.[name])
}

export const transformListArray = (
  array: any[],
  name: string | string[] = 'id'
) => {
  const value_selected = [Array.isArray(name) ? [...name] : name].flat()

  return array.map((item) =>
    getInfoData({ field: value_selected, object: item })
  )
}

export const findItem = (
  array: any[],
  value: string,
  key: string = 'value'
) => {
  if (isEmpty(array) || !value) return null
  return array.find((data) => data[key] === value)
}

export const getInfoData = ({
  field = [],
  object = {},
}: {
  field: string[]
  object: object
}) => {
  return _.pick(object, field)
}

export const removeInfoData = ({
  field = [],
  object = {},
}: {
  field: string[]
  object: object
}) => {
  return _.omit(object, field)
}

export const getValueOfObj = ({
  key,
  obj,
}: {
  key: string
  obj: Record<string, any>
}) => {
  if (!obj || !key) return null
  return obj.hasOwnProperty(key) ? obj[key] : null
}

export const valueNotExist = (exist: any, preventive: any) => {
  return exist ? preventive : preventive
}

export const removeNonExistInObj = (obj: Record<string, any>) => {
  let newObj: Record<string, any> = {}

  Object.keys(obj).forEach((item) => {
    if (_.isObject(obj[item] && !Array.isArray(obj[item]))) {
      newObj[item] = removeInfoData(obj[item])
    } else if (obj[item] !== undefined && obj[item] !== null) {
      newObj[item] = obj[item]
    }
  })

  return newObj
}

export const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const convertDateToISOString = (date: string | Date) => {
  return formatISO(new Date(date))
}

export const convertSizeToMb = (size: number) => {
  let roundSize = Math.round(size / 1024)

  if (roundSize < 1024) return `${roundSize} KB`
  if (roundSize < 1024 * 1024) return `${Math.round(roundSize / 1024)} MB`
  return `${Math.round(roundSize / (1024 * 1024))} GB`
}

export const convertEmptyToNull = (array: any[]) => {
  return !isEmpty(array) ? array : null
}

export const convertCurrencyToNumber = (currency: string) => {
  return Number(currency.replaceAll(',', ''))
}

export const downloadFile = (url: string) => {
  const link = document.createElement('a')
  link.href = url
  //@ts-ignore
  link.download = url.split('/').pop()
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const getValueByKey = (obj: any, key: string): string | null => {
  return _.get(obj, key)
}

export const hasDirtyField = (formState: FormState<BaseRecord>): boolean => {
  return Object.keys(formState.dirtyFields).length > 0
}

//@ts-ignore
export const base64ToBlob = (base64, mimeType) => {
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}

//@ts-ignore
export const downloadBase64File = (base64, fileName, mimeType) => {
  const blob = base64ToBlob(base64, mimeType)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function formatCurrency(
  number: number,
  locale: string = 'en-US'
): string {
  return number.toLocaleString(locale)
}

export const removeStatusAttachment = (
  attachments: any[] | undefined
) => {
  let result = attachments && Array.isArray(attachments) ? attachments : []

  return transformListArray(result, ['document_id', 'document_name'])
}
