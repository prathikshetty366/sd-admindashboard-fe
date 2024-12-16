import { useEffect, useState } from "react";

const GreetingTime = () => {
  const [greeting, setGreeting] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateGreetingAndTime = () => {
      // Create a Date object for the Asia/Kolkata timezone
      const currentDate = new Date();

      // Convert current time to Asia/Kolkata time using the correct timezone
      const options = {
        timeZone: "Asia/Kolkata",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // 12-hour format
      };

      // Use Intl.DateTimeFormat to format date and time based on the "Asia/Kolkata" timezone
      const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(
        currentDate
      );

      // Extract time and date separately from the formatted string
      const [formattedTime, ...rest] = formattedDate.split(", ");
      const [greetingDate] = rest;

      // Get the current hours in Asia/Kolkata timezone (24-hour format)
      const kolkataHours = currentDate.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        hour12: false, // Get hours in 24-hour format
      });

      // Convert the hours to an integer (24-hour format)
      const hours = parseInt(kolkataHours, 10);

      // Determine the greeting based on the time of day
      let timeGreeting = "";
      if (hours >= 6 && hours < 12) {
        timeGreeting = "Good Morning 👋!";
      } else if (hours >= 12 && hours < 16) {
        timeGreeting = "Good Afternoon 👋!";
      } else if (hours >= 16 && hours < 19) {
        timeGreeting = "Good Evening 👋!";
      } else {
        timeGreeting = "Good Night 👋!";
      }

      // Log values to ensure they're being set correctly
      console.log("Greeting: ", timeGreeting);
      console.log("Date: ", formattedDate);
      console.log("Time: ", formattedTime);

      // Only update state if the value has changed
      if (timeGreeting !== greeting) setGreeting(timeGreeting);
      if (formattedDate !== date) setDate(greetingDate); // Date should be without time
      if (formattedTime !== time) setTime(formattedTime);
    };

    // Run the update function once initially
    updateGreetingAndTime();

    // Optionally, update the time every 10 seconds
    const interval = setInterval(updateGreetingAndTime, 1000); // 10000ms = 10 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [greeting, date, time]); // Dependency array to ensure updates are made only when state changes

  // Log state values to ensure they're being updated
  console.log("State - Greeting: ", greeting);
  console.log("State - Date: ", date);
  console.log("State - Time: ", time);

  return (
    <div style={{ textAlign: "left", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#0F52BA" }}>
        {greeting || "Loading..."}
      </h1>
      <h2 style={{ fontWeight: "bold", fontSize: "1rem", color: "#333" }}>
        {date || "Loading..."}, {time || "Loading..."}
      </h2>
    </div>
  );
};

export default GreetingTime;
