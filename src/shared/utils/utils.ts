import _, { isEmpty } from 'lodash'

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

export const findItem = (
  array: any[],
  value: string,
  key: string = 'value'
) => {
  if(isEmpty(array) || !value) return null;
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
console.log("obj", obj, key)
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
    } else if (obj[item]) {
      newObj[item] = obj[item]
    }
  })

  return newObj
}

export const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
  });


  export const converDateToISOString = (date: string) => {
    return new Date(date).toISOString();
  }