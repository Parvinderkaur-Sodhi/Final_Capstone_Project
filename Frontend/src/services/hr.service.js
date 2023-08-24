import axios from "axios";
import authHeader from "./auth-header";

const API_URL="http://localhost:8080/api/";
const API_URL_EMP = "http://localhost:8080/api/employees";
const API_URL_TYPE = "http://localhost:8080/api/leave-types";
const API_URL_REQ = "http://localhost:8080/api/leave-requests";
const API_URL_BAL = "http://localhost:8080/api/leave-balances";
const API_URL_ATND="http://localhost:8080/api/attendance";
const API_URL_MARKATND="http://localhost:8080/api/attendance/addattendance";
const API_URL_MARK="http://localhost:8080/api/attendance"

const API_URL_USER = "http://localhost:8080/api/test";

class HrService {

//Service
getUserById(UserId) {
  return axios.get(`${API_URL_USER}/${UserId}`, { headers: authHeader() });
}

getAllUsers() {
  return axios.get(API_URL_USER, { headers: authHeader() });
}

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

getLeaveRequestsById(requestId) {
  return axios.get(`${API_URL_REQ}/${requestId}`, { headers: authHeader() });
}

setStatusLeaveRequest(requestId, status) {
  return axios.put(`${API_URL_REQ}/${requestId}/status`, status, { headers: authHeader() });
}

//Leave Balances
getAllLeaveBalances() {
  return axios.get(API_URL_BAL, { headers: authHeader() });
}
//attendance
/*getAllAttendances(){
    return axios.get(API_URL_ATND, {headers: authHeader() });
}*/

 getAllJobs(){
  console.log("fcdx");
     return axios.get(API_URL+'Jobs/viewJob',{headers:authHeader() });
  }

  getJobById(id){
    return axios.get(API_URL+'Jobs/viewJob/'+id,{headers:authHeader()});
  }


   getJobByprofile(profile){
     return axios.get(API_URL+'Jobs/viewJobProfile/'+profile,{headers:authHeader()});
  }
  
   getJobBytype(type){
     return axios.get(API_URL+'Jobs/viewByJobType/'+type,{headers:authHeader()});
  }

   getJobBycategory(category){
     return axios.get(API_URL+'Jobs/viewByJobCategory/'+category,{headers:authHeader()});
  }

  getJobByExperience(exp){
     return axios.get(API_URL+'Jobs/experience/'+exp,{headers:authHeader()});
  }

  getJobByPosition(position){
     return axios.get(API_URL+'Jobs/Position/'+position,{headers:authHeader()});
  }

   getJobBySalary(min,max){
     return axios.get(API_URL+'Jobs/Salary/'+min+'/'+max,{headers:authHeader()});
  }

  postJob(job){

    console.log(job);
    return axios.post(API_URL+'Jobs/postJob',job,{headers:authHeader()});
  }

  updateJob(id){
        return axios.put(API_URL+'/update'+id,{headers:{"Authorization":authHeader()}});

  }

  deleteJob(id){
        return axios.delete(API_URL+'/delete'+id,{headers:{"Authorization":authHeader()}});
  }

  viewAppliedJobs(){
     return axios.get(API_URL+'AppliedJobs/view',{headers:authHeader()});

  }

  searchByProfile(profile){
     return axios.get(API_URL+'AppliedJobs/searchByprofile/'+profile,{headers:authHeader()});

  }

   searchByStatus(status){
     return axios.get(API_URL+'AppliedJobs/searchByStatus/'+status,{headers:authHeader()});
  }

  searchByProfilenStatus(profile,status){
     return axios.get(API_URL+'AppliedJobs/ViewApplication/'+profile+'/'+status,{headers:authHeader()});
  }

  updateStatus(id,obj){
  const url = `${API_URL}AppliedJobs/updateStatus/${id}`;
  return axios.put(url, obj, { headers: authHeader() });  }

// markAttendance(employeeId){
//    return axios.post(`${API_URL_ANTD}addattendance/${employeeId}`, {headers: authHeader()});
// getAllAttendances(){
//     return axios.get(API_URL_ATND, {headers: authHeader() });
// }


approveAttendance(attendanceId) {
  const url = `${API_URL_MARK}/approve/${attendanceId}`;
  return axios.put(url, null, { headers: authHeader() })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

rejectAttendance(attendanceId) {
  const url = `${API_URL_MARK}/reject/${attendanceId}`;
  return axios.put(url, null, { headers: authHeader() })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

getPendingAttendances() {
  const url = `${API_URL_MARK}/pending`;
  return axios.get(url, { headers: authHeader() })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}


updateAttendance(attendanceId, attendanceData){
  const url=`${API_URL_ATND}/${attendanceId}`;
  return axios.put(url, attendanceData, {headers: authHeader()});
}

getAttendanceByEmployeeId(employeeId){
   const url=`${API_URL_ATND}/${employeeId}`;
   return axios.get(url, {headers: authHeader()} );
}

//---------


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
