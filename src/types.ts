import { DateTime } from 'luxon';

import { TIMEZONE_MAPPINGS } from './constants';

type TimezoneKey = keyof typeof TIMEZONE_MAPPINGS;
export type RequestSource = 'web app' | 'phone';
export interface RefundRequest {
  Name: string;
  'Customer Location (timezone)': TimezoneKey;
  'Sign up date': string;
  'Request Source': RequestSource;
  'Investment Date': string;
  'Investment Time': string;
  'Refund Request Date': string;
  'Refund Request Time': string;
}

export type TOSType = 'new' | 'old';
export interface InternalRefundRequest {
  name: string;
  timeZone: string;
  signUp: DateTime;
  requestSource: RequestSource;
  TOSType: TOSType;
  investment: DateTime;
  refundRequest: DateTime;
  registeredRefundRequestTime: DateTime;
  approvalTimeLimitHours: number;
}
