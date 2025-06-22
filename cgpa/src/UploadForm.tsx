import React, { useState } from "react";
import axios from 'axios'


export default function UploadForm({newEntries}){
    const [file, setFile] = useState<File | null>(null)

    async function handleUpload(){
        if (file) {
            console.log('Uploading file...');
            const url = "http://localhost:8081/parse-transcript"
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', file.name);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            try{
                axios.post(url, formData, config).then((response) => {
                    let entries = response.data.message
                    newEntries(entries)
                })
            }catch{
                console.log("error")
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (<button 
          onClick={handleUpload}
          className="submit"
        >Upload a file</button>
      )}
    </>
  )
}