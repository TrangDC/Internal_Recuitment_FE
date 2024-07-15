import ConversionTable, {
  ConversionDataType,
} from '../components/ConversionTable'

const KIVData = [
  {
    name: 'Poor Professionalism',
    numberOfFailedReason: 52,
    percentage: '20%',
  },
  {
    name: 'Poor Fit and Engagement',
    numberOfFailedReason: 50,
    percentage: '18%',
  },
  {
    name: 'Over expectations',
    numberOfFailedReason: 45,
    percentage: '12%',
  },
  {
    name: 'Over qualification',
    numberOfFailedReason: 42,
    percentage: '10%',
  },

  {
    name: 'Language deficiency',
    numberOfFailedReason: 40,
    percentage: '9%',
  },
  {
    name: 'Weak technical skills',
    numberOfFailedReason: 38,
    percentage: '8%',
  },
]

const KIVColumns = [
  {
    id: 'hiring-team',
    name: 'Hiring team',
  },
  {
    id: 'enums',
    name: 'Tên chỉ sổ',
  },
  {
    id: 'applied',
    name: 'Applied',
  },
  {
    id: 'interviewing',
    name: 'Interviewing',
  },

  {
    id: 'offering',
    name: 'Offering',
  },
  {
    id: 'hired',
    name: 'Hired',
  },
]
type ByHiringTeamTableProps = {
  data: ConversionDataType[]
}
function ByHiringTeamTable({ data }: ByHiringTeamTableProps) {
  return <ConversionTable columns={KIVColumns} data={data} />
}

export default ByHiringTeamTable
