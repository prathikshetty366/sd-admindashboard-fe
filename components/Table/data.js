// Updated sample table data with date
export const sampletabledata = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    date: "2024-12-01",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    date: "2024-12-02",
  },
  {
    name: "Bill Gates",
    email: "bill@example.com",
    role: "Admin",
    date: "2024-12-03",
  },
  {
    name: "Elon Musk",
    email: "elon@example.com",
    role: "User",
    date: "2024-12-04",
  },
];

// Updated headers to include 'Date' column
export const headers = ["Name", "Email", "Role", "Date"];

// Filters for role-based filtering
export const filters = ["Admin", "User"];

// -----------------------

export const sampleMotorbikeBookings = [
  {
    bookingId: "BK001",
    customerName: "John Doe",
    motorbikeModel: "Yamaha R15",
    status: "Booked",
    bookingDate: "2024-12-01",
  },
  {
    bookingId: "BK002",
    customerName: "Jane Smith",
    motorbikeModel: "Honda CBR 600",
    status: "Picked",
    bookingDate: "2024-12-02",
  },
  {
    bookingId: "BK003",
    customerName: "Bill Gates",
    motorbikeModel: "Kawasaki Ninja",
    status: "Repairing",
    bookingDate: "2024-12-03",
  },
  {
    bookingId: "BK004",
    customerName: "Elon Musk",
    motorbikeModel: "Ducati Monster",
    status: "Shipped",
    bookingDate: "2024-12-04",
  },
  {
    bookingId: "BK005",
    customerName: "Mark Zuckerberg",
    motorbikeModel: "BMW S1000RR",
    status: "Completed",
    bookingDate: "2024-12-05",
  },
  {
    bookingId: "BK006",
    customerName: "Alice Johnson",
    motorbikeModel: "Suzuki GSX-R1000",
    status: "Booked",
    bookingDate: "2024-12-06",
  },
  {
    bookingId: "BK007",
    customerName: "Charlie Brown",
    motorbikeModel: "Harley Davidson Sportster",
    status: "Repairing",
    bookingDate: "2024-12-07",
  },
  {
    bookingId: "BK008",
    customerName: "David Lee",
    motorbikeModel: "Triumph Speed Triple",
    status: "Shipped",
    bookingDate: "2024-12-08",
  },
  {
    bookingId: "BK009",
    customerName: "Emma Watson",
    motorbikeModel: "KTM Duke 390",
    status: "Picked",
    bookingDate: "2024-12-09",
  },
  {
    bookingId: "BK010",
    customerName: "Tom Hanks",
    motorbikeModel: "Honda Africa Twin",
    status: "Completed",
    bookingDate: "2024-12-10",
  },
];

export const sampleRsaBookings = [
  {
    bookingId: "BK001",
    customerName: "John Doe",
    motorbikeModel: "Yamaha R15",
    status: "Booked",
    bookingDate: "2024-12-01",
  },
  {
    bookingId: "BK002",
    customerName: "Jane Smith",
    motorbikeModel: "Honda CBR 600",
    status: "Picked",
    bookingDate: "2024-12-02",
  },
  {
    bookingId: "BK003",
    customerName: "Bill Gates",
    motorbikeModel: "Kawasaki Ninja",
    status: "Repairing",
    bookingDate: "2024-12-03",
  },
  {
    bookingId: "BK004",
    customerName: "Elon Musk",
    motorbikeModel: "Ducati Monster",
    status: "Shipped",
    bookingDate: "2024-12-04",
  },
  {
    bookingId: "BK005",
    customerName: "Mark Zuckerberg",
    motorbikeModel: "BMW S1000RR",
    status: "Completed",
    bookingDate: "2024-12-05",
  },
  {
    bookingId: "BK006",
    customerName: "Alice Johnson",
    motorbikeModel: "Suzuki GSX-R1000",
    status: "Booked",
    bookingDate: "2024-12-06",
  },
  {
    bookingId: "BK007",
    customerName: "Charlie Brown",
    motorbikeModel: "Harley Davidson Sportster",
    status: "Repairing",
    bookingDate: "2024-12-07",
  },
  {
    bookingId: "BK008",
    customerName: "David Lee",
    motorbikeModel: "Triumph Speed Triple",
    status: "Shipped",
    bookingDate: "2024-12-08",
  },
  {
    bookingId: "BK009",
    customerName: "Emma Watson",
    motorbikeModel: "KTM Duke 390",
    status: "Picked",
    bookingDate: "2024-12-09",
  },
  {
    bookingId: "BK010",
    customerName: "Tom Hanks",
    motorbikeModel: "Honda Africa Twin",
    status: "Completed",
    bookingDate: "2024-12-10",
  },
];

export const remindersdata = [
  {
    customerId: "C001",
    vehicleNo: "AB123CD",
    service: 2, // 2 days service
    insurance: 10, // 10 days insurance
    emission: 2, // 2 days emission check
    status: "Active",
  },
  {
    customerId: "C002",
    vehicleNo: "EF456GH",
    service: 0, // 0 days service (expired)
    insurance: 0, // 0 days insurance (expired)
    emission: 0, // 0 days emission check (expired)
    status: "Expired",
  },
  {
    customerId: "C003",
    vehicleNo: "IJ789KL",
    service: 1, // 1 day service (active)
    insurance: 8, // 8 days insurance (active)
    emission: 3, // 3 days emission check (active)
    status: "Active",
  },
  {
    customerId: "C004",
    vehicleNo: "MN012OP",
    service: 0, // 0 days service (expired)
    insurance: 5, // 5 days insurance (active)
    emission: 0, // 0 days emission check (expired)
    status: "Expired",
  },
  {
    customerId: "C005",
    vehicleNo: "QR345ST",
    service: 3, // 3 days service (active)
    insurance: 10, // 10 days insurance (active)
    emission: 0, // 0 days emission check (expired)
    status: "Expired",
  },
  {
    customerId: "C006",
    vehicleNo: "UV678WX",
    service: 0, // 0 days service (expired)
    insurance: 0, // 0 days insurance (expired)
    emission: 0, // 0 days emission check (expired)
    status: "Expired",
  },
  {
    customerId: "C007",
    vehicleNo: "YZ901AB",
    service: 5, // 5 days service (active)
    insurance: 7, // 7 days insurance (active)
    emission: 3, // 3 days emission check (active)
    status: "Active",
  },
  {
    customerId: "C008",
    vehicleNo: "CD234EF",
    service: 0, // 0 days service (expired)
    insurance: 0, // 0 days insurance (expired)
    emission: 0, // 0 days emission check (expired)
    status: "Expired",
  },
];

export const customersData = [
  {
    name: "Anush",
    bikes: 1,
    contact: "7829487050",
    email: "anush@gmail.com",
    lastService: "2024-12-07",
  },
  {
    name: "Amit",
    bikes: 2,
    contact: "7829123456",
    email: "amit@example.com",
    lastService: "2024-12-11",
  },
  {
    name: "Ravi",
    bikes: 1,
    contact: "9847456",
    email: "ravi@hotmail.com",
    lastService: "2024-11-17",
  },
  {
    name: "Priya",
    bikes: 3,
    contact: "9028476",
    email: "priya@yahoo.com",
    lastService: "2024-10-30",
  },
  {
    name: "Sujay",
    bikes: 1,
    contact: "8763547",
    email: "sujay123@gmail.com",
    lastService: "2024-08-07",
  },
  {
    name: "Meera",
    bikes: 2,
    contact: "9902365",
    email: "meera123@gmail.com",
    lastService: "2024-09-07",
  },
];

export const reportData = [
  {
    month: "Jan",
    serviced: 30000,
    revenue: 500000,
    expense: 100000,
    profit: 800000,
  },
  {
    month: "Feb",
    serviced: 25000,
    revenue: 450000,
    expense: 90000,
    profit: 900000,
  },
  {
    month: "Mar",
    serviced: 35000,
    revenue: 600000,
    expense: 120000,
    profit: 700000,
  },
  {
    month: "Apr",
    serviced: 40000,
    revenue: 650000,
    expense: 150000,
    profit: 900000,
  },
  {
    month: "May",
    serviced: 42000,
    revenue: 700000,
    expense: 140000,
    profit: 700000,
  },
  {
    month: "Jun",
    serviced: 39000,
    revenue: 620000,
    expense: 110000,
    profit: 900000,
  },
  {
    month: "Jul",
    serviced: 30000,
    revenue: 500000,
    expense: 100000,
    profit: 800000,
  },
  {
    month: "Aug",
    serviced: 25000,
    revenue: 450000,
    expense: 90000,
    profit: 900000,
  },
  {
    month: "Sep",
    serviced: 35000,
    revenue: 600000,
    expense: 120000,
    profit: 700000,
  },
  {
    month: "Oct",
    serviced: 40000,
    revenue: 650000,
    expense: 150000,
    profit: 900000,
  },
  {
    month: "Nov",
    serviced: 42000,
    revenue: 700000,
    expense: 140000,
    profit: 700000,
  },
  {
    month: "Dec",
    serviced: 39000,
    revenue: 620000,
    expense: 110000,
    profit: 900000,
  },
];

// sparesdata.js
// export const sparesdata = [
//   {
//     id: 1,
//     name: "Brake Pads",
//     description: "High-quality brake pads for motorbikes.",
//     hsnCode: "1234",
//     price: 25.99,
//     usedIn: "Brakes",
//     category: "Brakes",
//     createdAt: "2023-11-01",
//   },
//   {
//     id: 2,
//     name: "Oil Filter",
//     description: "Replacement oil filter for various models.",
//     hsnCode: "5678",
//     price: 15.49,
//     usedIn: "Engine Maintenance",
//     category: "Engine",
//     createdAt: "2023-10-15",
//   },
//   {
//     id: 3,
//     name: "Chain Lubricant",
//     description: "Lubricant for chains and sprockets.",
//     hsnCode: "91011",
//     price: 12.99,
//     usedIn: "Maintenance",
//     category: "Maintenance",
//     createdAt: "2023-11-05",
//   },
//   {
//     id: 4,
//     name: "Spark Plugs",
//     description: "Replacement spark plugs for most motorcycles.",
//     hsnCode: "1122",
//     price: 10.99,
//     usedIn: "Electrical",
//     category: "Electrical",
//     createdAt: "2023-09-20",
//   },
//   {
//     id: 5,
//     name: "Motorbike Tires",
//     description: "Durable tires for motorbikes.",
//     hsnCode: "3344",
//     price: 89.99,
//     usedIn: "General Service",
//     category: "Tires",
//     createdAt: "2023-07-10",
//   },
// ];
// sparesdata.js
export const sparesdata = [
  {
    id: 1,
    hsnCode: "1234",
    name: "Brake Pads",
    description: "High-quality brake pads for motorbikes.",
    price: 25.99,
    category: "Brakes",
    createdAt: "2023-11-01",
    currentStock: 50, // Added stock
  },
  {
    id: 2,
    hsnCode: "5678",
    name: "Oil Filter",
    description: "Replacement oil filter for various models.",
    price: 15.49,
    category: "Engine",
    createdAt: "2023-10-15",
    currentStock: 100, // Added stock
  },
  {
    id: 3,
    hsnCode: "91011",
    name: "Chain Lubricant",
    description: "Lubricant for chains and sprockets.",
    price: 12.99,
    category: "Maintenance",
    createdAt: "2023-11-05",
    currentStock: 75, // Added stock
  },
  {
    id: 4,
    hsnCode: "1122",
    name: "Spark Plugs",
    description: "Replacement spark plugs for most motorcycles.",
    price: 10.99,
    category: "Electrical",
    createdAt: "2023-09-20",
    currentStock: 120, // Added stock
  },
  {
    id: 5,
    hsnCode: "3344",
    name: "Motorbike Tires",
    description: "Durable tires for motorbikes.",
    price: 89.99,
    category: "Tires",
    createdAt: "2023-07-10",
    currentStock: 30, // Added stock
  },
];

export const quotedata = [
  {
    id: 1,
    name: "Brake Pads",
    price: 25.99,
    qty: 2,
    amount: 25.99 * 2, // amount = price * qty
  },
  {
    id: 2,
    name: "Oil Filter",
    price: 15.49,
    qty: 3,
    amount: 15.49 * 3, // amount = price * qty
  },
  {
    id: 3,
    name: "Chain Lubricant",
    price: 12.99,
    qty: 1,
    amount: 12.99 * 1, // amount = price * qty
  },
  {
    id: 4,
    name: "Spark Plugs",
    price: 10.99,
    qty: 4,
    amount: 10.99 * 4, // amount = price * qty
  },
  {
    id: 5,
    name: "Motorbike Tires",
    price: 89.99,
    qty: 1,
    amount: 89.99 * 1, // amount = price * qty
  },
];

// Calculate Subtotal
const subtotal = sparesdata.reduce((total, item) => total + item.amount, 0);

// Optionally, add any other charges like tax, shipping, etc.
const tax = subtotal * 0.1; // Assuming 10% tax
const shipping = 15.0; // Shipping cost

// Calculate Total
const total = subtotal + tax + shipping;

export const summary = {
  subtotal,
  tax,
  shipping,
  total,
};

// /components/Table/data.js

export const vehiclesData = [
  {
    customerId: "CUST001",
    regNo: "KA01AB1234",
    model: "Swift",
    brand: "Maruti Suzuki",
    year: 2020,
    lastService: "2023-10-15",
  },
  {
    customerId: "CUST002",
    regNo: "KA05XY5678",
    model: "i20",
    brand: "Hyundai",
    year: 2019,
    lastService: "2023-11-10",
  },
  {
    customerId: "CUST003",
    regNo: "MH12XY7890",
    model: "City",
    brand: "Honda",
    year: 2018,
    lastService: "2023-12-05",
  },
];
