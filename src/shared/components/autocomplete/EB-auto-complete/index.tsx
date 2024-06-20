import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function EBAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const EB_STATE = {
    TIKTOK_TECHVIFY_OFFICIAL: 'tiktok_techvify_official',
    TIKTOK_THEDEVDAD: 'tiktok_thedevdad',
    LINKEDIN_JUNIE_TRUONG: 'linkedin_junie_truong',
    OTHER_LINKEDIN: 'other_linkedin',
    GROUP_SEEDING: 'group_seeding',
    FANPAGE_TECHVIFY_CAREERS: 'fanpage_techvify_careers',
    GOOGLE_SEARCH: 'google_search',
    YOUTUBE_TECHVIFY_CARRERS: 'youtube_techvify_careers',
    THREAD: 'thread',
    INSTAGRAM: 'instagram',
    TWITTER: 'twitter',
    OTHERS: 'others',
}

const options: IOption[] = [
  {label: 'TikTok TECHVIFY Official', value: EB_STATE.TIKTOK_TECHVIFY_OFFICIAL},
  {label: 'TikTok Thedevdad', value: EB_STATE.TIKTOK_THEDEVDAD},
  {label: 'Linkedin Junie Trương', value: EB_STATE.LINKEDIN_JUNIE_TRUONG},
  {label: 'Other Linkedin', value: EB_STATE.OTHER_LINKEDIN},
  {label: 'Group Seeding', value: EB_STATE.GROUP_SEEDING},
  {label: 'Fanpage TECHVIFY Careers', value: EB_STATE.FANPAGE_TECHVIFY_CAREERS},
  {label: 'Google Search (Website)', value: EB_STATE.GOOGLE_SEARCH},
  {label: 'Youtube TECHVIFY Careers', value: EB_STATE.YOUTUBE_TECHVIFY_CARRERS},
  {label: 'Thread', value: EB_STATE.THREAD},
  {label: 'Instagram', value: EB_STATE.INSTAGRAM},
  {label: 'Twitter', value: EB_STATE.TWITTER},
  {label: 'Others', value: EB_STATE.OTHERS},
]

export default EBAutoComplete