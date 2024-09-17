import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/Appwrite";

function SignUpPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the Appwrite signup function
            const response = await account.create("unique()", email, password);
            setSuccess("Signup successful!");
            setError("");
            console.log("Signup successful:", response);

            // Redirect to login page
            navigate("/login");

        } catch (error) {
            setError("Signup failed: " + error.message);
            setSuccess("");
            console.error("Signup failed:", error);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <br />
                <label>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <br />
                <button type="submit">Signup</button>
            </form>
            <div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <p onClick={handleLogin} style={{ color: "blue", cursor: "pointer" }}>
                    Already have an account? Login
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;
