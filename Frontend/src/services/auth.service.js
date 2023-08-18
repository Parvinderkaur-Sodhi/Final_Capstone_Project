import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
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
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("employeeId");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
