function calculateDueDate(submitTime, turnAroundTime) {
  if (!Number.isInteger(parseInt(turnAroundTime))) {
    throw new Error("Turnaround time is not an integer!");
  }

  const date = Date.parse(submitTime);

  if (isNaN(date)) {
    throw new Error("Invalid submit date format!");
  }

  const submitDate = new Date(date);
  const reportDate = nearestProblemReprotingTime(submitDate);

  const reportDay = reportDate.getDay();
  const reportHour = reportDate.getHours();

  const addWeeksInDaysToDueDate = Math.floor(turnAroundTime / 40) * 7; // one week is 40 workshours

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

  const addSumDays = addWeeksInDaysToDueDate + Math.floor(addHourCounter / 24);
  const addSumHours = addHourCounter % 24;

  return addDaysAndHoursToDate(submitDate, addSumDays, addSumHours).toString();
}

function isWorkingHour(hour) {
  const weekHour = hour % 168;
  isWorkDay = weekHour / 24 >= 1 && weekHour / 24 <= 6 ? true : false;
  isWorkHour = weekHour % 24 >= 9 && weekHour % 24 < 17 ? true : false;

  return isWorkDay && isWorkHour;
}

function addDaysAndHoursToDate(submitDate, days, hours) {
  let dueDate = submitDate;
  dueDate.setDate(dueDate.getDate() + days);
  dueDate.setHours(dueDate.getHours() + hours);

  return dueDate;
}

function nearestProblemReprotingTime(submitDate) {
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

module.exports = calculateDueDate;
