const nearestReprotingDate = require("./nearest-reporting-date");
const isWorkingHour = require("./is-working-hour");
const addDaysAndHoursToDate = require("./add-days-hours-to-date");

function calculateDueDate(submitTime, turnAroundTime) {
  if (!Number.isInteger(parseInt(turnAroundTime))) {
    throw new Error("Turnaround time is not an integer!");
  }

  const date = Date.parse(submitTime);

  if (isNaN(date)) {
    throw new Error("Invalid submit date format!");
  }

  const submitDate = new Date(date);
  const reportDate = nearestReprotingDate(submitDate);

  const reportDay = reportDate.getDay();
  const reportHour = reportDate.getHours();

  const addDaysToDueDate = Math.floor(turnAroundTime / 40) * 7; // one week is 40 workshours

  let remainingHoursCounter = turnAroundTime % 40; // only the turnAroundTime modulo 40 is needed
  let weekHourCounter = reportDay * 24 + reportHour;
  let addHourCounter = 0;

  while (remainingHoursCounter) {
    if (isWorkingHour(weekHourCounter + 1)) {
      remainingHoursCounter -= 1;
    }
    addHourCounter += 1;
    weekHourCounter += 1;
  }

  const addSumDays = addDaysToDueDate + Math.floor(addHourCounter / 24);
  const addSumHours = addHourCounter % 24;

  return addDaysAndHoursToDate(submitDate, addSumDays, addSumHours).toString();
}

module.exports = calculateDueDate;
