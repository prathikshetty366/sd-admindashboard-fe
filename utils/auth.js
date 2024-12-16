import { _getCookies } from "./cookies";

export function isAuthenticated() {
    // Replace this with your actual authentication logic
    return Boolean(_getCookies("accessToken"));
  }
  