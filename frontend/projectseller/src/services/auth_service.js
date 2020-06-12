import axios from "axios";
import jwt_decode from "jwt-decode";


const API_URL = "http://localhost:8000/user/";

class AuthService {
    login(email,password){
        return axios
        .post(API_URL+'login',{
            email,
            password
        })
        .then(response=>{
            if(response.data.token){
                localStorage.setItem("user", JSON.stringify(jwt_decode(response.data.token)));
                localStorage.setItem("token", JSON.stringify(response.data.token));
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        
    }

    register(email, name, password) {
        console.log(API_URL+"register");
        return axios.post(API_URL + "register", {
          email,
          name,
          password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
      }
}

export default new AuthService();