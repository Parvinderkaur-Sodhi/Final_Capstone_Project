import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/";

class EmployeeService {
  
  getAllEmployeeById(id) {
    return axios.get(`${API_URL}employees/${id}`, { headers: authHeader() });
  }

<<<<<<< HEAD
  getAttendanceByEmployeeId(employeeId){
    return axios.get(`${API_URL}attendance/${employeeId}`);
  }

  getAllJobs(token){
    console.log("dfdsf");
    return axios.get(API_URL+'Jobs/viewJob',{headers:{"Authorization":`Bearer ${token}`}});
=======
  getAllJobs(token){
    console.log("dfdsf");
     return axios.get(API_URL+'Jobs/viewJob',{headers:{"Authorization":`Bearer ${token}`}});
>>>>>>> 89edea8fe7e32bbccbbf5285319878cccf22646c
  }
  
}

export default new EmployeeService();
