import convertToDateTime from './convertToDateTime';
import getTOSType from './getTOSType';
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
  return {
    timeZone,
    signUp,
    requestSource,
    TOSType: getTOSType(signUp),
    investment: convertToDateTime({
      originalTimeZone: request['Customer Location (timezone)'],
      originalDateTime: { date: request['Investment Date'], time: request['Investment Time'] },
    }),
    refundRequest: convertToDateTime({
      originalTimeZone: request['Customer Location (timezone)'],
      originalDateTime: {
        date: request['Refund Request Date'],
        time: request['Refund Request Time'],
      },
    }),
  };
}
