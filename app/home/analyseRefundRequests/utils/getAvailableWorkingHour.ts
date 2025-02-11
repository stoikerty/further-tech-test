import { DateTime } from 'luxon';
import ukBankHolidays from '../uk-bank-holidays.json';

const bankHolidayDates: DateTime[] = ukBankHolidays['england-and-wales'].events.map(
  (event: { date: string }) => DateTime.fromISO(event.date, { zone: 'Europe/London' })
);

const isBankHoliday = (currentDateTime: DateTime): boolean => {
  return !!bankHolidayDates.find((holiday) => holiday.toISODate() === currentDateTime.toISODate());
};

const isWeekend = (currentDateTime: DateTime): boolean => {
  return currentDateTime.weekday === 6 || currentDateTime.weekday === 7;
};

const nextWorkingDayAt9am = (currentDateTime: DateTime): DateTime => {
  const nextDay = currentDateTime.plus({ days: 1 });

  if (isWeekend(nextDay) || isBankHoliday(nextDay)) {
    nextWorkingDayAt9am(nextDay);
  }

  const nextDayAt9am = nextDay.set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
  return nextDayAt9am;
};

export default function getAvailableWorkingHour(refundRequest: DateTime): DateTime {
  const startOfWorkingHours = refundRequest.set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
  const endOfWorkingHours = refundRequest.set({ hour: 17, minute: 0, second: 0, millisecond: 0 });

  if (isWeekend(refundRequest) || isBankHoliday(refundRequest)) {
    refundRequest = nextWorkingDayAt9am(refundRequest);
    return refundRequest;
  }

  if (refundRequest < startOfWorkingHours) {
    return refundRequest.set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
  }

  if (refundRequest > endOfWorkingHours) {
    refundRequest = nextWorkingDayAt9am(refundRequest);
    return refundRequest;
  }

  return refundRequest;
}
