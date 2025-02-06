import { DateTime } from 'luxon';

const TARGET_TIME_ZONE_DEFAULT = 'Europe/London';

const timezoneMapping: Record<string, string> = {
  'US (PST)': 'America/Los_Angeles',
  'US (EST)': 'America/New_York',
  'Europe (CET)': 'Europe/Paris',
  'Europe (GMT)': 'Europe/London',
};

interface DateTimeInput {
  date: string;
  time?: string;
}

interface Options {
  originalTimeZone: string;
  originalDateTime: DateTimeInput;
  targetTimeZone?: string;
}

export default function convertToDateTime({
  originalTimeZone,
  originalDateTime,
  targetTimeZone = TARGET_TIME_ZONE_DEFAULT,
}: Options): DateTime {
  const timeZone = timezoneMapping[originalTimeZone];
  if (!timeZone) {
    throw new Error(`Unknown time zone: ${originalTimeZone}`);
  }

  const format = originalTimeZone.startsWith('US') ? 'M/d/yyyy' : 'd/M/yyyy';
  const hasTime = typeof originalDateTime.time === 'string';
  const initialTime = hasTime ? originalDateTime.time : '00:00';
  const dateTime = `${originalDateTime.date} ${initialTime}`;
  const dateTimeFormat = `${format} HH:mm`;

  const luxonDateTime = DateTime.fromFormat(dateTime, dateTimeFormat, { zone: timeZone });

  if (!luxonDateTime.isValid) {
    throw new Error(
      `Invalid date/time: "${dateTime}" for "${timeZone}" does not match the format "${dateTimeFormat}"`
    );
  }

  const convertedTime = luxonDateTime.setZone(targetTimeZone);

  if (!hasTime) {
    return convertedTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  }

  return convertedTime;
}
