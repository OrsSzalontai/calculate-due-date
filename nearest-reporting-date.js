const isWorkingHour = require("./is-working-hour");
const addDaysAndHoursToDate = require("./add-days-hours-to-date");

function nearestReprotingDate(submitDate) {
  let addHourCounter = 0;
  const submitDay = submitDate.getDay();
  const submitHour = submitDate.getHours();

  let weekHourCounter = submitDay * 24 + submitHour;

  while (!isWorkingHour(weekHourCounter)) {
    addHourCounter += 1;
    weekHourCounter += 1;
  }

  return addDaysAndHoursToDate(
    submitDate,
    Math.floor(addHourCounter / 24),
    addHourCounter % 24
  );
}
module.exports = nearestReprotingDate;
