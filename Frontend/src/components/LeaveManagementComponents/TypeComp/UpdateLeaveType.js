import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import HrService from "../../../services/hr.service";
import { TextField, Button, Box, Card, CardContent, CardActions, CardHeader } from "@mui/material";
import { Done } from "@mui/icons-material";
import HrNavbar from "../../DashBoardComponents/HrNavbar";
import {toast} from 'react-toastify';

function UpdateLeaveType(props) {
    const { user: currentUser } = props;
    const { typeId } = useParams();
    const [leaveType, setLeaveType] = useState({});
    const [leaveTypeName, setLeaveTypeName] = useState("");
    const [leaveTypeAllowedCount, setLeaveTypeAllowedCount] = useState(0);
    const [redirectToList, setRedirectToList] = useState(false);

    useEffect(() => {
        HrService.getLeaveTypeById(typeId)
            .then((response) => {
                const leaveTypeData = response.data;
                setLeaveType(leaveTypeData);
                setLeaveTypeName(leaveTypeData.typeName);
                setLeaveTypeAllowedCount(leaveTypeData.countAllowed);
            })
            .catch((error) => {
                console.log("Error fetching leave type details:", error);
            });
    }, [typeId]);

    const handleUpdateLeaveType = () => {
        const updatedLeaveType = {
            typeId: leaveType.typeId,
            typeName: leaveTypeName,
            countAllowed: leaveTypeAllowedCount,
        };

        HrService.updateLeaveType(leaveType.typeId, updatedLeaveType)
            .then((response) => {
                setRedirectToList(true);
                toast.success("Leave Type Updated successfully!!");
            })
            .catch((error) => {
                console.log("Error updating leave type:", error);
                toast.error("Error Updating Leave Type!!");
            });
    };

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    if (redirectToList) {
        return <Redirect to="/leave-types" />;
    }
    
    return (
        <div>
            <HrNavbar/>
            <Card style={{ height: "70vh"}}>
                <hr></hr>
                <CardHeader className="title" title={`Update Leave Type - ${leaveType.typeName}`} />
                <CardContent>
                    <form>
                        <hr></hr>
                        <br></br>
                        <br></br>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <TextField
                                label="Leave Type Name"
                                variant="outlined"
                                value={leaveTypeName}
                                onChange={(e) => setLeaveTypeName(e.target.value)}
                                style={{ marginBottom: "20px" }}
                            />
                            <TextField
                                label="Allowed Count"
                                type="number"
                                variant="outlined"
                                value={leaveTypeAllowedCount}
                                onChange={(e) => setLeaveTypeAllowedCount(e.target.value)}
                                style={{ marginBottom: "20px" }}
                            />
                            <Button
                                variant="outlined"
                                color="success"
                                startIcon={<Done />}
                                style={{ backgroundColor: '#98144d', color: "white" }}
                                onClick={handleUpdateLeaveType}
                            >
                                Update Leave Type
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default UpdateLeaveType;