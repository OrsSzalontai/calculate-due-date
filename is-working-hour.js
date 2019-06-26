function isWorkingHour(hour) {
  const weekHour = hour % 168;
  isWorkDay = weekHour / 24 >= 1 && weekHour / 24 <= 6 ? true : false;
  isWorkHour = weekHour % 24 >= 9 && weekHour % 24 < 17 ? true : false;

  return isWorkDay && isWorkHour;
}

module.exports = isWorkingHour;
