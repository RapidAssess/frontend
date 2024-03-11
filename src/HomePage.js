import React, { useState } from "react";
import { Button, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ImageUpload } from "./imageupload";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from 'react';
import axios from 'axios';
import ImagesList from './ImagesList';

const HomePage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [images, setImages] = useState([]); // State to store images

    useEffect(() => {
        const userId = sessionStorage.getItem('userId'); // Retrieve the userId, adjust based on your auth strategy
        axios.get(`/images/${userId}`)
            .then(response => {
                setImages(response.data.images); // Assuming the response contains an 'images' array
            })
            .catch(error => console.error("Error fetching images:", error));
    }, []);


  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "auto",
    bgcolor: "#d3d3d3",
    boxShadow: 24,
    p: 1,
    overflowY: "auto",
    borderRadius: "16px",
    maxWidth: "90vw",
    maxHeight: "80vh",
  };

  return (
    <div
      className="bg-lightgray h-screen w-screen m-0 p-5 overflow-auto"
      style={{ padding: 20 }}
      >
          <ImagesList />
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "#4E0506!important",
          color: "white!important",
          "&:hover": {
            backgroundColor: "#440000!important",
          },
        }}
        startIcon={<AddIcon />}
      >
        Create New Route
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-upload-modal-title"
        aria-describedby="image-upload-modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <ImageUpload />
        </Box>
      </Modal>
    </div>
  );
};

export default HomePage;
