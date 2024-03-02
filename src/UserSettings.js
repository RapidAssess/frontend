import React from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

function deleteMe() {
    axios({
            method:"POST",
            url:"/deleteuser",
            headers:{
                "Authorization": sessionStorage.userToken,
            }
        })
        .then((response) => {{
                console.log(response.msg);
                console.log(response.data);
                window.location.href="/";
            }

        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
}

function changeMyPassword() {}

function changeMyUsername() {}


export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Manage account" {...a11yProps(0)} />
          <Tab label="Delete Account" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}  className="flex flex-wrap">
      <Box className="flex">
        <Box className="max-w-[512px] m-3 p-3">
                    <Typography variant="h5">
                        Change password
                    </Typography>
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="curPassword"
                        label="Current password"
                        type="password"
                        name="curPassword"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="newPassword"
                        label="New password"
                        type="password"
                        name="newPassword"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confNewPassword"
                        label="Confirm new password"
                        type="password"
                        name="confNewPassword"
                        autoFocus
                    />
                    <Button
                        type="Submit"
                        fullWidth
                        variant="contained"
                    >
                        Confirm
                    </Button>
                </Box>
                <Box className="max-w-[512px] m-3 p-3">
                    <Typography variant="h5">
                        Change username
                    </Typography>
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="curUsername"
                        label="Current username"
                        type="text"
                        name="curUsername"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="newUsername"
                        label="New username"
                        type="text"
                        name="newUsername"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confNewUsername"
                        label="Confirm new username"
                        type="text"
                        name="confNewUsername"
                        autoFocus
                    />
                    <Button
                        type="Submit"
                        fullWidth
                        variant="contained"
                    >
                        Confirm
                    </Button>
                </Box>
                </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Button onClick={handleOpen} variant="contained" color="error"> {"Delete account"} </Button>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to delete your account?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Doing so will make your user data unrecoverable.
                </Typography>
                <Button onClick={deleteMe} variant="contained" color="error"> {"Delete"} </Button>
            </Box>
        </Modal>
      </CustomTabPanel>
    </Box>
  );
}
