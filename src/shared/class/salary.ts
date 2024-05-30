import { CURRENCY_TEXT_LABEL } from 'shared/constants/constants'
import { formatCurrency } from 'shared/utils/utils'

interface Salary {
  salary_type: string
  salary_attibutes?: any
  salary_unit?: 'vnd' | 'usd' | 'jpy'
}

export class SalaryFactory {
  salary_type: string
  salary_unit?: 'vnd' | 'usd' | 'jpy'
  salary_attibutes?: any
  static salaryRegistry: Record<string, any> = {}

  constructor({ salary_type, salary_attibutes, salary_unit }: Salary) {
    this.salary_type = salary_type
    this.salary_attibutes = salary_attibutes
    this.salary_unit = salary_unit
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
    if (!this.salary_type) return
    return new SalaryFactory.salaryRegistry[this.salary_type]({
      salary_type: this.salary_type,
      salary_attibutes: this.salary_attibutes,
      salary_unit: this.salary_unit,
    })
  }
}

export class RangeSalary extends SalaryFactory {
  static salary_name: string = 'Range'

  salary_type: string = ''
  salary_from: number = 0
  salary_to: number = 0
  salary_unit?: 'vnd' | 'usd' | 'jpy'

  constructor({ salary_type, salary_attibutes, salary_unit }: Salary) {
    super({ salary_type, salary_attibutes })
    this.salary_type = salary_type
    this.salary_from = salary_attibutes.salary_from
    this.salary_to = salary_attibutes.salary_to
    this.salary_unit = salary_unit
  }

  public gerenateStringSalary() {
    return `${RangeSalary.salary_name}: ${formatCurrency(this.salary_from)} - ${formatCurrency(this.salary_to)} ${this.salary_unit && CURRENCY_TEXT_LABEL[this.salary_unit]}`
  }
}

export class UptoSalary extends SalaryFactory {
  static salary_name: string = 'Up to'

  salary_type: string = ''
  salary_upto: number = 0
  salary_unit?: 'vnd' | 'usd' | 'jpy'

  constructor({ salary_type, salary_attibutes, salary_unit }: Salary) {
    super({ salary_type, salary_attibutes })
    this.salary_type = salary_type
    this.salary_upto = salary_attibutes.salary_to
    this.salary_unit = salary_unit
  }

  public gerenateStringSalary() {
    return `${UptoSalary.salary_name}: ${formatCurrency(this.salary_upto)} ${this.salary_unit && CURRENCY_TEXT_LABEL[this.salary_unit]}`
  }
}

export class MiniumSalary extends SalaryFactory {
  static salary_name: string = 'Minium'

  salary_type: string = ''
  salary_minium: number = 0
  salary_unit?: 'vnd' | 'usd' | 'jpy'

  constructor({ salary_type, salary_attibutes, salary_unit }: Salary) {
    super({ salary_type, salary_attibutes })
    this.salary_type = salary_type
    this.salary_minium = salary_attibutes.salary_from
    this.salary_unit = salary_unit
  }

  public gerenateStringSalary() {
    return `${MiniumSalary.salary_name}: ${formatCurrency(this.salary_minium)} ${this.salary_unit && CURRENCY_TEXT_LABEL[this.salary_unit]}`
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
