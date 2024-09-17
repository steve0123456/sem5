import React from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/Appwrite";

function SignOutPage() {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            // Call the Appwrite logout function
            await account.deleteSession("current");
            console.log("Sign out successful");

            // Redirect to the login page after sign-out
            navigate("/login");
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };

    return (
        <div>
            <h2>Welcome to Your Dashboard</h2>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default SignOutPage;
