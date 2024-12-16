// pages/api/orders/[id].js

import { sampleMotorbikeBookings } from "@/components/Table/data"; // Importing the mock data

export default async function handler(req, res) {
  const { id } = req.query; // Extract the id (bookingId) from the URL parameters

  // Find the booking matching the bookingId
  const booking = sampleMotorbikeBookings.find((item) => item.bookingId === id);

  if (booking) {
    // Return the booking details if found
    res.status(200).json(booking);
  } else {
    // Return a 404 if no booking is found with the given bookingId
    res.status(404).json({ message: "Booking not found" });
  }
}
