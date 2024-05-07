interface Salary {
  salary_type: string
  salary_attibutes?: any
}

export class SalaryFactory {
  salary_type: string
  salary_attibutes?: any
  static salaryRegistry: Record<string, any> = {}

  constructor({ salary_type, salary_attibutes }: Salary) {
    this.salary_type = salary_type
    this.salary_attibutes = salary_attibutes
  }

  static registerSalary(type: string, classRef: any) {
    SalaryFactory.salaryRegistry[type] = classRef
  }

  static getAllSalary() {
    return Object.keys(this.salaryRegistry).map((salary) => {
      return { name: this.salaryRegistry[salary].salary_name, value: salary }
    })
  }

  public getSalaryByType() {
    if(!this.salary_type) return;
    return new SalaryFactory.salaryRegistry[this.salary_type]({
      salary_type: this.salary_type,
      salary_attibutes: this.salary_attibutes,
    })
  }
}

export class RangeSalary extends SalaryFactory {
  static salary_name: string = 'Range'

  salary_type: string = ''
  salary_from: number = 0
  salary_to: number = 0

  constructor({ salary_type, salary_attibutes }: Salary) {
    super({ salary_type, salary_attibutes })
    this.salary_type = salary_type
    this.salary_from = salary_attibutes.salary_from
    this.salary_to = salary_attibutes.salary_to
  }

  public gerenateStringSalary() {
    return `${RangeSalary.salary_name}: ${this.salary_from} - ${this.salary_to}`
  }
}

export class UptoSalary extends SalaryFactory {
  static salary_name: string = 'Up to'

  salary_type: string = ''
  salary_upto: number = 0

  constructor({ salary_type, salary_attibutes }: Salary) {
    super({ salary_type, salary_attibutes })
    this.salary_type = salary_type
    this.salary_upto = salary_attibutes.salary_to
  }

  public gerenateStringSalary() {
    return `${UptoSalary.salary_name}: ${this.salary_upto}`
  }
}

export class MiniumSalary extends SalaryFactory {
  static salary_name: string = 'Minium'

  salary_type: string = ''
  salary_minium: number = 0

  constructor({ salary_type, salary_attibutes }: Salary) {
    super({ salary_type, salary_attibutes })
    this.salary_type = salary_type
    this.salary_minium = salary_attibutes.salary_from
  }

  public gerenateStringSalary() {
    return `${MiniumSalary.salary_name}: ${this.salary_minium}`
  }
}

export class NegotitationSalary extends SalaryFactory {
  static salary_name: string = 'Negotation'

  salary_type: string = ''

  constructor({ salary_type }: Salary) {
    super({ salary_type })
    this.salary_type = salary_type
  }

  public gerenateStringSalary() {
    return `${NegotitationSalary.salary_name}`
  }
}

//register Salary Type
SalaryFactory.registerSalary('range', RangeSalary)
SalaryFactory.registerSalary('up_to', UptoSalary)
SalaryFactory.registerSalary('minimum', MiniumSalary)
SalaryFactory.registerSalary('negotiate', NegotitationSalary)
