import axios from "axios";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password, role) {
    return axios
      .post(API_URL + "signin", { username, password, role })
      .then((response) => {
        if (response.data.accessToken) {

          // Store the user details in local storage
          localStorage.setItem("user", JSON.stringify(response.data));

          // Fetch the employee ID using the user's ID
          axios.get(API_URL + "getEmployeeId", {
            params: { userId: response.data.id }

          }).then((employeeResponse) => {

            // Store the employee ID in local storage
            localStorage.setItem("employeeId", employeeResponse.data);
          });

          return response.data;
        }

      });
  }

  logout() {
    Redirect("/login");
    localStorage.removeItem("user");
    localStorage.removeItem("employeeId");
  }

  register(role, username, email, password) {
    return axios.post(API_URL + "signup", {
      role,
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
