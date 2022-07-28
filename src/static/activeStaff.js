import { faker } from "@faker-js/faker";

let activeStaff = [];

for (let i = 0; i < 16; i++) {
  activeStaff.push({
    index: i,
    image: faker.image.avatar(),
    name: faker.name,
    field: faker.name.jobArea(),
    desc: faker.lorem.paragraphs(3, "<br/>\n"),
  });
}

export default activeStaff;
