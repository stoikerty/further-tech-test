import { DateTime } from 'luxon';

import type { TOSType } from '../types';

export default function getTOSType(signUp: DateTime): TOSType {
  const dateTimeFormat = 'd/M/yyyy';
  const dateTime = '2/1/2020';
  const cutOffDate = DateTime.fromFormat(dateTime, dateTimeFormat, { zone: signUp.zone });

  return signUp > cutOffDate ? 'New' : 'Old';
}
