export type UploadCVState =
  | 'DONE'
  | 'UPLOADING'
  | 'FAILED'
  | 'INIT'
  | 'DUPLICATED'

class TalenaCandidateCV {
  cvFulltext: string
  name: string
  position: string
  level: string
  email: string
  phone: string
  address: string
  dob: string
  experiences: Experience[]
  skills: string[]
  links: string[]
  certificates: Certificate[]
  awards: Award[]
  educations: Education[]
  languages: string[]
  yearOfExp: number
  university: string
  gpa: number
  radar: Radar
  summary: Summary
  cvSize: number
  workspaceId: string
  state: UploadCVState
  cvUrl: string
  id: string
  created_at: string
  updated_at: string

  constructor(data: TalenaCandidateCV) {
    this.cvFulltext = data.cvFulltext || ''
    this.name = data.name || ''
    this.position = data.position || ''
    this.level = data.level || ''
    this.email = data.email || ''
    this.phone = data.phone || ''
    this.address = data.address || ''
    this.dob = data.dob || ''
    this.experiences = data.experiences || []
    this.skills = data.skills || []
    this.links = data.links || []
    this.certificates = data.certificates || []
    this.awards = data.awards || []
    this.educations = data.educations || []
    this.languages = data.languages || []
    this.yearOfExp = data.yearOfExp || 0
    this.university = data.university || ''
    this.gpa = data.gpa || 0
    this.radar = new Radar(data.radar || {})
    this.summary = new Summary(data.summary || {})
    this.cvSize = data.cvSize || 0
    this.workspaceId = data.workspaceId || ''
    this.state = data.state || 'UPLOADED'
    this.cvUrl = data.cvUrl || ''
    this.id = data.id || ''
    this.created_at = data.created_at || ''
    this.updated_at = data.updated_at || ''
  }

  static fromJson(data: any): TalenaCandidateCV {
    return new TalenaCandidateCV({
      cvFulltext: data.cv_fulltext,
      name: data.name,
      position: data.position,
      level: data.level,
      email: data.email,
      phone: data.phone,
      address: data.address,
      dob: data.dob,
      experiences: (data.experiences || []).map((exp: any) =>
        Experience.fromJson(exp)
      ),
      skills: (data.skills || []).map((exp: any) => Skill.fromJson(exp)),
      links: data.links || [],
      certificates: (data.certificates || []).map((exp: any) =>
        Certificate.fromJson(exp)
      ),
      awards: (data.awards || []).map((exp: any) => Award.fromJson(exp)),
      educations: (data.educations || []).map((exp: any) =>
        Education.fromJson(exp)
      ),
      languages: data.languages || [],
      yearOfExp: data.year_of_exp,
      university: data.university,
      gpa: data.gpa,
      radar: Radar.fromJson(data.radar || {}),
      summary: Summary.fromJson(data.summary || {}),
      cvSize: data.cv_size,
      workspaceId: data.workspace_id,
      state: data.state || 'UPLOADED',
      cvUrl: data.cv_url,
      id: data.id,
      created_at: data.created_at,
      updated_at: data.updated_at,
    })
  }
}

class Experience {
  start_date: string
  end_date: string
  company: string
  position: string
  description: string[]

  constructor(data: Experience) {
    this.start_date = data.start_date || ''
    this.end_date = data.end_date || ''
    this.company = data.company || ''
    this.position = data.position || ''
    this.description = data.description || []
  }

  static fromJson(data: any): Experience {
    return new Experience({
      start_date: data.start_date,
      end_date:
        data.end_date === 'PRESENT' ? new Date().toString() : data.end_date,
      company: data.company,
      position: data.position,
      description: data.description || [],
    })
  }
}

class Certificate {
  date: string
  name: string
  score: number
  description: string

  constructor(data: Certificate) {
    this.date = data.date || ''
    this.name = data.name || ''
    this.score = data.score || 0
    this.description = data.description || ''
  }

  static fromJson(data: any): Certificate {
    return new Certificate({
      date: data.date,
      name: data.name,
      score: data.score,
      description: data.description,
    })
  }
}

class Award {
  date: string
  name: string

  constructor(data: Award) {
    this.date = data.date || ''
    this.name = data.name || ''
  }

  static fromJson(data: any): Award {
    return new Award({
      date: data.date,
      name: data.name,
    })
  }
}

class Education {
  start_date: string
  end_date: string
  school_name: string
  cpa_gpa: number
  major: string
  degree: string
  description: string[]

  constructor(data: Education) {
    this.start_date = data.start_date || ''
    this.end_date = data.end_date || ''
    this.school_name = data.school_name || ''
    this.cpa_gpa = data.cpa_gpa || 0
    this.major = data.major || ''
    this.degree = data.degree || ''
    this.description = data.description || []
  }

  static fromJson(data: any): Education {
    return new Education({
      start_date: data.start_date,
      end_date:
        data.end_date === 'PRESENT' ? new Date().toString() : data.end_date,
      school_name: data.school_name,
      cpa_gpa: data.cpa_gpa,
      major: data.major,
      degree: data.degree,
      description: data.description || [],
    })
  }
}

class Radar {
  skills: Skill[]

  constructor(data: any) {
    this.skills = data.skills?.map((skill: any) => new Skill(skill)) || []
  }

  static fromJson(data: any): Radar {
    return new Radar({
      skills: data.skills?.map((skill: any) => Skill.fromJson(skill)) || [],
    })
  }
}

class Skill {
  name: string
  score: number
  message: string

  constructor(data: Skill) {
    this.name = data.name || ''
    this.score = data.score || 0
    this.message = data.message || ''
  }

  static fromJson(data: any): Skill {
    return new Skill({
      name: data.name,
      score: data.score,
      message: data.message,
    })
  }
}

class Summary {
  summary: string
  strengths: string[]
  potential_positions: string[]

  constructor(data: Summary) {
    this.summary = data.summary || ''
    this.strengths = data.strengths || []
    this.potential_positions = data.potential_positions || []
  }

  static fromJson(data: any): Summary {
    return new Summary({
      summary: data.summary,
      strengths: data.strengths || [],
      potential_positions: data.potential_positions || [],
    })
  }
}

export default TalenaCandidateCV
