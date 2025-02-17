# Investor refund approvals
This is a Tech Test for a financial company. See [tech task descripion](./further-tech-test-senior.md)

The project is available to view on the following URL:
[https://further-tech-test-gv1v.vercel.app/](https://further-tech-test-gv1v.vercel.app/)

## Requirements
- Bun - see [install instructions](https://bun.sh/docs/installation)

## Running the project
```sh
# run next app
bun run dev

#run tests
bun test
```

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
- at this point I'm only using the pseudo-code as a reference and will likely not improve it to match functionality
- all date/time pairs are converted to UK time during the processing except signUp. this could be done differently though
- decided not to add tests for other utils for now. The `convertToDateTime.test.ts`-test file should be sufficient to determine my general approach to testing (test main paths of method, test some edge-cases, test for errors)

### Creating a Frontend UI
- moved over project to use Next.js, starting with a blank base to work from
- added a table with some simple branding, and a navigation bar
- configured vercel for automatic deployment
