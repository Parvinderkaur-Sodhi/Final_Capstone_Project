import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import HrService from "../../services/hr.service";
import {
    Card, CardContent, CardHeader,  Button, Grid, Box,Modal, FormControl, InputLabel, Select, Typography, Dialog, Snackbar, Alert,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { DatePicker } from '@mui/lab/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import hrService from "../../../services/hr.service";
import { MenuItem, TextField } from "@material-ui/core";
import HrNavbar from "../../DashBoardComponents/HrNavbar";

function PostJob(props) {
    const [job, setJob] = useState({});
    const [addSuccess, setAddSuccess] = useState(false);
    // const { user: currentUser } = props;

   

    const handleFieldChange = (fieldName, value) => {
        const v=`"${fieldName}"`;
        setJob((prevJob) => ({
            ...prevJob,
           [fieldName]: value,
        }));
    
    };

    const handleAdd = (e) => {
        e.preventDefault();

        

        hrService.postJob(job)
            .then((response) => {
                console.log(response.data);
                setAddSuccess(true);
            })
            .catch((error) => {
                console.log("Error adding Job:", error);
            });

    };

    const handleClose=()=>{
        setAddSuccess(false);
    }
  

    return (
        <>
        <HrNavbar/>
        <div>
            <Card style={{marginLeft:"150px"}}>
                <CardHeader className="title" title="Add New Job" />
                <CardContent>
                    <form onSubmit={handleAdd}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                            required={true}
                                label="Job Profile"
                                // value={Job.fname || ""}
                                onChange={(e) => handleFieldChange("jobProfile", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                 <FormControl fullWidth variant="outlined" required>
                                <InputLabel>category</InputLabel>
                                <Select
                                    label="category"
                                    // value={Job.gender || ""}
                                    onChange={(e) => handleFieldChange("category", e.target.value)}
                                >
                                    <MenuItem value="Design">Design</MenuItem>
                                    <MenuItem value="Development">Development</MenuItem>
                                    <MenuItem value="Testing">Testing</MenuItem>
                                    <MenuItem value="Sales">Banking</MenuItem>
                                <MenuItem value="Sales">Marketing</MenuItem>


                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                            multiline={true}
                                label="description"
                                required={true}
                                // value={Job.paddress || ""}
                                onChange={(e) => handleFieldChange("description", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel>Job Type</InputLabel>
                                <Select
                                    // value={Job.gender || ""}
                                    onChange={(e) => handleFieldChange("jobType", e.target.value)}
                                >
                                    <MenuItem value="Part time">Part time</MenuItem>
                                    <MenuItem value="Full time">Full time</MenuItem>
                                    <MenuItem value="Remote">Remote</MenuItem>
                                <MenuItem value="Internship">Internship</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel>Job Type</InputLabel>
                                <Select
                                    // value={Job.gender || ""}
                                    onChange={(e) => handleFieldChange("position", e.target.value)}
                                >
                                    <MenuItem value="Senior">Senior</MenuItem>
                                    <MenuItem value="Junior">Junior</MenuItem>
                                    

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                            required={true}
                                label="specialization"
                                // value={Job.email || ""}
                                onChange={(e) => handleFieldChange("specialization", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                            required={true}
                                label="Experience"
                                type="number"

                                // value={Job.phoneNumber || ""}
                                onChange={(e) => handleFieldChange("experience", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                            required={true}
                                label="Last date"
                                type="date"
                                // value={Job.doJoining || ""}
                                onChange={(e) => handleFieldChange("lastdate", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Salary"
                             type="number"
required={true}
                                // value={Job.jobTitle || ""}
                                onChange={(e) => handleFieldChange("salary", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                            required={true}
                                label="Vacancy"
                                type="number"
                                // value={Job.address || ""}
                                onChange={(e) => handleFieldChange("vacancy", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        
                         <Box display="flex" justifyContent="flex-end">
                            <Button variant="outlined"  type="submit" startIcon={<Add />}
style={{width:150,height:40,backgroundColor:"#98144d",margin:"20px 30px",color:"white"}}>
  <Typography style={{fontSize:15,fontWeight:'bolder'}}>Post Job</Typography></Button>  
                      
                    </Box>
                 </Grid>

                    </form>
                </CardContent>
            </Card>
            <Snackbar open={addSuccess}
            anchorOrigin={{vertical:"bottom",horizontal:"center"}}
            onclose={()=>setAddSuccess(false)}
            sx={{width:400,marginTop:20}}
            autoHideDuration={5000}
            >
                <Alert severity="success" variant="filled">
                    SuccessFully Added !
                </Alert>
            </Snackbar>
        </div>
        </>
    );
}

export default PostJob;
