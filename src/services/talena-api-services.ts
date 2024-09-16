import { Class } from '@mui/icons-material'
import talenaApi from 'configs/api/talena'
import { talenaClient } from 'middleware/talena-middleware'
import { Either } from 'shared/interfaces/common'
import ErrorException from 'shared/interfaces/response'
import TalenaCandidateCV from 'shared/schema/talena/talena_candidate'
import TalenaJobDescription from 'shared/schema/talena/talena_jd'
import TalenaToken from 'shared/schema/talenaToken'
import { makeLeft, makeRight } from 'shared/utils/handleEither'

export type GenerateJDPayload = {
  name: string
  title: string
  working_hour_from: string
  working_hour_to: string
  working_location: string
  negotiable: boolean
  salaryType: TalenaSalaryType
  currency: string
  salary_from: number
  salary_to: number
  work_model: TalenaWorkModel
  employment_type: TalenaEmploymentType
  employee_level: TalenaEmployeeLevel
  note: string
}

export class TransferEnumsTRECtoTalena {
  static toEmployeeLevel(data: string): TalenaEmployeeLevel {
    if (data === 'fresher') return TalenaEmployeeLevel.INTERN
    if (data === 'intern') return TalenaEmployeeLevel.INTERN
    if (data === 'junior') return TalenaEmployeeLevel.JUNIOR
    if (data === 'middle') return TalenaEmployeeLevel.MIDDLE
    if (data === 'senior') return TalenaEmployeeLevel.SENIOR
    return TalenaEmployeeLevel.SENIOR
  }
}

export enum TalenaWorkModel {
  ONSITE = 'ONSITE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

export enum TalenaSalaryType {
  HOURLY = 'HOURLY',
}

export enum TalenaEmploymentType {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
  CONTRACTOR = 'CONTRACTOR',
}

export enum TalenaEmployeeLevel {
  SENIOR = 'SENIOR',
  MIDDLE = 'MIDDLE',
  JUNIOR = 'JUNIOR',
  INTERN = 'INTERN',
  FRESHER = 'FRESHER',
}

export type CommandRewrite =
  | 'MAKE_LONGER'
  | 'MAKE_SHORTER'
  | 'CORRECT_GRAMMAR'
  | 'MAKE_MORE_PROFESSIONAL'

export type RewritePayload = {
  command:
    | 'MAKE_LONGER'
    | 'MAKE_SHORTER'
    | 'CORRECT_GRAMMAR'
    | 'MAKE_MORE_PROFESSIONAL'
  text: string
}

class TalenaApiService {
  static async getToken(): Promise<Either<null, TalenaToken>> {
    try {
      const res = await talenaClient.get(talenaApi.token)
      if (res) {
        const token = TalenaToken.fromJson(res.data)
        return makeRight(token)
      }
      return makeLeft(null)
    } catch (error) {
      return makeLeft(null)
    }
  }

  static async extractCV(
    formData: FormData
  ): Promise<Either<ErrorException, TalenaCandidateCV>> {
    try {
      const res = await talenaClient.post(talenaApi.extractCV, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const errors = res?.data
      if (ErrorException.hasError(errors)) {
        const error = ErrorException.fromJson(errors)
        return makeLeft(error)
      }
      const cv = TalenaCandidateCV.fromJson(res.data)
      return makeRight(cv)
    } catch (error) {
      return makeLeft(error as ErrorException)
    }
  }

  static async generateJD(
    variable: GenerateJDPayload
  ): Promise<Either<ErrorException, TalenaJobDescription>> {
    try {
      const res = await talenaClient.post(talenaApi.generateJD, variable)
      const data = res?.data
      return makeRight(data)
    } catch (error) {
      return makeLeft(error as ErrorException)
    }
  }

  static async rewrite(
    variable: RewritePayload
  ): Promise<Either<ErrorException, string>> {
    try {
      const res = await talenaClient.post(talenaApi.reWriteJD, variable)
      const data = res?.data
      return makeRight(data)
    } catch (error) {
      return makeLeft(error as ErrorException)
    }
  }
}

export default TalenaApiService
