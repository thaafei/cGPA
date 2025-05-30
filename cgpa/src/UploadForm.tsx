import React, { useState } from "react";
import axios from 'axios'


export default function UploadForm(newEntry){
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
            axios.post(url, formData, config).then((response) => {
                console.log(response.data);
            });
        }
    };

    function update_entries(entries){
        for (let entry in entries){
            newEntry(entry.course, entry.grade)
        }
        console.log("complete")
    }

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
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button 
          onClick={handleUpload}
          className="submit"
        >Upload a file</button>
      )}
    </>
  )
}