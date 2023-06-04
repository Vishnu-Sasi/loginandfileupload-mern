import React ,{useState}from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const FileUpload = () => {
    const [file, setFile] = useState([]);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);

      };
      const handleFileUpload = () => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
    
        formData.append("file", file);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
        axios
        .post("http://localhost:5000/files/upload", formData, config)
        .then((res) => {
          console.log(res.data);
          alert("file uploaded succesfully")
        })
        .catch((err) => {
          console.log(err);
        });
    };
  return (
    <div>
        <div>

      <h1> file uploader</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>upload file</button>
      </div>
   <Link to={"/list"}>open uploaded file list</Link>
    </div>
  )
}

export default FileUpload