import { useInfiniteQuery } from '@tanstack/react-query'
import useCandidateActivitiesGraphql from 'features/candidates/domain/graphql/candidateActivities'
import {
  ActivitiesCategoryEnums,
  CandidateActivities,
  CustomTypeCandidateEmail,
  CustomTypeCandidateHistoryCall,
  CustomTypeCandidateInterview,
  CustomTypeCandidateJobFeedback,
  CustomTypeCandidateNote,
} from 'features/candidates/domain/interfaces/canidate-activities'
import _ from 'lodash'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import CandidateActivity from 'shared/schema/database/candidate_activity'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { CandidateActivityFilters } from '../filters/useActivityFilter'

type UseGetCandidateActivitiesProps = {
  id: string
  filters: CandidateActivityFilters
}

function useGetCandidateActivities({
  id,
  filters,
}: UseGetCandidateActivitiesProps) {
  const { getCandidateActivities, queryKey } = useCandidateActivitiesGraphql()
  const variables = {
    filter: {
      candidate_id: id,
      from_date: filters?.fromDate ? filters.fromDate.toISOString() : undefined,
      to_date: filters?.toDate ? filters.toDate.toISOString() : undefined,
    },
    orderBy: {
      field: 'created_at',
      direction: 'DESC',
    },
    freeWord: {
      free_word: filters.search,
    },
  }
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey, variables],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      GraphQLClientService.fetchGraphQL(getCandidateActivities, {
        ...variables,
        pagination: {
          page: pageParam,
          perPage: 10,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPageParam, ___) => {
      return lastPageParam + 1
    },
  })

  const candidateActivity: CandidateActivity = useMemo(() => {
    const pages = data?.pages ?? []
    if (pages) {
      const allActivities = pages.flatMap((page) => {
        if (page && isRight(page)) {
          const response = unwrapEither(page)
          return response?.[getCandidateActivities.operation]?.data || []
        }
        return []
      })
      const data = allActivities.reduce(
        (acc, activity) => {
          acc.candidate_notes.push(...(activity.candidate_notes || []))
          acc.candidate_history_calls.push(
            ...(activity.candidate_history_calls || [])
          )
          acc.candidate_interviews.push(
            ...(activity.candidate_interviews || [])
          )
          acc.outgoing_emails.push(...(activity.outgoing_emails || []))
          acc.candidate_job_feedbacks.push(
            ...(activity.candidate_job_feedbacks || [])
          )
          acc.total = activity.total
          return acc
        },
        {
          candidate_notes: [],
          candidate_history_calls: [],
          candidate_interviews: [],
          outgoing_emails: [],
          candidate_job_feedbacks: [],
          total: 0,
        }
      )
      return data
    }
    return {
      candidate_notes: [],
      candidate_history_calls: [],
      candidate_interviews: [],
      outgoing_emails: [],
      candidate_job_feedbacks: [],
      total: 0,
    }
  }, [data])

  const candidateActivityData: CandidateActivities = useMemo(() => {
    const historyCalls = candidateActivity.candidate_history_calls || []
    const interviews = candidateActivity.candidate_interviews || []
    const notes = candidateActivity.candidate_notes || []
    const emails = candidateActivity.outgoing_emails || []
    const jobFeedbacks = candidateActivity.candidate_job_feedbacks || []

    const customTypeHistoryCallType: CustomTypeCandidateHistoryCall[] =
      historyCalls.map((o) => ({
        type: ActivitiesCategoryEnums.HISTORY_CALL,
        data: o,
        createdAt: o.createdAt,
      }))

    const customTypeInterviews: CustomTypeCandidateInterview[] = interviews.map(
      (o) => ({
        type: ActivitiesCategoryEnums.INTERVIEW,
        data: o,
        createdAt: o.created_at,
      })
    )

    const customTypeNotes: CustomTypeCandidateNote[] = notes.map((o) => ({
      type: ActivitiesCategoryEnums.NOTE,
      data: o,
      createdAt: o.created_at,
    }))

    const customTypeEmails: CustomTypeCandidateEmail[] = emails.map((o) => ({
      type: ActivitiesCategoryEnums.EMAIL,
      data: o,
      createdAt: o.created_at,
    }))

    const customTypeCandidateJobFeedbacks: CustomTypeCandidateJobFeedback[] =
      jobFeedbacks.map((o) => ({
        type: ActivitiesCategoryEnums.FEEDBACK,
        data: o,
        createdAt: o.created_at,
      }))

    return _.orderBy(
      [
        ...customTypeHistoryCallType,
        ...customTypeInterviews,
        ...customTypeNotes,
        ...customTypeEmails,
        ...customTypeCandidateJobFeedbacks,
      ],
      ['createdAt'],
      'desc'
    )
  }, [candidateActivity])

  return {
    candidateActivityData,
    fetchNextPage,
    totalRecord: candidateActivity.total,
    total: candidateActivityData.length,
  }
}

export default useGetCandidateActivities
