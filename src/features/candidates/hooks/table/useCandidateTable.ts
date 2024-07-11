import dayjs from 'dayjs';
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { useMemo } from 'react';
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'
import { convertDateToISOString } from 'shared/utils/utils';

const useCandidateTable = (props: IUseCustomCommonTable) => {
  const { filters } = props;

  const recruit_time_from_date = useMemo(() => {
    const from_date = filters?.recruit_time_from_date;
    return from_date ? convertDateToISOString(dayjs(from_date).toDate()) : undefined
  }, [filters?.recruit_time_from_date])

  const recruit_time_to_date = useMemo(() => {
    const to_date = filters?.recruit_time_to_date;
    return to_date ? convertDateToISOString(dayjs(to_date).endOf('day').toDate()) : undefined
  }, [filters?.recruit_time_to_date])

  const { getAllCandidates, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllCandidates,
    queryKey,
    ...props,
    filters: {
      ...filters,
      recruit_time_from_date:  recruit_time_from_date,
      recruit_time_to_date: recruit_time_to_date
    }
  })

  return {
    useTableReturn,
  }
}

export default useCandidateTable
