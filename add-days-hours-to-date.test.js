const addDaysAndHoursToDate = require("./add-days-hours-to-date");

test("Should add two days to given date", () => {
  const submitDate = new Date(
    Date.parse("Tue Jul 23 2019 10:00:00 GMT+0200 (CEST)")
  );
  const addedDate = addDaysAndHoursToDate(submitDate, 2, 0).toString();

  expect(addedDate).toEqual("Thu Jul 25 2019 10:00:00 GMT+0200 (CEST)");
});

test("Should add two hour to given date", () => {
  const submitDate = new Date(
    Date.parse("Sun Sep 12 2010 12:00:00 GMT+0200 (CEST)")
  );
  const addedDate = addDaysAndHoursToDate(submitDate, 0, 2).toString();

  expect(addedDate).toEqual("Sun Sep 12 2010 14:00:00 GMT+0200 (CEST)");
});
