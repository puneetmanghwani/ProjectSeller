import jwt_decode from "jwt-decode";
export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      window.location.href = "/logout";
    } else if (Date.now()/1000 > jwt_decode(token).exp) {
      window.location.href = "/logout";
    }
    else{
      return { Authorization: token };
    }
  }

  