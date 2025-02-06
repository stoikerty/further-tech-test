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

export type TOSType = 'New' | 'Old';
export interface InternalRefundRequest {
  timeZone: string;
  signUp: DateTime;
  requestSource: RequestSource;
  TOSType: TOSType;
  investment: DateTime;
  refundRequest: DateTime;
  acceptedRefundRequestTime: DateTime;
}
