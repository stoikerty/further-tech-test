import { DateTime } from 'luxon';
import convertToDateTime from './convertToDateTime';

const formatOutput = (dt: DateTime) => dt.toFormat('yyyy-MM-dd HH:mm');

describe('convertToDateTime', () => {
  const testCases = [
    {
      originalTimeZone: 'US (PST)', // 'America/Los_Angeles'
      originalDateTime: { date: '1/2/2021', time: '09:00' },
      expected: '2021-01-02 17:00',
    },
    {
      originalTimeZone: 'US (EST)', // 'America/New_York'
      originalDateTime: { date: '1/2/2021', time: '09:00' },
      expected: '2021-01-02 14:00',
    },
    {
      originalTimeZone: 'Europe (CET)', // 'Europe/Paris'
      originalDateTime: { date: '2/1/2021', time: '09:00' },
      expected: '2021-01-02 08:00',
    },
    {
      originalTimeZone: 'Europe (GMT)', // 'Europe/London'
      originalDateTime: { date: '2/1/2021', time: '09:00' },
      expected: '2021-01-02 09:00',
    },
  ];

  testCases.forEach(({ originalTimeZone, originalDateTime, expected }) => {
    test(`converts ${originalTimeZone} to UK time (Europe/London)`, () => {
      const resultDate = convertToDateTime({ originalTimeZone, originalDateTime });
      expect(formatOutput(resultDate)).toBe(expected);
    });
  });

  test('converts Europe (GMT) to a different specified timezone', () => {
    const resultDate = convertToDateTime({
      originalTimeZone: 'Europe (GMT)',
      originalDateTime: { date: '2/1/2021', time: '09:00' },
      targetTimeZone: 'America/New_York',
    });
    const expected = '2021-01-02 04:00';

    expect(formatOutput(resultDate)).toBe(expected);
  });

  test('defaults to 00:00 in output time if original time is missing', () => {
    const resultDate = convertToDateTime({
      originalTimeZone: 'US (PST)',
      originalDateTime: { date: '1/2/2021' },
    });
    const expected = '2021-01-02 00:00';
    expect(formatOutput(resultDate)).toBe(expected);
  });
});

describe('convertToDateTime errors', () => {
  test('throws an error for unknown original time zone', () => {
    const originalDateTime = { date: '1/2/2021', time: '09:00' };
    expect(() =>
      convertToDateTime({ originalTimeZone: 'not-a-timezone', originalDateTime })
    ).toThrow(/Unknown time zone/);
  });

  test('throws an error for an invalid date input', () => {
    const originalDateTime = { date: '13/2/2021', time: '09:00' };
    expect(() => convertToDateTime({ originalTimeZone: 'US (EST)', originalDateTime })).toThrow(
      /Invalid date\/time/
    );
  });

  test('throws an error for an invalid time input', () => {
    const originalDateTime = { date: '13/2/2021', time: '25:00' };
    expect(() => convertToDateTime({ originalTimeZone: 'US (EST)', originalDateTime })).toThrow(
      /Invalid date\/time/
    );
  });

  test('throws an error for an invalid time input', () => {
    // Use an invalid time (e.g., "25:00" is not a valid hour)
    const originalDateTime = { date: '1/2/2021', time: '25:00' };
    expect(() => convertToDateTime({ originalTimeZone: 'US (PST)', originalDateTime })).toThrow(
      /Invalid date\/time/
    );
  });
});
