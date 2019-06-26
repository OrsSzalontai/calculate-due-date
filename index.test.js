const calculateDueDate = require("./index");

test("Should throw error when invalid submit date is given", () => {
  expect(() => {
    calculateDueDate("2018-69-420 09:12", "25");
  }).toThrow("Invalid submit date format!");
});

test("Should throw error when invalid submit hour is given", () => {
  expect(() => {
    calculateDueDate("2018-05-25 29:12", "25");
  }).toThrow("Invalid submit date format!");
});

test("Should throw error when invalid submit date is text", () => {
  expect(() => {
    calculateDueDate("This is not a Date, this is a jibberish!", "25");
  }).toThrow("Invalid submit date format!");
});

test("Should throw error when invalid turnaround time is given", () => {
  expect(() => {
    calculateDueDate("2018-05-25 09:12", true);
  }).toThrow("Turnaround time is not an integer!");
});

test("Should throw error when invalid turnaround time is text", () => {
  expect(() => {
    calculateDueDate("2018-05-25 09:12", "Im a  text!");
  }).toThrow("Turnaround time is not an integer!");
});

test("Should work with high turnaround times", () => {
  const submitDate = "Tue Jul 23 2019 10:00:00 GMT+0200 (CEST)";
  const turnaroundTime = 169;
  const dueDate = calculateDueDate(submitDate, turnaroundTime);
  expect(dueDate).toEqual("Wed Aug 21 2019 11:00:00 GMT+0200 (CEST)");
});

test("Should work with low turnaround times", () => {
  const submitDate = "Tue Jul 23 2019 10:00:00 GMT+0200 (CEST)";
  const turnaroundTime = 1;
  const dueDate = calculateDueDate(submitDate, turnaroundTime);
  expect(dueDate).toEqual("Tue Jul 23 2019 11:00:00 GMT+0200 (CEST)");
});

test("Should work with low turnaround times before weekend", () => {
  const submitDate = "Tue Jun 28 2019 16:00:00 GMT+0200 (CEST)";
  const turnaroundTime = 2;
  const dueDate = calculateDueDate(submitDate, turnaroundTime);
  expect(dueDate).toEqual("Mon Jul 01 2019 10:00:00 GMT+0200 (CEST)");
});

test("Should work with normal turnaround times with weekend submit", () => {
  const submitDate = "2019-05-25 09:12 GMT+0200 (CEST)";
  const turnaroundTime = 50;
  const dueDate = calculateDueDate(submitDate, turnaroundTime);
  expect(dueDate).toEqual("Tue Jun 04 2019 11:12:00 GMT+0200 (CEST)");
});
