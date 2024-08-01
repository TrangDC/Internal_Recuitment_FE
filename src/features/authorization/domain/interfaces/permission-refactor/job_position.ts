import { GenerateAction } from '.'

export const JOB_POSITION_ACTIONS = {
    VIEW: 'GetJobPosition,GetAllJobPositions',
    CREATE: 'CreateJobPosition',
    EDIT: 'UpdateJobPosition',
    DELETE: 'DeleteJobPosition',
}
export interface JobPositionPermissions
  extends GenerateAction<keyof typeof JOB_POSITION_ACTIONS> {}
