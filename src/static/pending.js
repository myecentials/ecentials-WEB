import { faker } from "@faker-js/faker";

const pending_data = [];
for (let i = 0; i < 200; i++) {
  pending_data.push({
    image: faker.internet.avatar(),
    patient_name: faker.name.fullName(),
    patient_id: faker.finance.pin(),
    createdAt: faker.date.between(
      "2023-05-01T00:00:00.000Z",
      "2023-06-01T00:00:00.000Z"
    ),
    gender: faker.name.sex().toUpperCase().charAt(0),
    time: faker.datatype.datetime(),
  });
}

export default pending_data;
