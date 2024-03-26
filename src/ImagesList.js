import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const ImagesDisplay = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchImages = async () => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      setIsLoading(true);
      try {
        const response = await axios.get(`/listAI/${userId}`);
        setImages(response.data.images || []);

      } catch (error) {
        console.error("Failed to fetch images:", error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No user ID found. Please login.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (selectedImage) {
    <Box sx={style}>
      <h2 id="modal-modal-title">{selectedImage.name}</h2>
      <img
        src={`data:image/jpeg;base64,${selectedImage.data}`}
        alt={selectedImage.name}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </Box>;
  }

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    const imageId = event.currentTarget.getAttribute("data-imageid");
    const image = images.find((img) => img.id === imageId);
    if (image) {
      setSelectedImage(image);
    }
  };

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log("Edit:", selectedImage);
    handleClose();
  };

  const handleDelete = () => {
    const imageId = selectedImage.aiID;
    if (!imageId) {
      console.error("Error: imageId is undefined");
      return;
    }

    axios
      .delete(`/deleteAI/${imageId}`)
      .then((response) => {
        console.log("Delete response:", response.data);
        fetchImages();
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });

    setSelectedImage({});
    handleClose();
  };

  if (isLoading) {
    return <p>Loading images...</p>;
  }

  return (
    <div>
      {images.length > 0 ? (
        <div>
          <p>{`Total images: ${images.length}`}</p>
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                margin: "10px",
                display: "inline-block",
                background: "white",
                borderRadius: "10px",
                width: "180px",
                height: "180px",
                textAlign: "center",
                position: "relative",
              }}
            >
              <Button
                variant="outlined"
                style={{
                  width: "180px",
                  height: "180px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: "10px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                onClick={() => handleOpen(image)}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    style={{
                      flexGrow: 1,
                      marginLeft: "5px",
                      textAlign: "left",
                    }}
                  >
                    {image.name}
                  </Typography>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                    size="small"
                    style={{ margin: "0" }}
                    data-imageid={image.id}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </div>
                <img
                  src={`data:image/jpeg;base64,${image.data}`}
                  alt={image.name}
                  style={{
                    width: "auto",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />
              </Button>
              <Menu
                id="long-menu"
                onClose={handleClose}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          ))}
        </div>
      ) : (
        <p>No images found.</p>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-modal-title" className="font-ubuntu text-2xl mb-4">
            {selectedImage.name}
          </h2>
          <img
            src={`data:image/jpeg;base64,${selectedImage.data}`}
            alt={selectedImage.name}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ImagesDisplay;
