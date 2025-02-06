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
    test(`correctly converts ${originalTimeZone} to UK time (Europe/London)`, () => {
      const resultDate = convertToDateTime({ originalTimeZone, originalDateTime });
      expect(formatOutput(resultDate)).toBe(expected);
    });
  });

  test('correctly converts Europe (GMT) to a different specified timezone', () => {
    const resultDate = convertToDateTime({
      originalTimeZone: 'Europe (GMT)',
      originalDateTime: { date: '2/1/2021', time: '09:00' },
      targetTimeZone: 'America/New_York',
    });
    const expected = '2021-01-02 04:00';

    expect(formatOutput(resultDate)).toBe(expected);
  });
});
