import React, { useState, useEffect } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import { Link } from "react-router-dom";

const FileList = () => {
  const [files, setFiles] = useState([]);

  const handleDelete = async (code) => {
    try {
      const remove = await axios.delete(`http://localhost:5000/files/${code}`, {
        responseType: "blob",
      });
      fetch();
    } catch (error) {
      alert("some error occured");
      console.log(err);
    }
  };

  const handleDownload = (code) => {
    axios
      .get(`http://localhost:5000/files/${code}`)
      .then((res) => {
        fileDownload(res.data, "download.jpg");
      })
      .catch((err) => {
        alert("some error occured");
        console.log(err);
      });
  };

  const fetch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/files/get");
      setFiles(res.data.files);
    } catch (err) {
      alert("inavalid request");
      console.log(err);
    }
  };
  useEffect(() => {
    fetch();
  }, [files]);
  return (
    <div>
      <h2>File list</h2>
      {files.map((ele) => {
        return (
          <div key={ele._id}>
            <h6>{ele.fileName}</h6>
            <button onClick={() => handleDelete(ele.code)}>delete</button>
            <button onClick={() => handleDownload(ele.code)}>download</button>
          </div>
        );
      })}
      <div>
        <Link to={"/upload"}>go to file upload</Link>
      </div>
    </div>
  );
};

export default FileList;
