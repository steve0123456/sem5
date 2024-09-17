// src/Chatbot.js
import React, { useState } from 'react';
import {databases} from '../appwrite/Appwrite';




const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);

    const handleSend = async () => {
        // Save the message to the database
        try {
            await databases.createDocument(
                '66e82b58001adb25d56b', // Replace with your database ID
                '66e82b6200049ed8dd89', // Replace with your collection ID
                'unique()', // Document ID
                { message }
            );

            // Fetch responses (assuming you have a logic for response retrieval)
            // Here you can also include your chatbot logic to get a response
            const response = await databases.listDocuments(
                '66e82b58001adb25d56b', // Replace with your database ID
                '66e82b6200049ed8dd89' // Replace with your collection ID
            );
            setResponses(response.documents);
        } catch (error) {
            console.error('Failed to send message', error);
        }
        setMessage('');
    };

    return (
        <div>
            <div>
                {responses.map((res, index) => (
                    <div key={index}>{res.message}</div>
                ))}
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chatbot;
