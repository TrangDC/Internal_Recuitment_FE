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
}
