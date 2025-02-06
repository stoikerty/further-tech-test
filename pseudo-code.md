### General Overview
users request refunds

phone requests
- request refunds are dealt with during UK business hours (9am-5pm)
- requests outside of business hours are registered on the next business working day
- likely bank holidays need to be taken into account (assumed, not explicitly mentioned in task)

webapp requests
- immediate refund

### Utilities

convertToDate / convertToTime
- check time zone
- check conversionTimeZone
- output european date format
- output uk time

verifyTOSType
- check sign-up date
- output TOS-type

getTOSType
- check timezone
- call convertToDate
- check signUpDate
- output TOS type

getAvailableWorkingHour, takes date + time, outputs date + time
- check if working day
- check if working hours
- if both are true: return input date + time
- else: return next working day at 9am

### Process

registrationStart = getOfficialRegistrationStart (returns day and time)
- check timezone
- call convertToDate
- call convertToTime
- if requestType = phone
	- call getAvailableWorkingHour
	- return last value
- else return converted time

timeLimit = getApprovalTimeLimit
- check requestType
- call getTOSType
- output time-limit for given requestType & TOSType combo

investmentTime = call convertToTime

if registrationStart <= (investmentTime + timeLimit)
true

return false
