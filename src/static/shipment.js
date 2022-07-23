import { faker } from "@faker-js/faker";

let shipmentDetails = [];

for (let i = 0; i < 9; i++) {
  shipmentDetails.push({
    name: faker.name,
    id: faker.datatype.number({ min: 123456789 }),
    daysleft: faker.datatype.number({ min: 1, max: 9 }),
    value: faker.datatype.number({ min: 10000, max: 100000 }),
  });
}

export default shipmentDetails;
