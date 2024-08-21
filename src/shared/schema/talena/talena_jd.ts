export type UploadFormData =
  | 'DONE'
  | 'UPLOADING'
  | 'FAILED'
  | 'INIT'
  | 'DUPLICATED'
class TalenaJobDescription {
  introduction: string
  benefits: string[]
  requirements: string[]
  responsibilities: string[]
  state: UploadFormData

  constructor(data: TalenaJobDescription) {
    this.introduction = data.introduction || ''
    this.benefits = data.benefits || []
    this.requirements = data.requirements || []
    this.responsibilities = data.responsibilities || []
    this.state = data.state || ''
  }
}

export default TalenaJobDescription
