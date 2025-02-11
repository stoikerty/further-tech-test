import type { RequestSource, TOSType } from '../types';

export default function getApprovalTimeLimitHours(
  requestSource: RequestSource,
  TOSType: TOSType
): number {
  if (requestSource === 'phone') {
    if (TOSType === 'old') {
      return 4;
    } else {
      return 24;
    }
  } else {
    if (TOSType === 'old') {
      return 8;
    } else {
      return 16;
    }
  }
}
