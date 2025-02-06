# Investor refund approvals
This is a Tech Test for a financial company. See [tech task descripion](./further-tech-test-senior.md)

## Requirements
- Bun - see [install instructions](https://bun.sh/docs/installation)

### Overall thinking process
#### Initial high-level thoughts
- [read description of task](./further-tech-test-senior.md)
- [create initial pseudocode](./pseudo-code.md)
- map out likely requirements for processing data
  - parser/converter utility or lib for dates & times
  - way to get bank holiday data

#### Deciding on helpful tools to use
The vanilla js `Intl` and `Date` may not be the best option (see [Moment.js explanation under "No Library"](https://momentjs.com/docs/#/-project-status/recommendations/)). Without delving too much into detail, the decision was made to use [Luxon](https://moment.github.io/luxon/#/).

Bun was chosen for it's fast setup where you get prettier, typescript and test tools all while benefiting from speedy compile-time and maintaining node.js compatibility.

#### On Supporting Bank Holidays
At the moment, only UK bank holidays are supported. The assumption is that the bank holidays for the region `england-and-wales` are the correct dates.

Bank Holiday data comes from UK.gov's official resource [https://www.gov.uk/bank-holidays.json](https://www.gov.uk/bank-holidays.json). Updates are manual, however a task can be run to periodically update the existing [uk-bank-holidays.json](./src/uk-bank-holidays.json) json-file.

### Writing the DateTime conversion
- decided on a `timezoneMapping` to facilitate working with clear timezones
- initially planned to ouput a regular Date object but decided on using the `luxon` `DateTime`-type instead to support timezones in DateTime output
- used [Online Conversion Tool](https://www.timeanddate.com/worldclock/converter.html?iso=20210201T170000&p1=137&p2=179&p3=195&p4=136) to manually verify times

### Writing the main function
- it's interesting to note that for sign-up date registrations, the local date is respected
- where-as for refund requests, the UK date/time is what matters
- decided to create an adapter to convert data from the external source to an internal representation that's easier to work with (adapter design pattern)
