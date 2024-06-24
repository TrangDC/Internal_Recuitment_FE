export type BaseRecord = {
  [key: string]: any
}

export type Left<T> = {
  left: T
  right?: never
}

export type Right<U> = {
  left?: never
  right: U
}

export type Either<T, U> = NonNullable<Left<T> | Right<U>>

export enum MODLUE_QUERY_KEY {
  JOB = 'job',
  CANDIDATE = 'candidate',
  TEAM = 'team',
  INTERVIEWER = 'interviewer',
  USER = 'user',
  FEEDBACK = 'feedback',
  CANDIDATE_JOB = 'candidateJob',
  EXPORT_TEMPLATE = 'export_template',
  SKILL = 'skill',
  SKILL_TYPE = 'skill_type',
  GROUP_CANDIDATE_STATUS = 'group_candidate_status'
}
