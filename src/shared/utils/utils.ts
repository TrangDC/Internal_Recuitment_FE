import { formatISO } from 'date-fns'
import dayjs from 'dayjs'
import _, { cloneDeep, isEmpty } from 'lodash'
import { FormState } from 'react-hook-form'
import { ToastCopyClipBoard } from 'shared/components/toast/toastCopyClipBoard'
import { SELECTED_SKILL } from 'shared/components/tree/skill-tree'
import { BaseRecord, DATA_KEYWORD_TEMPLATE } from 'shared/interfaces'
import utc from 'dayjs/plugin/utc'
import EntitySkillType from 'shared/schema/database/entity_skill_type'
import { NewAttachmentInput } from 'shared/schema/database/candidate_job'
import { EntitySkillRecordInput } from 'shared/schema/database/hiring_job'

dayjs.extend(utc)

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

export const removeEmptyInObject = (obj: Record<string, any>) => {
  let newObj: Record<string, any> = {}

  Object.keys(obj).forEach((item) => {
    if (Array.isArray(obj[item]) && isEmpty(obj[item])) {
      newObj[item] = undefined
      return
    }
    newObj[item] = obj[item]
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
): NewAttachmentInput[] => {
  let result =
    attachments && Array.isArray(attachments)
      ? attachments.map((file) => ({ ...file, id: file?.id ?? '' }))
      : []

  return transformListArray(result, [
    'document_id',
    'document_name',
    'id',
  ]) as NewAttachmentInput[]
}

export const handleCopyClipBoard = (url: string, content: string) => {
  const htmlLink = `<a href="${url}">${content}</a>`
  const textLink = url
  const typeHtml = 'text/html'
  const typeText = 'text/plain'

  const blobHtml = new Blob([htmlLink], { type: typeHtml })
  const blobText = new Blob([textLink], { type: typeText })

  const data = [
    new ClipboardItem({ [typeHtml]: blobHtml, [typeText]: blobText }),
  ]

  navigator.clipboard
    .write(data)
    .then(() => {
      ToastCopyClipBoard({
        type: 'success',
        content: 'Copied to clipboard!',
      })
    })
    .catch(() => {
      ToastCopyClipBoard({
        type: 'error',
        content: 'Copy to clipboard failed',
      })
    })
}

export const getDomain = () => {
  const currentUrl = window.location.href
  const url = new URL(currentUrl)
  const domain = `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ''}`
  return domain
}

export async function previewFile(files: string) {
  const response = await fetch(files)
  if (response.ok) {
    const blob = await response.blob()
    const fileUrl = URL.createObjectURL(blob)
    let viewerUrl

    viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${fileUrl}`

    window.open(viewerUrl, '_blank')
  }
}

export const updateRecordSkill = (
  data: SELECTED_SKILL
): EntitySkillRecordInput[] => {
  const cloneData = cloneDeep(data)

  _.forOwn(cloneData, (value, key) => {
    if (_.isArray(value) && _.isEmpty(value)) {
      delete cloneData[key]
    }
  })

  const transform:EntitySkillRecordInput[] = Object.keys(cloneData).flatMap((key, idx) => {
    const value = cloneData[key]

    return value.map((item, index) => {
      return {
        id: item.id,
        skill_id: item.skill_id,
        orderId: (idx + 1) * 1000 + (index + 1),
      }
    })
  })

  return transform
}

export const formatRecordSkill = (
  entity_skill_types: EntitySkillType[] | undefined
) => {
  if (!entity_skill_types) return {}

  const entity_skill_records = entity_skill_types.reduce(
    (current: SELECTED_SKILL, next: EntitySkillType) => {
      current[next.id] = next.entity_skills.map((skill) => ({
        id: skill.id,
        skill_id: skill.skill_id,
        parent_id: next.id,
        skill_name: skill.name,
      }))
      return current
    },
    {}
  )

  return entity_skill_records
}

export function RegexEmail(email: string) {
  const pattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
  return pattern.test(email)
}

export const replaceTemplate = (
  template: string,
  data: DATA_KEYWORD_TEMPLATE[]
): string => {
  return template.replace(/{{ (.*?) }}/g, (_, key) => {
    const found = data.find((item) => item.key === key)

    let value = found?.value ?? ''

    if (found?.key) {
      const [type] = found?.key.split(':')
      value = type === 'lk' ? '#' : value
    }

    return found ? value : `{{${key}}}`
  })
}

export const getContentStringHTML = (content: string) => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = content

  return tempDiv.textContent || ''
}


export const pickDataInArray= <T>(objectsArray:T[], key:(keyof T)[]): T[] => {
  const pickedValues = _.map(objectsArray, obj => _.pick(obj, key));
  return pickedValues as T[]
}