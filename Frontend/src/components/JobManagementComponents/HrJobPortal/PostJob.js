import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import HrService from "../../services/hr.service";
import {
    Card, CardContent, CardHeader, TextField, Button, Grid, Box, MenuItem, FormControl, InputLabel, Select,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { DatePicker } from '@mui/lab/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import hrService from "../../../services/hr.service";

function PostJob(props) {
    const [job, setJob] = useState({});
    // const [addSuccess, setAddSuccess] = useState(false);
    // const { user: currentUser } = props;

   

    const handleFieldChange = (fieldName, value) => {
        const v=`"${fieldName}"`;
        setJob((prevJob) => ({
            ...prevJob,
           [v]: value,
        }));
    
    };

    const handleAdd = () => {
        setJob((prevJob)=>({
            ...prevJob,
            "publish_date":new Date(),
        }))
        console.log(job);
        // Validate the phone number
        // if (Job.phoneNumber && Job.phoneNumber.length !== 10) {
        //     alert("Phone number must be 10 digits.");
        //     return;
        // }

        // // Validate email format
        // if (Job.email && !isValidEmail(Job.email)) {
        //     alert("Invalid email format.");
        //     return;
        // }

        hrService.postJob(job)
            .then((response) => {
                console.log(response.data);
                // setAddSuccess(true);
            })
            .catch((error) => {
                console.log("Error adding Job:", error);
            });

    };

    // if (addSuccess) {
    //     return <Redirect to="/Job-list" />;
    // }

    // if (!currentUser) {
    //     return <Redirect to="/login" />;
    // }

    return (
        <div>
            <Card>
                <CardHeader className="title" title="Add New Job" />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Job Profile"
                                // value={Job.fname || ""}
                                onChange={(e) => handleFieldChange("jobProfile", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Job Category"
                                // value={Job.lname || ""}
                                onChange={(e) => handleFieldChange("category", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Job Type</InputLabel>
                                <Select
                                    label="Gender"
                                    // value={Job.gender || ""}
                                    onChange={(e) => handleFieldChange("jobType", e.target.value)}
                                >
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="position"
                                // value={Job.department || ""}
                                onChange={(e) => handleFieldChange("position", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="specialization"
                                // value={Job.email || ""}
                                onChange={(e) => handleFieldChange("specialization", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Experience"
                                // value={Job.phoneNumber || ""}
                                onChange={(e) => handleFieldChange("experience", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
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
                                // value={Job.jobTitle || ""}
                                onChange={(e) => handleFieldChange("salary", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Vacancy"
                                // value={Job.address || ""}
                                onChange={(e) => handleFieldChange("vacancy", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="description"
                                // value={Job.paddress || ""}
                                onChange={(e) => handleFieldChange("description", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        </Grid>
                         <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleAdd}
                        >
                            Post Job
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

export default PostJob;
