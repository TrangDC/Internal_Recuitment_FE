import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  ActionGroupButtons,
  TOptionItem,
} from 'shared/components/ActionGroupButtons'
import { Candidate } from 'features/candidates/domain/interfaces'
import { t } from 'i18next'
import { LinkText, StyleTinyText } from 'shared/styles'
import ChipCandidate from 'shared/class/candidate/components/ChipCandidate'
import dayjs from 'dayjs'
import { CANDIDATE_SOURCE_LABEL } from 'shared/components/autocomplete/candidate-source-auto-complete'
import { renderReferenceValueByType } from 'features/auditTrails/presentation/providers/helper'
import { ChipLimit } from 'shared/components/chip-stack'
import checkPermissionActionTable from 'features/candidates/permission/utils/checkPermissonActionTable'
import { ParamsColumn } from 'shared/components/table/hooks/useBuildColumnTable'

const columnHelper = createColumnHelper<Candidate>()

export const columns = (
  actions: TOptionItem<Candidate>[],
  { me, role }: ParamsColumn
): ColumnDef<Candidate, any>[] => [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => (
      <LinkText to={`/dashboard/candidate-detail/${info.row.original.id}`}>
        {info.getValue()}
      </LinkText>
    ),
    header: () => <span>{t('name')}</span>,
    size: 200,
  }),
  columnHelper.accessor((row) => row.email, {
    id: 'email',
    header: () => <span>{t('email')}</span>,
    size: 200,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
  }),
  columnHelper.accessor((row) => row.phone, {
    id: 'phone',
    header: () => <span>{t('phone_number')}</span>,
    size: 150,
    cell: (info) => <StyleTinyText>{info.getValue()}</StyleTinyText>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.reference_type, {
    id: 'reference_type',
    header: () => <span>Candidate source</span>,
    size: 200,
    cell: (info) => {
      const reference_type = info.row.original.reference_type
      const reference_value = info.row.original.reference_value

      const reference_by_type = renderReferenceValueByType(
        reference_type,
        reference_value
      )
      return (
        <StyleTinyText>
          {CANDIDATE_SOURCE_LABEL[reference_type]} - {reference_by_type}
        </StyleTinyText>
      )
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'created_at',
    header: () => <span>{t('status')}</span>,
    enableSorting: false,
    size: 100,
    cell: (info) => {
      return <ChipCandidate status={info.row.original.status} />
    },
  }),
  columnHelper.accessor((row) => row.reference_user, {
    id: 'recruiter',
    header: () => <span>Recruiter</span>,
    enableSorting: false,
    size: 150,
    cell: (info) => {
      return (
        <StyleTinyText>{info.row.original.reference_user?.name}</StyleTinyText>
      )
    },
  }),
  columnHelper.accessor((row) => row.recruit_time, {
    id: 'recruit_time',
    header: () => <span>Recruit time</span>,
    enableSorting: false,
    size: 150,
    cell: (info) => {
      return (
        <StyleTinyText>
          {info.getValue() && dayjs(info.getValue()).format('DD/MM/YYYY')}
        </StyleTinyText>
      )
    },
  }),
  columnHelper.accessor((row) => row.entity_skill_types, {
    id: 'entity_skill_types',
    header: () => <span>Skill type</span>,
    size: 200,
    cell: (info) => {
      const skill_types = info.row.original.entity_skill_types
      const label_list = skill_types ? skill_types.map((type) => type.name) : []
      return (
        <StyleTinyText>
          <ChipLimit chips={label_list} limit={2} />
        </StyleTinyText>
      )
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.entity_skill_types, {
    id: 'entity_skill',
    header: () => <span>Skill</span>,
    size: 200,
    cell: (info) => {
      const skill_types = info.row.original.entity_skill_types
      const label_list = skill_types
        ? skill_types.flatMap((type) => {
            return type.entity_skills.map((skill) => skill.name)
          })
        : []

      return (
        <StyleTinyText>
          <ChipLimit chips={label_list} limit={2} />
        </StyleTinyText>
      )
    },
    enableSorting: false,
  }),
  columnHelper.accessor('id', {
    header: () => <span>{t('action')}</span>,
    size: 100,
    enableSorting: false,
    id: 'action',
    cell: (rowData) => {
      const id = rowData.row.original.id
      const newActions = checkPermissionActionTable({
        actions,
        me,
        role,
        rowData,
      })
      return (
        <>
          <ActionGroupButtons<Candidate>
            rowId={id}
            actions={newActions}
            rowData={rowData.row.original}
          />
        </>
      )
    },
  }),
]
