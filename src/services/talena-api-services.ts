import talenaApi from 'configs/api/talena'
import { talenaClient } from 'middleware/talena-middleware'
import { Either } from 'shared/interfaces/common'
import ErrorException from 'shared/interfaces/response'
import TalenaCandidateCV from 'shared/schema/talena/talena_candidate'
import TalenaJobDescription from 'shared/schema/talena/talena_jd'
import TalenaToken from 'shared/schema/talenaToken'
import { makeLeft, makeRight } from 'shared/utils/handleEither'

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
    formData: FormData
  ): Promise<Either<ErrorException, TalenaJobDescription>> {
    try {
      const res = await talenaClient.post(talenaApi.generateJD, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data),
      })
      const data = res?.data
      return makeRight(data)
    } catch (error) {
      return makeLeft(error as ErrorException)
    }
  }
}

export default TalenaApiService
