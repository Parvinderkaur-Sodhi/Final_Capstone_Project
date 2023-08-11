import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/";

class EmployeeService {
  
  getAllEmployeeById(id) {
    return axios.get(`${API_URL}employees/${id}`, { headers: authHeader() });
  }

  getAllJobs(token){
    console.log("dfdsf");
     return axios.get(API_URL+'Jobs/viewJob',{headers:{"Authorization":`Bearer ${token}`}});
  }
  
}

export default new EmployeeService();
