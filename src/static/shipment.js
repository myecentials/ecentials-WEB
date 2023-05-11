import { faker } from "@faker-js/faker";

let shipmentDetails = [];

for (let i = 0; i < 9; i++) {
  shipmentDetails.push({
    image: faker.image.avatar(),
    name: faker.name,
    id: faker.finance.pin(9),
    daysleft: faker.datatype.number({ min: 1, max: 9 }),
    value: faker.finance.amount(1000, 10000, 2, "₵ ", true),
  });
}

export default shipmentDetails;
