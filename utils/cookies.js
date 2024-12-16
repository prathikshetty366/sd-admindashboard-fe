import Cookies from "js-cookie";

const authCookieConfig = {
  path: "/",
  expires: 7, // Cookie valid for 7 days
  secure: process.env.NODE_ENV === "production", // Only secure cookies in production
  sameSite: "lax", // Default is lax for CSRF protection
};

export const isBlank = (str) => {
  return !str || /^\s*$/.test(str); // Check for empty or whitespace strings
};

// export const _setAuthCookies = (key, value) => {
//   try {
//     Cookies.set(key, value, authCookieConfig);
//   } catch (error) {
//     console.error("Error setting cookie:", error);
//   }
// };

export function _setAuthCookies(name, value) {
  if (typeof window !== "undefined") {
    // Use document.cookie to set cookies
    document.cookie = `${name}=${value}; path=/; max-age=3600`; // 1 hour expiration
  }
}

export const _clearAuthCookies = (key) => {
  try {
    Cookies.remove(key, { path: "/" }); // Remove with the same path to ensure deletion
  } catch (error) {
    console.error("Error clearing cookie:", error);
  }
};

export const _getCookies = (key) => {
  const value = Cookies.get(key);
  return isBlank(value) ? undefined : value;
};

export const isAuthenticated = () => {
  const token = Cookies.get("accessToken");
  return !!token; // Returns true if token exists, otherwise false
};
