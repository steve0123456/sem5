import React, { useState, useEffect } from 'react';
import { teams } from '../appwrite/Appwrite';

const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');
    const [response, setResponse] = useState(null);
    const [teamList, setTeamList] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const result = await teams.create(teamName, teamName,['dev','member']);
            setResponse(result);
            console.log('Team Created: ', result);
            fetchTeams(); // Refresh the list after creating a team
        } catch (error) {
            console.error('Error creating team:', error);
            setError('Error creating team. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchTeams = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await teams.list();
            setTeamList(result.teams);
        } catch (error) {
            console.error('Error fetching teams:', error);
            setError('Error fetching teams. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleJoinTeam = async (teamId) => {
        if (!userEmail || !userEmail.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const result = await teams.createMembership(
                teamId, // Use the correct teamId // Assign the 'member' role
                userEmail, // User's email
                ['member'],
                null, // Optional userId
                null, // Optional phone
                null, // Optional URL
                null // Optional name
            );
            console.log('Join request sent:', result);
            alert(`A verification email has been sent to ${userEmail}. Please check your email to confirm.`);
        } catch (error) {
            console.error('Error joining team:', error);
            setError('Error joining team. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <div>
            <form onSubmit={handleCreateTeam}>
                <input
                    type="text"
                    placeholder="Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />
                <button type="submit" disabled={loading}>Create Team</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {response && (
                <div>
                    <h2>Team Created</h2>
                    <p>Team ID: {response.$id}</p>
                    <p>Team Name: {response.name}</p>
                </div>
            )}

            <div>
                <h2>All Teams</h2>
                <ul>
                    {teamList.length > 0 ? (
                        teamList.map((team) => (
                            <li key={team.$id}>
                                <strong>ID:</strong> {team.$id}, <strong>Name:</strong> {team.name}
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />
                                <button onClick={() => handleJoinTeam(team.$id)} disabled={loading}>Join</button>
                            </li>
                        ))
                    ) : (
                        <li>No teams available</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CreateTeam;
