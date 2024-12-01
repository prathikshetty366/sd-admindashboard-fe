import Cookies from "js-cookie";

const authCookieConfig = {
    path: "/",
    // sameSite: "strict", defaut lax
    // for admin portal if they don't want to login again in admin portal 
    // domain: process.env.NODE_ENV === "development" ? undefined  : ".simplenergy.com",
    expires: 7, // it handles both expires(in utc time) and maxAge (in seconds)
    secure: true, // for https
    sameSite:"lax"

};
export const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
};
export const _setAuthCookies = (key, value) => {
    Cookies.set(key, value, authCookieConfig);
};
export const _clearAuthCookies = (key) => {
    Cookies.remove(key, authCookieConfig);
};
export const _getCookies = (key) => {
    return isBlank(Cookies.get(key)) ? undefined : Cookies.get(key);
};