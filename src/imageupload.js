import { useState, useEffect } from "react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";

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
    <div style={{ margin: "auto", width: "50%", justifyItems: "center" }}>
      <div
        style={{
          margin: "auto",
          width: "100%",
          color: "red",
        }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <p style={{ textAlign: "center" }}>
          Drop satellite image here, or click to select file
        </p>
        <p style={{ textAlign: "center" }}>
          (Only *.jpeg images will be accepted)
        </p>
      </div>

      <div style={{ margin: "auto", width: "100%" }}>
        <div>
          <p>Start X:</p>
          <NumberInput
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={startX}
            onChange={(event, val) => setStartX(val)}
            min={0}
            max={255}
          />
        </div>

        <div>
          <p>Start Y:</p>
          <NumberInput
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={startY}
            onChange={(event, val) => setStartY(val)}
            min={0}
            max={255}
          />
        </div>

        <div>
          <p>End X:</p>
          <NumberInput
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={endX}
            onChange={(event, val) => setEndX(val)}
            min={0}
            max={255}
          />
        </div>

        <div>
          <p>End Y:</p>
          <NumberInput
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={endY}
            onChange={(event, val) => setEndY(val)}
            min={0}
            max={255}
          />
        </div>

        <div>
          <p>
            Threshold: Default is 10, set to lower value if roads aren't fully
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
      </div>

      <div style={{ margin: "auto", width: "50%", justifyItems: "center" }}>
        <button onClick={sendFile}>Submit</button>
        <button onClick={clearData}>Clear</button>
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
