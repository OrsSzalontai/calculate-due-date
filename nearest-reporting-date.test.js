const nearestReprotingDate = require("./nearest-reporting-date");

test("Should return monday morning when problem submission time is in weekend", () => {
  const submitDate = new Date(
    Date.parse("Sat Jun 29 2019 10:00:00 GMT+0200 (CEST)")
  );
  const reportDate = nearestReprotingDate(submitDate).toString();

  expect(reportDate).toEqual("Mon Jul 01 2019 09:00:00 GMT+0200 (CEST)");
});

test("Should return same report time when submission time is in workhours", () => {
  const submitDate = new Date(
    Date.parse("Fri Jun 28 2019 10:00:00 GMT+0200 (CEST)")
  );
  const reportDate = nearestReprotingDate(submitDate).toString();

  expect(reportDate).toEqual("Fri Jun 28 2019 10:00:00 GMT+0200 (CEST)");
});
