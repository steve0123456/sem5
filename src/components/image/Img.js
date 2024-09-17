import React, { useState } from "react";
import { storage } from '../appwrite/Appwrite';

function Imgup() {
    const [file, setFile] = useState(null);  // For storing the selected file
    const [name, setName] = useState('');    // For storing the user-entered file name
   
    // Handle text input change (file name)
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    // Handle file input change (file selection)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Store selected file
    };

    // Handle file upload
    const handleUpload = async () => {
        if (file) {
            try {
                // Using the name provided by the user as the file ID
                const response = await storage.createFile('66c1d638001493c0aefd', name, file);
                console.log('File uploaded:', response);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.log('No file selected');
        }
    };
    

    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter file name" 
                value={name} 
                onChange={handleNameChange} 
            />
            <input 
                type="file" 
                onChange={handleFileChange} 
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default Imgup;
