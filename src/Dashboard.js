import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

export const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="relative h-screen">
                <div className="absolute bottom-16 right-16">
                <Button  variant="contained" onClick={() => navigate("/upload")}>Create new</Button>
                </div>
            </div>
        </>
    )
}
