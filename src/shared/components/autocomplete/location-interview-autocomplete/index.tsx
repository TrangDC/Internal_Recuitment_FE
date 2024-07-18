import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function LocationInterviewAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const LOCATION_INTERVIEW_STATE = {
    HA_NOI: 'Hanoi',
    HO_CHI_MINH: 'HCM',
    DA_NANG: 'ĐN',
    JAPAN: 'Japan',
    ONLINE: 'Online Interview'
}

const options: IOption[] = [
  {label: '[Hanoi] TECHVIFY Office_Thanh Dong Bld 19 To Huu, Trung Van, Nam Tu Liem', value: LOCATION_INTERVIEW_STATE.HA_NOI},
  {label: '[HCM] TECHVIFY Office_ H3 Building, 384 Hoang Dieu str, 6 Ward, 4 Dist, Ho Chi Minh City', value: LOCATION_INTERVIEW_STATE.HO_CHI_MINH},
  {label: '[ĐN] F3 Ricco Building, 363 Nguyen Huu Tho Str, Cam Le Dist, Da Nang City, Vietnam', value: LOCATION_INTERVIEW_STATE.DA_NANG},
  {label: '[Japan] Hakata Ekimae City Building 10F, 1-9-3 Hakata Ekimae, Hakata-ku, Fukuoka-shi, Fukuoka 812-0011 Japan', value: LOCATION_INTERVIEW_STATE.JAPAN},
  {label: 'Online interview ', value: LOCATION_INTERVIEW_STATE.ONLINE},
]

export const GetLocationName = (value: string) => {
  return options.find((item) => item.value === value)?.label
}

export default LocationInterviewAutoComplete