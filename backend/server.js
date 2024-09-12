const express = require('express');
const { Client, Teams } = require('appwrite');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('66bb5856001a4163db8e'); // Your Appwrite project ID




const teams = new Teams(client);

// Route to create a team
app.post('/create-team', async (req, res) => {
    try {
        const { teamName } = req.body;

        if (!teamName) {
            throw new Error('Team name is required');
        }

        const teamId = 'unique()'; // Generate a unique team ID

        const response = await teams.create(teamId, teamName, []);
        console.log('Team created successfully:', response);
        res.json({ team: response });
    } catch (error) {
        console.error('Detailed error:', error); // Log detailed error information
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
