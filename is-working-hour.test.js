const isWorkingHour = require("./is-working-hour");

test("Should return false when it is not working hour", () => {
  const hourOfWeek = 165;

  const reportDate = isWorkingHour(hourOfWeek);
  expect(reportDate).toEqual(false);
});

test("Should return true when it is working hour and with more week", () => {
  const hourOfWeek = 374; // 14+24+168+168;

  const reportDate = isWorkingHour(hourOfWeek);
  expect(reportDate).toEqual(true);
});
