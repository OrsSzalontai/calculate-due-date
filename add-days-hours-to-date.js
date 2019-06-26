function addDaysAndHoursToDate(submitDate, days, hours) {
  let dueDate = submitDate;
  dueDate.setDate(dueDate.getDate() + days);
  dueDate.setHours(dueDate.getHours() + hours);

  return dueDate;
}

module.exports = addDaysAndHoursToDate;
