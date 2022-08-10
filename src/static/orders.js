import { faker } from "@faker-js/faker";
import { min } from "d3";
const orders = [
  {
    name: faker.name,
    driverId: `GX ${faker.finance.pin(4)} - ${faker.datatype.number({
      min: 1,
      max: 30,
    })}`,
    orderId: `#ORD-${faker.finance.pin(4)}`,
    image: faker.image.avatar(),
    assignDate: faker.date.recent(),
    time: "1:29 PM",
    timeleft: faker.datatype.number({ min: 1, max: 59 }),
    isAssigned: faker.datatype.boolean(),
  },
  {
    name: faker.name,
    driverId: `GX ${faker.finance.pin(4)} - ${faker.datatype.number({
      min: 1,
      max: 30,
    })}`,
    orderId: `#ORD-${faker.finance.pin(4)}`,
    image: faker.image.avatar(),
    assignDate: faker.date.recent(),
    time: "1:29 PM",
    isAssigned: faker.datatype.boolean(),
    timeleft: faker.datatype.number({ min: 1, max: 59 }),
  },
  {
    name: faker.name,
    driverId: `GX ${faker.finance.pin(4)} - ${faker.datatype.number({
      min: 1,
      max: 30,
    })}`,
    orderId: `#ORD-${faker.finance.pin(4)}`,
    image: faker.image.avatar(),
    assignDate: faker.date.recent(),
    time: "1:29 PM",
    isAssigned: faker.datatype.boolean(),
    timeleft: faker.datatype.number({ min: 1, max: 59 }),
  },
  {
    name: faker.name,
    driverId: `GX ${faker.finance.pin(4)} - ${faker.datatype.number({
      min: 1,
      max: 30,
    })}`,
    orderId: `#ORD-${faker.finance.pin(4)}`,
    image: faker.image.avatar(),
    assignDate: faker.date.recent(),
    time: "1:29 PM",
    isAssigned: faker.datatype.boolean(),
    timeleft: faker.datatype.number({ min: 1, max: 59 }),
  },
  {
    name: faker.name,
    driverId: `GX ${faker.finance.pin(4)} - ${faker.datatype.number({
      min: 1,
      max: 30,
    })}`,
    orderId: `#ORD-${faker.finance.pin(4)}`,
    image: faker.image.avatar(),
    assignDate: faker.date.recent(),
    time: "1:29 PM",
    isAssigned: faker.datatype.boolean(),
    timeleft: faker.datatype.number({ min: 1, max: 59 }),
  },
  {
    name: faker.name,
    driverId: `GX ${faker.finance.pin(4)} - ${faker.datatype.number({
      min: 1,
      max: 30,
    })}`,
    orderId: `#ORD-${faker.finance.pin(4)}`,
    image: faker.image.avatar(),
    assignDate: faker.date.recent(),
    time: "1:29 PM",
    isAssigned: faker.datatype.boolean(),
    timeleft: faker.datatype.number({ min: 1, max: 59 }),
  },
  {
    name: faker.name,
    driverId: `GX ${faker.finance.pin(4)} - ${faker.datatype.number({
      min: 1,
      max: 30,
    })}`,
    orderId: `#ORD-${faker.finance.pin(4)}`,
    image: faker.image.avatar(),
    assignDate: faker.date.recent(),
    time: "1:29 PM",
    isAssigned: faker.datatype.boolean(),
    timeleft: faker.datatype.number({ min: 1, max: 59 }),
  },
  {
    name: faker.name,
    driverId: `GX ${faker.finance.pin(4)} - ${faker.datatype.number({
      min: 1,
      max: 30,
    })}`,
    orderId: `#ORD-${faker.finance.pin(4)}`,
    image: faker.image.avatar(),
    assignDate: faker.date.recent(),
    time: "1:29 PM",
    isAssigned: faker.datatype.boolean(),
    timeleft: faker.datatype.number({ min: 1, max: 59 }),
  },
];

export default orders;
