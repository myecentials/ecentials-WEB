import { faker } from "@faker-js/faker";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let data = [];

months.map((month) =>
  data.push({
    month: month,
    lastweek: faker.datatype.number({ min: 0, max: 100 }),
    thisweek: faker.datatype.number({ min: 0, max: 100 }),
  })
);

export default { data };
