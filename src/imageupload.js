import { useState, useEffect } from "react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { Button, Modal, Box } from "@mui/material";
import { TextField } from "@mui/material";

import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Tooltip } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import IconButton from "@mui/material/IconButton";
import CollectionsIcon from "@mui/icons-material/Collections";
import SettingsIcon from "@mui/icons-material/Settings";
import PinDropIcon from "@mui/icons-material/PinDrop";
import "./output.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [result, setResult] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [threshold, setThreshold] = useState(10);
  const [greenPinMode, setGreenPinMode] = useState(false);
  const [redPinMode, setRedPinMode] = useState(false);
  const [yellowPinMode, setYellowPinMode] = useState(false);
  const [greenPin, setGreenPin] = useState(null);
  const [yellowPin, setYellowPin] = useState(null);
  const [redPin, setRedPin] = useState(null);
  const [advancedSettingsVisible, setAdvancedSettingsVisible] = useState(false);

  const [isClearFormVisible, setIsClearFormVisible] = useState(false);
  const [clearOptions, setClearOptions] = useState({
    greenPin: false,
    yellowPin: false,
    redPin: false,
    allPins: false,
    image: false,
  });

  const CustomNumberInput = ({ value, onChange, min = 0, max = 256 }) => {
    const [localValue, setLocalValue] = useState(value.toString());

    useEffect(() => {
      setLocalValue(value.toString());
    }, [value]);

    const handleIncrement = () => onChange(Math.min(value + 1, max));
    const handleDecrement = () => onChange(Math.max(value - 1, min));

    const handleLocalChange = (event) => {
      const newValue = event.target.value;
      setLocalValue(newValue);
    };

    const handleBlur = () => {
      const newValue = Math.max(min, Math.min(max, Number(localValue)));
      onChange(newValue);
    };

    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          value={localValue}
          onChange={handleLocalChange}
          onBlur={handleBlur}
          type="number"
          sx={{ mx: 1, width: "80px" }}
          InputProps={{ inputProps: { min, max } }}
        />
      </Box>
    );
  };

  const handleClearOptionChange = (event) => {
    const { name, checked } = event.target;
    if (name === "allPins") {
      setClearOptions({
        greenPin: checked,
        yellowPin: checked,
        redPin: checked,
        allPins: checked,
        image: clearOptions.image,
      });
    } else {
      setClearOptions({
        ...clearOptions,
        [name]: checked,
      });
    }
  };

  const handleClearFormSubmit = (event) => {
    event.preventDefault();
    if (clearOptions.image) {
      clearData();
      //setSelectedFile(undefined);
      //setImage(false);
      //setData(undefined);
      //setPreview(null);
      //setGreenPin(null);
      //setYellowPin(null);
      //setRedPin(null);
      //setGreenPinMode(false);
      //setRedPinMode(false);
      //  setYellowPinMode(false);
      //  clearData();
      //  console.log(data)
    } else {
      if (clearOptions.greenPin) setGreenPin(null);
      if (clearOptions.yellowPin) setYellowPin(null);
      if (clearOptions.redPin) setRedPin(null);
    }
    setIsClearFormVisible(false);
    setClearOptions({
      greenPin: false,
      yellowPin: false,
      redPin: false,
      allPins: false,
      image: false,
    });
  };

  const closeModal = () => setIsClearFormVisible(false);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg"],
    },
  });

  //const sendFile = async () => {
  //  console.log(startX + startY + endX + endY);
  //  if (image) {
  //    let formData = new FormData();
  //    formData.append("file", selectedFile);
  //    formData.append("startX", startX || 0);
  //    formData.append("startY", startY || 0);
  //    formData.append("endX", endX || 0);
  //    formData.append("endY", endY || 0);
  //    formData.append("threshold", threshold);
  //    let res = await axios({
  //      method: "post",
  //      url: "http://127.0.0.1:5000/predict",
  //      data: formData,
  //      responseType: "blob",
  //    });

  //    var url = URL.createObjectURL(res.data);
  //    setResult(url);

  //    setStartX(0);
  //    setStartY(0);
  //    setEndX(0);
  //    setEndY(0);
  //  }
  //};
  const sendFile = async () => {
    console.log(startX, startY, endX, endY);
    if (image) {
      setIsloading(true);
      let formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("startX", startX || 0);
      formData.append("startY", startY || 0);
      formData.append("endX", endX || 0);
      formData.append("endY", endY || 0);
      formData.append("threshold", threshold);

      try {
        let res = await axios({
          method: "post",
          url: "http://127.0.0.1:5000/predict",
          data: formData,
          responseType: "blob",
        });

        var url = URL.createObjectURL(res.data);
        setPreview(url);
        setResult(url);
      } catch (error) {
        console.error("Error processing the image: ", error);
      } finally {
        setIsloading(false);
      }
    }
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setGreenPin(null);
    setYellowPin(null);
    setRedPin(null);
    setGreenPinMode(false);
    setRedPinMode(false);
    setYellowPinMode(false);
  };

  const handleImageClick = (event) => {
    let pinColor = "";
    const boundingBox = event.currentTarget.getBoundingClientRect();
    let clickedX = event.clientX - boundingBox.left;
    let clickedY = boundingBox.bottom - event.clientY;

    if (greenPinMode) {
      pinColor = "#27FF00";
      setGreenPin({ x: clickedX, y: clickedY, color: pinColor });
      setGreenPinMode(false);
    } else if (yellowPinMode) {
      pinColor = "#FFFF00";
      setYellowPin({ x: clickedX, y: clickedY, color: pinColor });
      setYellowPinMode(false);
    } else if (redPinMode) {
      pinColor = "#FF0000";
      setRedPin({ x: clickedX, y: clickedY, color: pinColor });
      setRedPinMode(false);
    }
  };

  const handlePinMode = (color, pinSetter) => {
    setGreenPinMode(false);
    setRedPinMode(false);
    setYellowPinMode(false);

    pinSetter(null);

    switch (color) {
      case "green":
        setGreenPinMode(true);
        break;
      case "yellow":
        setYellowPinMode(true);
        break;
      case "red":
        setRedPinMode(true);
        break;
      default:
        break;
    }
  };
  const toggleAdvancedSettings = () => {
    setAdvancedSettingsVisible(!advancedSettingsVisible);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    // sendFile();
  }, [preview]);

  useEffect(() => {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(acceptedFiles[0]);
    setData(undefined);
    setImage(true);
  }, [acceptedFiles]);

  return (
    <div className="min-h-auto text-white self-center content-center items-center p-5 bg-lightgray">
      <div
        className="self-center"
        {...getRootProps({ className: "dropzone" })}
      />
      <h1 className="text-maroonhover font-ubuntu text-2xl">
        <b>CREATE ROUTE</b>
      </h1>
      <div className="bg-white rounded p-6 m-3">
        <input
          type="text"
          placeholder="Enter Location Title"
          className="px-4 py-2 mt-3 border rounded focus:outline-none focus:border-black-500 text-black w-1/2"
          //value={locationTitle}
          //onChange={(e) => setLocationTitle(e.target.value)}
        />

        <div className="m-10 flex jusitfy-center items-center">
          {image ? (
            <div
              className="m-10 mt-1"
              style={{
                margin: "auto",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {preview && (
                <div
                  style={{
                    position: "relative",
                    width: "80vw",
                    height: "auto",
                    maxWidth: "512px",
                  }}
                  onClick={(event) => handleImageClick(event)}
                >
                  <img
                    src={preview}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                  {greenPin && (
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: greenPin.color,
                        position: "absolute",
                        bottom: greenPin.y,
                        left: greenPin.x,
                      }}
                    />
                  )}
                  {yellowPin && (
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: yellowPin.color,
                        position: "absolute",
                        bottom: yellowPin.y,
                        left: yellowPin.x,
                      }}
                    />
                  )}
                  {redPin && (
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: redPin.color,
                        position: "absolute",
                        bottom: redPin.y,
                        left: redPin.x,
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <Card
                style={{
                  minHeight: "15vh",
                  minWidth: "auto",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="mx-auto"
              >
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  {...getInputProps()}
                />
                <div className="flex justify-center items-center">
                  <div className="m-3">
                    <label htmlFor="contained-button-file">
                      <Fab className="m-3" component="span">
                        <AddPhotoAlternateIcon className="m-3" />
                      </Fab>
                    </label>
                  </div>
                  <div className="m-3">
                    <label htmlFor="contained-button-file">
                      <Fab className="m-3" component="span">
                        <CollectionsIcon className="m-3" />
                      </Fab>
                    </label>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center">
            <button
              className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 py-2 rounded m-2 flex items-center"
              onClick={() => handlePinMode("green", setGreenPin)}
              disabled={greenPinMode}
            >
              <PinDropIcon style={{ color: "white", marginRight: "8px" }} />
              Start
            </button>

            <button
              className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white px-4 py-2 rounded m-2 flex items-center"
              onClick={() => handlePinMode("yellow", setYellowPin)}
              disabled={yellowPinMode}
            >
              <PinDropIcon style={{ color: "white", marginRight: "8px" }} />
              Rescue
            </button>

            <button
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded m-2 flex items-center"
              onClick={() => handlePinMode("red", setRedPin)}
              disabled={redPinMode}
            >
              <PinDropIcon style={{ color: "white", marginRight: "8px" }} />
              End
            </button>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-5">
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            onClick={toggleAdvancedSettings}
            aria-label="advanced settings"
          >
            <SettingsIcon />
          </IconButton>
        </div>
        <Modal
          open={advancedSettingsVisible}
          onClose={toggleAdvancedSettings}
          aria-labelledby="advanced-settings-title"
          aria-describedby="advanced-settings-description"
        >
          <Box sx={modalStyle}>
            <h2 id="advanced-settings-title">Advanced Settings</h2>
            <div className="text-black p-3 flex items-center">
              <h1 className="text-l font-bold "> Threshold </h1>
              <Tooltip
                title="Default is 10, set to lower value if roads aren't fully detected (or vice versa)"
                placement="top"
                arrow
              >
                <HelpOutlineIcon className="cursor-pointer" />
              </Tooltip>

              <div style={{ marginRight: "16px" }}>
                {/*<NumberInput*/}
                {/*  aria-label="Demo number input"*/}
                {/*  placeholder="Type a number…"*/}
                {/*  value={threshold}*/}
                {/*  onChange={(event, val) => setThreshold(val)}*/}
                {/*  min={0}*/}
                {/*  max={255}*/}
                {/*  className="m-4"*/}
                {/*/>*/}
                <CustomNumberInput
                  value={threshold}
                  onChange={setThreshold}
                  min={0}
                  max={256}
                />
              </div>
            </div>
            <div className="relative p-2">
              <div className="absolute right-0 top-0">
                <Button
                  className="flex justify-end"
                  sx={{ color: "#4E0506" }}
                  onClick={toggleAdvancedSettings}
                >
                  Close
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="flex justify-end space-x-4 mt-5">
        <button
          className="bg-maroonbg hover:bg-maroonhover text-white py-2 px-4 rounded hover:border-red-800"
          onClick={sendFile}
        >
          Submit
        </button>
        <button className="bg-maroonbg hover:bg-maroonhover text-white py-2 px-4 rounded hover:border-red-800">
          Save
        </button>
        <button
          className="bg-maroonbg hover:bg-maroonhover text-white py-2 px-4 rounded hover:border-red-800"
          onClick={() => setIsClearFormVisible(true)}
        >
          Clear Options
        </button>
      </div>

      <Modal
        open={isClearFormVisible}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <form onSubmit={handleClearFormSubmit}>
            <div>
              <h2>
                <b>What do you want to clear?</b>
              </h2>
              <input
                type="checkbox"
                id="greenPin"
                name="greenPin"
                checked={clearOptions.greenPin}
                onChange={handleClearOptionChange}
              />
              <label htmlFor="greenPin"> Green Pin</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="yellowPin"
                name="yellowPin"
                checked={clearOptions.yellowPin}
                onChange={handleClearOptionChange}
              />
              <label htmlFor="yellowPin"> Yellow Pin</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="redPin"
                name="redPin"
                checked={clearOptions.redPin}
                onChange={handleClearOptionChange}
              />
              <label htmlFor="redPin"> Red Pin</label>
            </div>
            {/*<div>*/}
            {/*  <input*/}
            {/*    type="checkbox"*/}
            {/*    id="allPins"*/}
            {/*    name="allPins"*/}
            {/*    checked={clearOptions.allPins}*/}
            {/*    onChange={handleClearOptionChange}*/}
            {/*  />*/}
            {/*  <label htmlFor="allPins"> All Pins</label>*/}
            {/*</div>*/}
            <div>
              <input
                type="checkbox"
                id="image"
                name="image"
                checked={clearOptions.image}
                onChange={handleClearOptionChange}
              />
              <label htmlFor="image"> Image</label>
            </div>
            <div className="relative w-full p-2">
              <div className="absolute right-0 top-0">
                <Button
                  className="jusitfy-end"
                  sx={{ color: "#4E0506" }}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  className="justify-end"
                  sx={{ color: "#4E0506" }}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
      {/*<div className="flex mb-10 justify-center">*/}
      {/*<div className="p-3" style={{ margin: "auto", width: "100%" }}>*/}
      {/*  <h1 className="text-xl font-bold"> Starting Coordinates </h1>*/}
      {/*  <div className="text-black">*/}
      {/*    <p className="text-white">Start X:</p>*/}
      {/*    <NumberInput*/}
      {/*      aria-label="Demo number input"*/}
      {/*      placeholder="Type a number…"*/}
      {/*      value={startX}*/}
      {/*      onChange={(event, val) => setStartX(val)}*/}
      {/*      min={0}*/}
      {/*      max={255}*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <div className="text-black">*/}
      {/*    <p className="text-white">Start Y:</p>*/}
      {/*    <NumberInput*/}
      {/*      aria-label="Demo number input"*/}
      {/*      placeholder="Type a number…"*/}
      {/*      value={startY}*/}
      {/*      onChange={(event, val) => setStartY(val)}*/}
      {/*      min={0}*/}
      {/*      max={255}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="p-3" style={{ margin: "auto", width: "100%" }}>*/}
      {/*  <h1 className="text-xl font-bold"> Destination Coordinates </h1>*/}
      {/*  <div className="text-black">*/}
      {/*    <p className="text-white">End X:</p>*/}
      {/*    <NumberInput*/}
      {/*      aria-label="Demo number input"*/}
      {/*      placeholder="Type a number…"*/}
      {/*      value={endX}*/}
      {/*      onChange={(event, val) => setEndX(val)}*/}
      {/*      min={0}*/}
      {/*      max={255}*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <div className="text-black">*/}
      {/*    <p className="text-white">End Y:</p>*/}
      {/*    <NumberInput*/}
      {/*      aria-label="Demo number input"*/}
      {/*      placeholder="Type a number…"*/}
      {/*      value={endY}*/}
      {/*      onChange={(event, val) => setEndY(val)}*/}
      {/*      min={0}*/}
      {/*      max={255}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*  <div className="text-black p-3">*/}
      {/*    <h1 className="text-xl text-white font-bold"> Threshold </h1>*/}
      {/*    <p className="text-gray-500">*/}
      {/*      Default is 10, set to lower value if roads aren't fully detected (or*/}
      {/*      vice versa)*/}
      {/*    </p>*/}
      {/*    <NumberInput*/}
      {/*      aria-label="Demo number input"*/}
      {/*      placeholder="Type a number…"*/}
      {/*      value={threshold}*/}
      {/*      onChange={(event, val) => setThreshold(val)}*/}
      {/*      min={0}*/}
      {/*      max={255}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div style={{ margin: "auto", width: "100%" }}>*/}
      {/*  <p style={{ textAlign: "center" }}>Preview:</p>*/}
      {/*  {preview && (*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        margin: "auto",*/}
      {/*        // display: "inline-block",*/}
      {/*        width: 256,*/}
      {/*        height: 256,*/}
      {/*        position: "relative",*/}
      {/*        // zIndex: 1,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <div*/}
      {/*        style={{*/}
      {/*          width: 10,*/}
      {/*          height: 10,*/}
      {/*          backgroundColor: "#27FF00",*/}
      {/*          position: "absolute",*/}
      {/*          bottom: startY,*/}
      {/*          left: startX,*/}
      {/*        }}*/}
      {/*      />*/}
      {/*      <div*/}
      {/*        style={{*/}
      {/*          width: 10,*/}
      {/*          height: 10,*/}
      {/*          backgroundColor: "red",*/}
      {/*          position: "absolute",*/}
      {/*          bottom: endY,*/}
      {/*          left: endX,*/}
      {/*        }}*/}
      {/*      />*/}
      {/*      <img*/}
      {/*        src={preview}*/}
      {/*        style={{*/}
      {/*          margin: "auto",*/}
      {/*          display: "block",*/}
      {/*          width: 256,*/}
      {/*          height: 256,*/}
      {/*          // position: "absolute",*/}
      {/*          // zIndex: 2,*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</div>*/}

      {/*<div className="flex justify-center">*/}
      {/*  <ButtonGroup className="m-1.5">*/}
      {/*    <Button onClick={sendFile}>Submit</Button>*/}
      {/*    <Button variant="contained" color="error" onClick={clearData}>*/}
      {/*      Clear*/}
      {/*    </Button>*/}
      {/*  </ButtonGroup>*/}
      {/*</div>*/}

      {/*<div style={{ margin: "auto", width: "100%" }}>*/}
      {/*  <p style={{ textAlign: "center" }}>Result:</p>*/}
      {/*  {result && (*/}
      {/*    <img*/}
      {/*      src={result}*/}
      {/*      style={{*/}
      {/*        margin: "auto",*/}
      {/*        display: "block",*/}
      {/*        width: 256,*/}
      {/*        height: 256,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
};
