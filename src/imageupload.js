import { useState, useEffect } from "react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from "@mui/material/Card";
import Fab from "@mui/material/Fab";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CollectionsIcon from "@mui/icons-material/Collections";
import Menu from './Menu';
import './output.css';

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

  const sendFile = async () => {
    console.log(startX + startY + endX + endY);
    if (image) {
      // console.log(startX)
      // console.log(startY)
      let formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("startX", startX || 0);
      formData.append("startY", startY || 0);
      formData.append("endX", endX || 0);
      formData.append("endY", endY || 0);
      formData.append("threshold", threshold);
      let res = await axios({
        method: "post",
        url: "http://127.0.0.1:5000/predict",
        data: formData,
        responseType: "blob",
      });

      var url = URL.createObjectURL(res.data);
      setResult(url);

      setIsloading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
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
    <div className="min-h-screen text-white self-center content-center items-center p-5 bg-maroonbg">
          <div className="self-center" {...getRootProps({ className: "dropzone" })} />
          <input
              type="text"
              placeholder="Enter Location Title"
              className="px-4 py-2 mt-3 border rounded focus:outline-none focus:border-black-500 text-black w-1/2"
              //value={locationTitle}
              //onChange={(e) => setLocationTitle(e.target.value)}
          />

          <div className="m-10">
          {image ? (
              <div className="m-10 mt-1" style={{ margin: "auto", width: "100%" }}>
                  {preview && (
                      <div
                          style={{
                              margin: "auto",
                              width: 256,
                              height: 256,
                              position: "relative",
                              backgroundColor: "white",
                          }}
                      >
                          <div
                              style={{
                                  width: 10,
                                  height: 10,
                                  backgroundColor: "#27FF00",
                                  position: "absolute",
                                  bottom: startY,
                                  left: startX,
                              }}
                          />
                          <div
                              style={{
                                  width: 10,
                                  height: 10,
                                  backgroundColor: "red",
                                  position: "absolute",
                                  bottom: endY,
                                  left: endX,
                              }}
                          />
                          <img
                              src={preview}
                              style={{
                                  margin: "auto",
                                  display: "block",
                                  width: 256,
                                  height: 256,
                              }}
                          />
                      </div>
                  )}
              </div>
          ) : (
                  <div className="p-5 m-10 mt-1 items-center flex justify-center">
                      <Card style={{ height: '25vh' }} className="px-10 py-5 mt-5 w-1/2 flex justify-center">
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
    <div className="flex mb-10 justify-center">
      <div className="p-3" style={{ margin: "auto", width: "100%" }}>
		<h1 className="text-xl font-bold"> Starting Coordinates </h1>
         <div className="text-black">
          <p className="text-white">Start X:</p>
          <NumberInput
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={startX}
            onChange={(event, val) => setStartX(val)}
            min={0}
            max={255}
          />
        </div>

      <div className="text-black">
        <p className="text-white">Start Y:</p>
          <NumberInput
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={startY}
            onChange={(event, val) => setStartY(val)}
            min={0}
            max={255}
          />
        </div>
	</div>
	<div className="p-3" style={{ margin: "auto", width: "100%" }}>
	<h1 className="text-xl font-bold"> Destination Coordinates </h1>
        <div className="text-black">
         <p className="text-white">End X:</p>
          <NumberInput
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={endX}
            onChange={(event, val) => setEndX(val)}
            min={0}
            max={255}
          />
        </div>

    <div className="text-black">
     <p className="text-white">End Y:</p>
          <NumberInput
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={endY}
            onChange={(event, val) => setEndY(val)}
            min={0}
            max={255}
          />
        </div>
	</div>
    <div className="text-black p-3">
        <h1 className="text-xl text-white font-bold"> Threshold </h1>
          <p className="text-gray-500">
            Default is 10, set to lower value if roads aren't fully
            detected (or vice versa)
          </p>
          <NumberInput
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={threshold}
            onChange={(event, val) => setThreshold(val)}
            min={0}
            max={255}
          />
          </div>
        </div>

        <div style={{ margin: "auto", width: "100%" }}>
          <p style={{ textAlign: "center" }}>Preview:</p>
          {preview && (
            <div
              style={{
                margin: "auto",
                // display: "inline-block",
                width: 256,
                height: 256,
                position: "relative",
                // zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#27FF00",
                  position: "absolute",
                  bottom: startY,
                  left: startX,
                }}
              />
              <div
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "red",
                  position: "absolute",
                  bottom: endY,
                  left: endX,
                }}
              />
              <img
                src={preview}
                style={{
                  margin: "auto",
                  display: "block",
                  width: 256,
                  height: 256,
                  // position: "absolute",
                  // zIndex: 2,
                }}
              />
            </div>
          )}
        </div>


      <div className="flex justify-center">
		<ButtonGroup className="m-1.5">
			<Button onClick={sendFile}>Submit</Button>
			<Button variant="contained" color="error" onClick={clearData}>Clear</Button>
		</ButtonGroup>
      </div>

      <div style={{ margin: "auto", width: "100%" }}>
        <p style={{ textAlign: "center" }}>Result:</p>
        {result && (
          // <div style={{ margin: "auto",  }}>
          <img
            src={result}
            style={{
              margin: "auto",
              display: "block",
              width: 256,
              height: 256,
            }}
          />
          /* </div> */
        )}
      </div>
    </div>
  );
};
