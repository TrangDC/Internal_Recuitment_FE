import { convertStringToArray } from "shared/utils/convert-string"
import { renderCurrencyEN, renderCurrencyEnum, renderDate, renderDescription, renderLocation, renderSalaryByType, renderStatusHiringJob, renderText, renderYesNo } from "../helper";
import { ReactNode } from "react";

type renderValueReturn = (text: string) => any;

type renderTextRecordReturn = {
    renderValue: renderValueReturn;
    record_value: string | ReactNode
}

export const renderTextRecord = (field_string: string, recordString: string): renderTextRecordReturn => {
    const [path, model, field] = convertStringToArray(field_string);
    let renderValue: renderValueReturn;

    switch (model) {
        case 'hiring_jobs':
            renderValue = renderFieldHiringJob(field);
            break;
        case 'candidates':
            renderValue = renderFieldCandidate(field);
            break;
        default:
            renderValue = renderText;
            break;
    }

    const record_value = renderValue(recordString)

    return {
        renderValue,
        record_value,
    };
}

function renderFieldHiringJob(field: string): renderValueReturn {
    let renderValue;

    switch (field) {
        case 'description':
            renderValue = renderDescription
            break;
        case 'salary_from':
        case 'salary_to':
            renderValue = renderCurrencyEN
            break;
        case 'currency':
            renderValue = renderCurrencyEnum
            break;
        case 'status':
            renderValue = renderStatusHiringJob
            break;
        case 'salary_type':
            renderValue = renderSalaryByType
            break;
        case 'location':
            renderValue = renderLocation
            break;
        default: {
            renderValue = renderText;
        }
    }

    return renderValue;
}

function renderFieldCandidate(field: string): renderValueReturn {
    let renderValue;

    switch (field) {
        case 'dob':
            renderValue = renderDate
            break;
        case 'is_blacklist':
            renderValue = renderYesNo
        break;
        default: {
            renderValue = renderText;
        }
    }

    return renderValue;
}
