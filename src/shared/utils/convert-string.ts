import _ from "lodash";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getLastString = (string: string, character: string = '.') => {
  const parts = string.split(character);

  return  _.last(parts) || ''
}

export const convertStringToArray = (string: string, character: string = '.') => {
  return string.split(character);
}