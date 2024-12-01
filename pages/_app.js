import React, { useEffect, useState } from "react";
import "../styles/globals.css"; // global styles
import { getEvents } from "../data"; // assuming getEvents is a function that fetches the events
import { ApplicationLayout } from "./application-layout"; // assuming the layout component is here
import { usePathname, useRouter } from "next/navigation";
import {isAuthenticated} from "@/utils/auth"

// Metadata (same as the RootLayout)
export const metadata = {
  title: {
    template: "%s - Spannerdoor",
    default: "Spannerdoor",
  },
  description: "Spannerdoor is a tech-based Two-Wheeler Automobile Solution",
};


function MyApp({ Component, pageProps }) {
  const [events, setEvents] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Fetch events when the component mounts
    const fetchEvents = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);
    };

    fetchEvents();

    // Redirect to login if not authenticated and not already on the login page
    if (!isAuthenticated() && pathname !== "/login") {
      router.push("/login");
    }

    // Redirect authenticated users from login to the home page
    if (isAuthenticated() && pathname === "/login") {
      router.push("/orders");
    }
  }, [pathname, router]);

  // Define the routes where the layout should be excluded
  const excludedRoutes = ["/login"];

  // Check if the current route is excluded
  const isExcludedRoute = excludedRoutes.includes(pathname);

  return isExcludedRoute ? (
    <Component {...pageProps} />
  ) : (
    <ApplicationLayout events={events}>
      <Component {...pageProps} />
    </ApplicationLayout>
  );
}

export default MyApp;
