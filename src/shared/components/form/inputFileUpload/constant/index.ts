import { RULE_MESSAGES } from 'shared/constants/validate'
import { VALIDATE_FILES } from '../types'

export const INIT_VALIDATOR_FILE: VALIDATE_FILES = {
  is_valid: {
    regex: '.(jpg|jpeg|png|gif|pdf|doc|docx|odt|xls|xlsx|ods|ppt|pptx|odp|mp4|avi|mkv|mov)$',
    msg_error: RULE_MESSAGES.MC5('file')
  },
  max_file: {
    max: 10,
    msg_error: RULE_MESSAGES.MC4('file', 10)
  },
  max_size: {
    max: 20,
    msg_error: RULE_MESSAGES.MC8('file', 20)
  },
}
