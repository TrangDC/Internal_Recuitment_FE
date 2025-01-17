import dayjs from 'dayjs';
import useCandidateGraphql from 'features/candidates/domain/graphql/candidate';
import { useMemo } from 'react';
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'
import { convertDateToISOString } from 'shared/utils/utils';

const useCandidateTable = (props: IUseCustomCommonTable) => {
  const { filters } = props;

  const recruit_time_from_date = useMemo(() => {
    const from_date = filters?.recruit_time_from_date;
    return from_date ? convertDateToISOString(dayjs(from_date).toDate()) : convertDateToISOString(dayjs('1970-1-1').toDate())
  }, [filters?.recruit_time_from_date])

  const recruit_time_to_date = useMemo(() => {
    const to_date = filters?.recruit_time_to_date;
    return to_date ? convertDateToISOString(dayjs(to_date).endOf('day').toDate()) : convertDateToISOString(dayjs('2050-1-1').toDate())
  }, [filters?.recruit_time_to_date])

  const { getAllCandidates, queryKey } = useCandidateGraphql()
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
