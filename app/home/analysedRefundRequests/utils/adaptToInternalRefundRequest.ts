import convertToDateTime from './convertToDateTime';
import getTOSType from './getTOSType';
import getAvailableWorkingHour from './getAvailableWorkingHour';
import getApprovalTimeLimitHours from './getApprovalTimeLimitHours';

import type { RefundRequest, InternalRefundRequest } from '../types';
import { TIMEZONE_MAPPINGS } from '../constants';

export default function adaptToInternalRefundRequest(
  request: RefundRequest
): InternalRefundRequest {
  const timeZone = TIMEZONE_MAPPINGS[request['Customer Location (timezone)']];
  const signUp = convertToDateTime({
    originalTimeZone: request['Customer Location (timezone)'],
    originalDateTime: { date: request['Sign up date'] },
    // keep timezone to respect local sign-up registration date
    targetTimeZone: timeZone,
  });
  const requestSource = request['Request Source'];
  const refundRequest = convertToDateTime({
    originalTimeZone: request['Customer Location (timezone)'],
    originalDateTime: {
      date: request['Refund Request Date'],
      time: request['Refund Request Time'],
    },
  });
  const TOSType = getTOSType(signUp);

  return {
    name: request.Name,
    timeZone,
    signUp,
    requestSource,
    TOSType,
    investment: convertToDateTime({
      originalTimeZone: request['Customer Location (timezone)'],
      originalDateTime: { date: request['Investment Date'], time: request['Investment Time'] },
    }),
    refundRequest,
    registeredRefundRequestTime:
      requestSource === 'phone' ? getAvailableWorkingHour(refundRequest) : refundRequest,
    approvalTimeLimitHours: getApprovalTimeLimitHours(requestSource, TOSType),
  };
}
