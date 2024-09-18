// src/Chatbot.js
import React, { useState, useEffect } from 'react';
import { databases } from '../appwrite/Appwrite'; // Ensure this path is correct

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);

    // Fetch existing messages when the component mounts
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await databases.listDocuments(
                    '66e82b58001adb25d56b', // Your database ID
                    '66e82b6200049ed8dd89'  // Your collection ID
                );
                setResponses(response.documents);
            } catch (error) {
                console.error('Failed to fetch messages', error);
            }
        };

        fetchMessages();
    }, []);

    const handleSend = async () => {
        // Save the new message to the database
        try {
            const newMessage = await databases.createDocument(
                '66e82b58001adb25d56b', // Your database ID
                '66e82b6200049ed8dd89', // Your collection ID
                'unique()',             // Auto-generate a unique document ID
                { body: message }       // Store the message in the "body" attribute
            );

            // Update the responses state with the new message
            setResponses([...responses, newMessage]);
        } catch (error) {
            console.error('Failed to send message', error);
        }
        setMessage(''); // Clear the input field after sending the message
    };

    return (
        <div>
            <div>
                {/* Loop through responses and display the body of each message */}
                {responses.map((res) => (
                    <div key={res.$id}>
                        <strong>Message:</strong> {res.body ? res.body : 'No message content'} {/* Display message body */}<br></br>
                        <strong></strong>{res.username ? res.username :'no username'}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chatbot;
