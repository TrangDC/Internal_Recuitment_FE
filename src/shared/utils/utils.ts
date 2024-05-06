export const searchByName = (listData: any[], searchValue: string) => {
  if (searchValue.length > 0) {
    const searchResult = listData.filter((item) =>
      item.name.toLocaleLowerCase().match(searchValue.toLowerCase())
    );
    return searchResult;
  } else {
    return listData;
  }
};

export const getRoute = (pathname: string) => {
  const str = pathname.split("/");
  return `/${str[1]}`;
};
/**
 * 
 * @param key of localstorge
 */
const getStatusByKey = (key: string) => {
  const value = window.localStorage.getItem(key)
  return value ? JSON.parse(value) : value;
}

const updateStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const handleLocalStorage = () => {
  return {
    getStatusByKey,
    updateStorage
  }
}

