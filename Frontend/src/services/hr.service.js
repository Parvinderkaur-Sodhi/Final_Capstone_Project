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

class HrService {

getAllEmployees() {
  return axios.get(API_URL_EMP, { headers: authHeader() });
}

getAllLeaveTypes() {
  return axios.get(API_URL_TYPE, { headers: authHeader() });
}

getAllLeaveRequest() {
  return axios.get(API_URL_REQ, { headers: authHeader() });
}

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


}

export default new HrService();