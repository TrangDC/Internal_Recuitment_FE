import { useTranslation } from 'react-i18next'

const useTextTranslation = () => {
  const { t } = useTranslation()
  return {
    MODLUE_TEAMS: {
      teams: t('teams'),
      team: t('team'),
      add_a_new_team: t('add_a_new_team'),
      input_team_name: t('input_team_name'),
      team_manager: t('team_manager'),
      detatil_team: t('detatil_team'),
      edit_team: t('edit_team'),
      delete_team: t('delete_team'),
      open_requests: t('open_requests'),
    },
    MODLUE_JOBS: {
      jobs: t('jobs'),
      requester: t('requester'),
      staft_required: t('staft_required'),
      hired: t('hired'),
      input_job_title: t('input_job_title'),
      add_a_new_job: t('add_a_new_job'),
      new_job: t('new_job'),
      edit_job: t('edit_job'),
      job_name: t('job_name'),
      delete_job: t('delete_job'),
      job_detail: t('job_detail'),
      general_information: t('general_information'),
      history_log: t('history_log'),
      hiring_process: t('hiring_process'),
    },
    MODLUE_CANDIDATES: {
      candidates: t('candidates'),
      blacklist: t('blacklist'),
      add_new_candidate: t('add_new_candidate'),
      edit_candidate: t('edit_candidate'),
      add_blackList: t('add_blackList'),
      delete_candidate: t('delete_candidate'),
    },
    COMMON: {
      email: t('email'),
      search: t('search'),
      import: t('import'),
      phone_number: t('phone_number'),
      dob: t('dob'),
      add_to_blackList: t('add_to_blackList'),
      name: t('name'),
      action: t('action'),
      cancel: t('cancel'),
      save: t('save'),
      description: t('description'),
      edit: t('edit'),
      detail: t('detail'),
      delete: t('delete'),
      created_date: t('created_date'),
      status: t('status'),
      location: t('location'),
      salary: t('salary'),
      from: t('from'),
      to: t('to'),
      unit: t('unit'),
      status_draft: t('status_draft'),
      status_opened: t('status_opened'),
      status_closed: t('status_closed'),
      from_date: t('from_date'),
      to_date: t('to_date'),
      update_record: t('update_record'),
      sub_title_update_record: t('sub_title_update_record'),
    }
  }
}

export default useTextTranslation
