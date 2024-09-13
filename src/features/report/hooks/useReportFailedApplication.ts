import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import {
    ReportFilter,
} from 'shared/schema/chart/report'
import useGraphql from '../domain/graphql/graphql'
import GraphQLClientService from 'services/graphql-service'
import _, { cloneDeep } from 'lodash'
import { useTranslation } from 'react-i18next'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { FailedReasonDataTable } from '../presentation/components/TableFailedReason'

type UseReportFailedApplicationProps = {
    filters: ReportFilter
}

type FailedReson = {
    candidate_withdrawal: number
    language_deficiency: number
    others: number
    over_expectations: number
    over_qualification: number
    poor_fit_and_engagement: number
    poor_interpersonal_skills: number
    poor_management_skills: number
    poor_problem_solving_skills: number
    poor_professionalism: number
    weak_technical_skills: number
}

type ApplicationReportFailed = {
    failed_cv: FailedReson
    failed_interview: FailedReson
    offer_lost: FailedReson
}

const applicationFailedDefault: ApplicationReportFailed = {
    failed_cv: {
        candidate_withdrawal: 0,
        language_deficiency: 0,
        others: 0,
        over_expectations: 0,
        over_qualification: 0,
        poor_fit_and_engagement: 0,
        poor_interpersonal_skills: 0,
        poor_management_skills: 0,
        poor_problem_solving_skills: 0,
        poor_professionalism: 0,
        weak_technical_skills: 0,
    },
    failed_interview: {
        candidate_withdrawal: 0,
        language_deficiency: 0,
        others: 0,
        over_expectations: 0,
        over_qualification: 0,
        poor_fit_and_engagement: 0,
        poor_interpersonal_skills: 0,
        poor_management_skills: 0,
        poor_problem_solving_skills: 0,
        poor_professionalism: 0,
        weak_technical_skills: 0,
    },
    offer_lost: {
        candidate_withdrawal: 0,
        language_deficiency: 0,
        others: 0,
        over_expectations: 0,
        over_qualification: 0,
        poor_fit_and_engagement: 0,
        poor_interpersonal_skills: 0,
        poor_management_skills: 0,
        poor_problem_solving_skills: 0,
        poor_professionalism: 0,
        weak_technical_skills: 0,
    }
}
type TYPE_APPLICATION_FAILED = keyof typeof applicationFailedDefault;

type ItemFailedReason = { failed_cv: number, failed_interview: number, offer_lost: number, total: number }
type FailedDataType = {
    candidate_withdrawal: ItemFailedReason,
    language_deficiency: ItemFailedReason,
    others: ItemFailedReason,
    over_expectations: ItemFailedReason,
    over_qualification: ItemFailedReason,
    poor_fit_and_engagement: ItemFailedReason,
    poor_interpersonal_skills: ItemFailedReason,
    poor_management_skills: ItemFailedReason,
    poor_problem_solving_skills: ItemFailedReason,
    poor_professionalism: ItemFailedReason,
    weak_technical_skills: ItemFailedReason,
}

const failedDataDefault: FailedDataType = {
    candidate_withdrawal: { failed_cv: 0, failed_interview: 0, offer_lost: 0, total: 0 },
    language_deficiency: { failed_cv: 0, failed_interview: 0, offer_lost: 0, total: 0 },
    others: { failed_cv: 0, failed_interview: 0, offer_lost: 0, total: 0 },
    over_expectations: { failed_cv: 0, failed_interview: 0, offer_lost: 0, total: 0 },
    over_qualification: { failed_cv: 0, failed_interview: 0, offer_lost: 0, total: 0 },
    poor_fit_and_engagement: { failed_cv: 0, failed_interview: 0, offer_lost: 0, total: 0 },
    poor_interpersonal_skills: { failed_cv: 0, failed_interview: 0, offer_lost: 0, total: 0 },
    poor_management_skills: { failed_cv: 0, failed_interview: 0, offer_lost: 0, total: 0 },
    poor_problem_solving_skills: { failed_cv: 0, failed_interview: 0, offer_lost: 0, total: 0 },
    poor_professionalism: { failed_cv: 0, failed_interview: 0, offer_lost: 0, total: 0 },
    weak_technical_skills: { failed_cv: 0, failed_interview: 0, offer_lost: 0, total: 0 },
}

type TYPE_FAILED_REASON = keyof typeof failedDataDefault;
type TYPE_TOTAL_FAILED = {
    total: number,
    failed_cv: number,
    failed_interview: number,
    offer_lost: number,
}

function useReportFailedApplication({
    filters,
}: UseReportFailedApplicationProps) {
    const { reportFailedApplication } = useGraphql()
    const { t } = useTranslation()
    const { data, isLoading } = useQuery({
        queryKey: [MODLUE_QUERY_KEY.REPORT_APPLICATION_FAILED],
        queryFn: async () =>
            GraphQLClientService.fetchGraphQL(reportFailedApplication, {
                filter: filters,
            }),
    })

    const reportFailedApplicationData: ApplicationReportFailed = useMemo(() => {
        if (data && isRight(data)) {
            const response = unwrapEither(data)

            return response?.[reportFailedApplication.operation]?.data ?? applicationFailedDefault
        }
        return applicationFailedDefault
    }, [data])

    const failedDataFormat = useMemo(() => {
        const cloneData = cloneDeep(failedDataDefault);
        let totalInterviewFailed: number = 0;

        Object.keys(reportFailedApplicationData).map((item) => {
            const failedReason = _.get(reportFailedApplicationData, item);
            Object.keys(failedReason).map((reason) => {
                const numberReason = _.get(failedReason, reason);
                totalInterviewFailed += numberReason;
                cloneData[reason as TYPE_FAILED_REASON].total += numberReason;
                cloneData[reason as TYPE_FAILED_REASON][item as TYPE_APPLICATION_FAILED] = numberReason;
            })
        })

        const FailedDataFormatRespone: FailedReasonDataTable[] = Object.keys(cloneData).map(
            (keyword) => {
                const itemFailed = _.get(cloneData, keyword);
                const name = t(keyword)
                const percentTotal = ((itemFailed.total / totalInterviewFailed) * 100).toFixed(2);;

                const item: FailedReasonDataTable = {
                    name,
                    total: itemFailed?.total + ` (${!percentTotal ? percentTotal : 0}%)`,
                    failed_cv: itemFailed?.failed_cv,
                    failed_interview: itemFailed?.failed_interview,
                    offer_lost: itemFailed?.offer_lost,
                }
                return item
            }
        )

        return FailedDataFormatRespone;
    }, [reportFailedApplicationData])

    const failedTotal = useMemo(() => {
        const data: TYPE_TOTAL_FAILED = { failed_cv: 0, failed_interview: 0, offer_lost: 0, total: 0 };

        failedDataFormat.forEach((item) => {
            data.failed_cv += item.failed_cv;
            data.failed_interview += item.failed_interview;
            data.offer_lost += item.offer_lost;
            data.total += item.failed_cv + item.failed_interview + item.offer_lost;
        })

        const failedInterviewPercent = ((data.failed_interview / data.total) * 100).toFixed(2);
        const failedOfferLostPercent = ((data.offer_lost / data.total) * 100).toFixed(2);
        const failedFailedCVPercent = ((data.failed_cv / data.total) * 100).toFixed(2);

        return {
            total: data.total,
            failed_interview: data.failed_interview + ` (${!failedInterviewPercent ? failedInterviewPercent : 0}%)`,
            offer_lost: data.offer_lost + ` (${!failedOfferLostPercent ? failedOfferLostPercent : 0}%)`,
            failed_cv: data.failed_cv + ` (${!failedFailedCVPercent ? failedFailedCVPercent : 0}%)`,
        }

    }, [failedDataFormat])

    return {
        reportFailedApplicationData,
        isLoading,
        failedDataFormat,
        failedTotal
    }
}

export default useReportFailedApplication
