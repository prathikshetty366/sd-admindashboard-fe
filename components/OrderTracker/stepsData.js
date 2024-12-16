import Jobsheet from "./TrackerContents/Jobsheet/Jobsheet";
import Quote from "./TrackerContents/Quote/Quote";
import NextService from "./TrackerContents/NextService/NextService";
import Invoice from "./TrackerContents/Invoice/Invoice";
import Payment from "./TrackerContents/Payment/Payment";

export const steps = [
  {
    id: "1",
    name: "Jobsheet",
    href: "#step1",
    orderstatus: "Picked",
    tabcontent: (orderId, data) => (
      <Jobsheet id={data.jobId} orderId={orderId} />
    ), // Component for Jobsheet
  },
  {
    id: "2",
    name: "Quote",
    href: "#step2",
    orderstatus: "Diagnoising",
    tabcontent: (orderId, data) => (
      <Quote id={data.quoteId} orderId={orderId} />
    ), // Component for Quote
  },
  {
    id: "3",
    name: "Next Service",
    href: "#step3",
    orderstatus: "Repairing",
    tabcontent: (orderId, data) => (
      <NextService id={data.nextServiceId} orderId={orderId} />
    ), // Component for Next Service
  },
  {
    id: "4",
    name: "Invoice",
    href: "#step4",
    orderstatus: "Ready To Deliver",
    tabcontent: (orderId, data) => (
      <Invoice id={data.invoiceId} orderId={orderId} />
    ), // Component for Invoice
  },
  {
    id: "5",
    name: "Payment",
    orderstatus: "Payment Pending",
    href: "#step5",
    tabcontent: (orderId, data) => (
      <Payment id={data.paymentId} orderId={orderId} />
    ), // Component for Payment
  },
];
