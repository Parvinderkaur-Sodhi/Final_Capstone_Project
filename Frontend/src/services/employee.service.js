import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";
const API_URL_REQ = "http://localhost:8080/api/leave-requests";

class EmployeeService {
  
  getAllEmployeeById(id) {
    return axios.get(`${API_URL}employees/${id}`, { headers: authHeader() });
  }

  getAllJobs(token){
    console.log("dfdsf");
     return axios.get(API_URL+'Jobs/viewJob',{headers:{"Authorization":`Bearer ${token}`}});
  }

  //Leave Requests
  getLeaveRequestByEmployeeId() {
    return axios.get(`${API_URL_REQ}/employee/${employeeIdd}`, { headers: authHeader() });
  }
  
}

export default new EmployeeService();
