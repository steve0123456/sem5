import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/Appwrite";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the Appwrite login function with email and password
            const response = await account.createEmailPasswordSession(email, password);
            setError("");
            console.log("Login successful:", response);

            // Redirect to the home page or dashboard
            navigate("/home");

        } catch (error) {
            setError("Login failed: " + error.message);
            console.error("Login failed:", error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            <div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <p>Don't have an account?</p>
                <p onClick={handleSignup} style={{ color: "blue", cursor: "pointer" }}>Register</p>
            </div>
        </div>
    );
}

export default Login;
