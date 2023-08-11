import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";
const API_URL_EMP="http://localhost:8080/api/employees"
class HrService {
    getAllEmployees() {
        return axios.get(API_URL + "employees");
      }
    
      getAttendanceByEmployeeId(employeeId){
         return axios.get(`${API_URL}attendance/${employeeId}`);
      }

      markAttendance(employeeId){
        return axios.post(`${API_URL}attendance/addattendance/${employeeId}`);
      }

      updateAttendance(attendanceId){
        return axios.put(`${API_URL}attendance/${attendanceId}`);
      }
      
      getAllAttendanceDetails(){
        return axios.get(`${API_URL}attendance/AllAttendance`);
      }

      getAllEmployees() {
        return axios.get(API_URL_EMP, { headers: authHeader() });
      }

};

export default new HrService();