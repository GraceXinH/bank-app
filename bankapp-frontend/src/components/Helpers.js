import Global from "./Global";

export function baseUrl() {
  return process.env.REACT_APP_.BASE_URL;
}

export function currentUser() {
  return localStorage.getItem('userId');
}

export function currentToken() {
  return localStorage.getItem('token');
}

export function removeUser() {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("token");
  Global.expired = true;
}

export function userName() {
  return localStorage.getItem('userName');
}

export function logout() {
  console.log("logout");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("token");
  Global.expired = true;
}