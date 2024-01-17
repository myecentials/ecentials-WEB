import { faker } from "@faker-js/faker";
import image1 from "../assets/images/png/oraddrug1.png";
import image2 from "../assets/images/png/oraddrug1.png";
import image3 from "../assets/images/png/oraddrug2.png";
import image4 from "../assets/images/png/oraddrug2.png";
import image5 from "../assets/images/png/oraddrug3.png";
import image6 from "../assets/images/png/oraddrug3.png";
import image7 from "../assets/images/png/tablet1.png";
import image8 from "../assets/images/png/tablet1.png";
import image9 from "../assets/images/png/oraddrug2.png";
import image0 from "../assets/images/png/oraddrug3.png";

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

const discountType = [
  "NHIS",
  "NHIS",
  "N/A",
  "N/A",
  "NHIS",
  "NHIS",
  "N/A",
  "N/A",
  "NHIS",
  "NHIS",
];
const discount = [
  "50%",
  "50%",
  "N/A",
  "N/A",
  "50%",
  "50%",
  "N/A",
  "N/A",
  "50%",
  "50%",
];
const salesLevel = [
  "HIGH",
  "MODERATE",
  "LOW",
  "HIGH",
  "MODERATE",
  "LOW",
  "HIGH",
  "MODERATE",
  "LOW",
  "HIGH",
];
const regions = [
  "GREATER ACCRA",
  "ASHANTI",
  "NORTH",
  "GREATER ACCRA",
  "ASHANTI",
  "NORTH",
  "GREATER ACCRA",
  "ASHANTI",
  "NORTH",
  "GREATER ACCRA",
];
const cities = [
  "ACCRA",
  "KUMASI",
  "BRONG-AHAFO",
  "ACCRA",
  "KUMASI",
  "BRONG-AHAFO",
  "ACCRA",
  "KUMASI",
  "BRONG-AHAFO",
  "ACCRA",
];

const productImage = [
  image0,
  image2,
  image3,
  image1,
  image4,
  image5,
  image7,
  image6,
  image8,
  image9,
];
const salesColor = [
  "#42CB91",
  "#F1CD58",
  " #CB3F04",
  "#42CB91",
  "#F1CD58",
  " #CB3F04",
  "#42CB91",
  "#F1CD58",
  " #CB3F04",
  "#42CB91",
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
    quantity: faker.datatype.number({ min: 1, max: 10 }),
    productImage: productImage[i],
    discountType: discountType[i],
    discount: discount[i],
    invoiceID: `${faker.finance.pin(3)}-${faker.finance.pin(
      3
    )}-${faker.finance.pin(3)}`,
    desc: "Lorem ipsum dolor sit amet.",
    address: faker.address.streetAddress(),
    phone: faker.phone.number("054#######"),
    email: faker.internet.email(),
    country: `${faker.address.cityName()}, ${faker.address.country()}`,
    salesLevel: salesLevel[i],
    salesColor: salesColor[i],
    regions: regions[i],
    cities: cities[i],
  });
}

export default orders;


export const SalesOrders = [
  {
    invoiceId: '001',
    date: '2024-01-11',
    totalAmount: '150.00',
    customerName: 'John Doe',
  },
  {
    invoiceId: '002',
    date: '2024-01-12',
    totalAmount: '200.00',
    customerName: 'Jane Smith',
  },
  {
    invoiceId: '003',
    date: '2024-01-13',
    totalAmount: '120.50',
    customerName: 'Alice Johnson',
  },
  {
    invoiceId: '004',
    date: '2024-01-14',
    totalAmount: '300.00',
    customerName: 'Bob Williams',
  },
  {
    invoiceId: '005',
    date: '2024-01-15',
    totalAmount: '180.25',
    customerName: 'Eva Brown',
  },
  {
    invoiceId: '006',
    date: '2024-01-16',
    totalAmount: '250.75',
    customerName: 'Michael Davis',
  },
  {
    invoiceId: '007',
    date: '2024-01-17',
    totalAmount: '175.50',
    customerName: 'Olivia Smith',
  },
  {
    invoiceId: '008',
    date: '2024-01-18',
    totalAmount: '190.00',
    customerName: 'Daniel White',
  },
  {
    invoiceId: '009',
    date: '2024-01-19',
    totalAmount: '220.50',
    customerName: 'Sophia Taylor',
  },
  {
    invoiceId: '010',
    date: '2024-01-20',
    totalAmount: '270.00',
    customerName: 'Liam Anderson',
  },
];
