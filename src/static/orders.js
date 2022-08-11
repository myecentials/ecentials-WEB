import { faker } from "@faker-js/faker";
import { min } from "d3";

const paymentType = [
  "cash",
  "Cash-On-Delivery",
  "Online",
  "Cash",
  "Cash",
  "Cash",
  "cash",
  "Cash-On-Delivery",
  "Online",
  "Cash",
];
const paymentStatus = [
  "Pending",
  "Rejected",
  "Approved",
  "Pending",
  "Rejected",
  "Approved",
  "Pending",
  "Rejected",
  "Approved",
  "Pending",
];
const orderStatus = [
  "Unfinished",
  "Cancel",
  "Done",
  "New",
  "Unfinished",
  "Cancel",
  "Done",
  "New",
  "Unfinished",
  "Cancel",
];
const btnColor = [
  "#FEF2E5",
  "#FBE7E8",
  "#EBF9F1",
  "#C1BBEB",
  "#FEF2E5",
  "#FBE7E8",
  "#EBF9F1",
  "#C1BBEB",
  "#FEF2E5",
  "#FBE7E8",
];
const textColor = [
  "#CD6200",
  "#A30D11",
  "#1F9254",
  "#4D44B5",
  "#CD6200",
  "#A30D11",
  "#1F9254",
  "#4D44B5",
  "#CD6200",
  "#A30D11",
];
const orders = [];

for (let i = 0; i < 10; i++) {
  orders.push({
    orderNo: i + 1,
    paymentType: paymentType[i],
    paymentStatus: paymentStatus[i],
    orderStatus: orderStatus[i],
    btnColor: btnColor[i],
    textColor: textColor[i],
    total: faker.finance.amount(100, 1000, 2),
    name: faker.name,
    driverId: `GX ${faker.finance.pin(4)} - ${faker.datatype.number({
      min: 1,
      max: 30,
    })}`,
    orderId: faker.finance.pin(4),
    image: faker.image.avatar(),
    assignDate: faker.date.recent(),
    time: "1:29 PM",
    timeleft: faker.datatype.number({ min: 1, max: 59 }),
    isAssigned: faker.datatype.boolean(),
  });
}

export default orders;
