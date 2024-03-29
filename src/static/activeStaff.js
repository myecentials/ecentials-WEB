import { faker } from "@faker-js/faker";

let activeStaff = [];

for (let i = 0; i < 16; i++) {
  activeStaff.push({
    image: faker.image.avatar(),
    name: faker.name,
    field: faker.name.jobArea(),
    desc: faker.lorem.paragraphs(),
  });
}

export default activeStaff;
