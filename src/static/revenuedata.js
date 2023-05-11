import { faker } from "@faker-js/faker";

const days = [
  "Dec 19",
  "Dec 20",
  "Dec 21",
  "Dec 22",
  "Dec 23",
  "Dec 24",
  "Dec 25",
];

let data = [];

days.map((day) =>
  data.push({
    days: day,
    total: faker.datatype.number({ min: 1, max: 100 }),
    drugs: faker.datatype.number({ min: 1, max: 100 }),
    delivery: faker.datatype.number({ min: 1, max: 100 }),
  })
);

export default data;
