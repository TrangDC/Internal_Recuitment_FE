import { EVENT_EMAIL } from "shared/components/autocomplete/event-email-autocomplete";
import { SEND_TO_VALUE } from "shared/components/autocomplete/send-to-autocomplete/hooks/useSendTo";
import { OPTION_SLASH_COMMAND } from "shared/components/input-fields/EditorField/constant";

export const SEND_TO_BY_EVENT = {
    [EVENT_EMAIL.candidate_applied_to_kiv.value]: [SEND_TO_VALUE.job_request, SEND_TO_VALUE.candidate, SEND_TO_VALUE.team_manager, SEND_TO_VALUE.team_member, SEND_TO_VALUE.role],
    [EVENT_EMAIL.candidate_interviewing_to_kiv.value]: [SEND_TO_VALUE.job_request, SEND_TO_VALUE.candidate, SEND_TO_VALUE.team_manager, SEND_TO_VALUE.team_member, SEND_TO_VALUE.role],
    [EVENT_EMAIL.candidate_interviewing_to_offering.value]: [SEND_TO_VALUE.job_request, SEND_TO_VALUE.candidate, SEND_TO_VALUE.team_manager, SEND_TO_VALUE.team_member, SEND_TO_VALUE.role],
    [EVENT_EMAIL.created_interview.value]:  [SEND_TO_VALUE.job_request, SEND_TO_VALUE.candidate, SEND_TO_VALUE.team_manager, SEND_TO_VALUE.team_member, SEND_TO_VALUE.interviewer, SEND_TO_VALUE.role],
    [EVENT_EMAIL.updating_interview.value]:[SEND_TO_VALUE.job_request, SEND_TO_VALUE.candidate, SEND_TO_VALUE.team_manager, SEND_TO_VALUE.team_member, SEND_TO_VALUE.interviewer, SEND_TO_VALUE.role],
    [EVENT_EMAIL.cancel_interview.value]: [SEND_TO_VALUE.job_request, SEND_TO_VALUE.candidate, SEND_TO_VALUE.team_manager, SEND_TO_VALUE.team_member, SEND_TO_VALUE.interviewer, SEND_TO_VALUE.role],
}


export const SLASH_COMMAND_BY_EVENT = {
    [EVENT_EMAIL.candidate_applied_to_kiv.value]: [OPTION_SLASH_COMMAND.general, OPTION_SLASH_COMMAND.hiringJob, OPTION_SLASH_COMMAND.candidate, OPTION_SLASH_COMMAND.team, OPTION_SLASH_COMMAND.candidateJob],
    [EVENT_EMAIL.candidate_interviewing_to_kiv.value]: [OPTION_SLASH_COMMAND.general, OPTION_SLASH_COMMAND.hiringJob, OPTION_SLASH_COMMAND.candidate, OPTION_SLASH_COMMAND.team, OPTION_SLASH_COMMAND.candidateJob],
    [EVENT_EMAIL.candidate_interviewing_to_offering.value]: [OPTION_SLASH_COMMAND.general, OPTION_SLASH_COMMAND.hiringJob, OPTION_SLASH_COMMAND.candidate, OPTION_SLASH_COMMAND.team, OPTION_SLASH_COMMAND.candidateJob],
    [EVENT_EMAIL.created_interview.value]:  [OPTION_SLASH_COMMAND.general, OPTION_SLASH_COMMAND.hiringJob, OPTION_SLASH_COMMAND.candidate, OPTION_SLASH_COMMAND.team, OPTION_SLASH_COMMAND.candidateJob, OPTION_SLASH_COMMAND.interview],
    [EVENT_EMAIL.updating_interview.value]:[OPTION_SLASH_COMMAND.general, OPTION_SLASH_COMMAND.hiringJob, OPTION_SLASH_COMMAND.candidate, OPTION_SLASH_COMMAND.team, OPTION_SLASH_COMMAND.candidateJob, OPTION_SLASH_COMMAND.interview],
    [EVENT_EMAIL.cancel_interview.value]: [OPTION_SLASH_COMMAND.general, OPTION_SLASH_COMMAND.hiringJob, OPTION_SLASH_COMMAND.candidate, OPTION_SLASH_COMMAND.team, OPTION_SLASH_COMMAND.candidateJob, OPTION_SLASH_COMMAND.interview],
}