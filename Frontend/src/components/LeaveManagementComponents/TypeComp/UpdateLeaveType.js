import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import HrService from "../../../services/hr.service";
import { TextField, Button, Box, Card, CardContent, CardActions, CardHeader } from "@mui/material";
import { Done } from "@mui/icons-material";

function UpdateLeaveType(props) {
    const { user: currentUser } = props;
    const { typeId } = useParams();
    const [leaveType, setLeaveType] = useState({});
    const [leaveTypeName, setLeaveTypeName] = useState("");
    const [leaveTypeAllowedCount, setLeaveTypeAllowedCount] = useState(0);
    const [redirectToList, setRedirectToList] = useState(false);

    useEffect(() => {
        HrService.getLeaveType(typeId)
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
            typeId,
            typeName: leaveTypeName,
            countAllowed: leaveTypeAllowedCount,
        };

        HrService.updateLeaveType(updatedLeaveType)
            .then((response) => {
                setRedirectToList(true);
            })
            .catch((error) => {
                console.log("Error updating leave type:", error);
            });
    };

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    if (redirectToList) {
        return <Redirect to="/leaves-types" />;
    }

    return (
        <div>
            <Card>
                <CardHeader title={`Update Leave Type - ${leaveType.typeName}`} />
                <hr></hr>
                <CardContent>
                    <Box textAlign="center" margin={1}>
                        <TextField
                            label="Leave Type Name"
                            variant="outlined"
                            value={leaveTypeName}
                            onChange={(e) => setLeaveTypeName(e.target.value)}
                        />
                        &nbsp;&nbsp;
                        <TextField
                            label="Allowed Count"
                            type="number"
                            variant="outlined"
                            value={leaveTypeAllowedCount}
                            onChange={(e) => setLeaveTypeAllowedCount(e.target.value)}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Box display="flex" justifyContent="center" width="100%">
                        <Button
                            variant="outlined"
                            color="success"
                            startIcon={<Done />}
                            onClick={handleUpdateLeaveType}
                        >
                            Update Leave Type
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </div>
    );
}

export default UpdateLeaveType;
