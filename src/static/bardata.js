import { faker } from "@faker-js/faker";

const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

let bardata = [];

days.map((day) =>
  bardata.push({
    days: day,
    lastweek: faker.datatype.number({ min: 1, max: 100 }),
    thisweek: faker.datatype.number({ min: 1, max: 100 }),
  })
);

export default bardata;
