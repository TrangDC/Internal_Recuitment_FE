import _, { cloneDeep } from "lodash";
import { BaseRecord } from "shared/interfaces";
import { SELECTED_SKILL, TYPE_LIST_SELECTED } from "..";

export const isExistKey = (key: string, object: BaseRecord) => {
    return _.has(object, key);
}

export const updateListChild = (arr: TYPE_LIST_SELECTED[], id: string, newData: TYPE_LIST_SELECTED) => {
    const index = _.findIndex(arr, { skill_id: id });
    const cloneData = cloneDeep(arr);

    if (index !== -1) {
        _.pullAt(cloneData, index);
    } else {
        cloneData.push(newData);
    }

    return cloneData;
}

export const existChild = (arr: TYPE_LIST_SELECTED[], skill_id: string) => {
    return  _.some(arr, { skill_id: skill_id })
}

export const transformSkillRecord = (data: SELECTED_SKILL) => {
    const cloneData = cloneDeep(data);
  
    _.forOwn(cloneData, (value, key) => {
      if (_.isArray(value) && _.isEmpty(value)) {
        delete cloneData[key];
      }
    });
  
    const transform = Object.keys(cloneData).flatMap((key, idx) => {
      const value = cloneData[key];
  
      return value.map((item, index) => {
        return {
          id: item.id,
          skill_id: item.skill_id,
          parent_id: item.parent_id,
          skill_name: item.skill_name,
        }
      })
  
    });
  
    return transform;
  }
  