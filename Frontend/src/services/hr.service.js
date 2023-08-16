import axios from "axios";
import authHeader from "./auth-header";

const API_URL_EMP = "http://localhost:8080/api/employees";
const API_URL_TYPE = "http://localhost:8080/api/leave-types";
const API_URL_REQ = "http://localhost:8080/api/leave-requests";
const API_URL_BAL = "http://localhost:8080/api/leave-balances";

//--
const API_URL_ATND="http://localhost:8080/api/attendance";
const API_URL_MARKATND="http://localhost:8080/api/attendance/addattendance";

//--



const API_URL_USER = "http://localhost:8080/api/test";

class HrService {

//Employees
getAllEmployees() {
  return axios.get(API_URL_EMP, { headers: authHeader() });
}

saveEmployee(employee) {
  return axios.post(API_URL_TYPE, employee, {headers: authHeader()})
}

getEmployeeById(employeeId) {
  return axios.get(`${API_URL_EMP}/${employeeId}`, { headers: authHeader() });
}

updateEmployee(employeeId, updatedEmployeeData) {
  const url = `${API_URL_EMP}/${employeeId}`;
  return axios.put(url, updatedEmployeeData, { headers: authHeader() });
}

deleteEmployee(employeeId) {
  return axios.delete(`${API_URL_EMP}/${employeeId}`, { headers: authHeader() });
}


//Leave Types
getAllLeaveTypes() {
  return axios.get(API_URL_TYPE, { headers: authHeader() });
}

getAllLeaveRequest() {
  return axios.get(API_URL_REQ, { headers: authHeader() });
}

getLeaveTypeById(typeId) {
  return axios.get(`${API_URL_TYPE}/${typeId}`, { headers: authHeader() });
}

updateLeaveType(typeId, leaveTypeData) {
  const url = `${API_URL_TYPE}/${typeId}`;
  return axios.put(url, leaveTypeData, { headers: authHeader() });
}

deleteLeaveType(typeId) {
  return axios.delete(`${API_URL_TYPE}/${typeId}`, { headers: authHeader() });
}

//Leave Requests
getAllLeaveRequests() {
  return axios.get(API_URL_REQ, { headers: authHeader() });
}

getLeaveRequestsById() {
  return axios.get(`${API_URL_REQ}/${requestId}`, { headers: authHeader() });
}

//Leave Balances
getAllLeaveBalances() {
  return axios.get(API_URL_BAL, { headers: authHeader() });
}

getAllAttendances(){
    return axios.get(API_URL_ATND, {headers: authHeader() });
}

markAttendance(employeeId, typedata){
    const url=`${API_URL_MARKATND}/${employeeId}`;
    return axios.post(url, typedata, {headers: authHeader()});
}


updateAttendance(attendanceId, attendanceData){
  const url=`${API_URL_ATND}/${attendanceId}`;
  return axios.put(url, attendanceData, {headers: authHeader()});
}

getAttendanceByEmployeeId(employeeId){
   const url=`${API_URL_ATND}/${employeeId}`;
   return axios.get(url, {headers: authHeader()} );
}




//export default new HrService();
saveLeaveType(typedata) {
  return axios.post(API_URL_TYPE, typedata, {headers: authHeader()});
}

//Users
getAllUsers() {
  return axios.post(API_URL_USER, {headers: authHeader()});
}

}

export default new HrService();
