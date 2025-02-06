import convertToDateTime from './convertToDateTime';
import type { RefundRequest, InternalRefundRequest } from '../types';
import { TIMEZONE_MAPPINGS } from '../constants';

export default function adaptToInternalRefundRequest(
  request: RefundRequest
): InternalRefundRequest {
  const timeZone = TIMEZONE_MAPPINGS[request['Customer Location (timezone)']];
  return {
    timeZone,
    signUp: convertToDateTime({
      originalTimeZone: request['Customer Location (timezone)'],
      originalDateTime: { date: request['Sign up date'] },
      // keep timezone to respect local sign-up registration date
      targetTimeZone: timeZone,
    }),
    requestSource: request['Request Source'],
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
