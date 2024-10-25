export let __TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZXJwQG11Zy5jb20iLCJ1c2VybmFtZSI6InJpd2Vic29mdCJ9.89EaZzArzGv44nHv6mZCkcVjL9ruMhAxarhvgjY-umU";
export let __ROLE = "";
export let __School_Id = "";

export let __USER = {};

export function __setToken(authToken) {
  __TOKEN = authToken;
}
export function __setUser(user) {
  __USER = user;
}
export function __setRole(role) {
  __ROLE = role;
}
export function __setLocalization(authToken, user, role, school_id) {
  __TOKEN = authToken;
  __USER = user;
  __ROLE = role;
  __School_Id = school_id;
}

export function __getToken() {
  return __TOKEN;
}
export function __getUser() {
  return __USER;
}
export function __getRole() {
  return __ROLE;
}
