import { faker } from "@faker-js/faker";

let activeStaff = [];

for (let i = 0; i < 5; i++) {
  activeStaff.push({
    image: faker.image.avatar(),
    name: faker.name,
    field: faker.commerce.department(),
  });
}

export default activeStaff;
