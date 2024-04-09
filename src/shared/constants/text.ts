import { useTranslation } from 'react-i18next'
import i18n from '../../i18n/i18n'
const { t } = i18n

const TEAMS = {
  teams: t('teams'),
  addTeam: t('addTeam'),
}

const COMMON = {}

const APP_TEXT = () => {
  const { t } = useTranslation()
  return {
    MODLUE_TEAMS: {
      teams: t('teams'),
      addTeam: t('addTeam'),
    },
    COMMON,
  }
}

export default APP_TEXT
