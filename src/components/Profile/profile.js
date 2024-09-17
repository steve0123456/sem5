import React from "react";

function Profile(){
    
    
    
    
    
    return (
        <div>
            <h2>Profile</h2>
            <p>Your profile information goes here.</p>
            <div id="profileid">
                <label for="username">Name</label>
                <input type="text" id="username" name="username" />
                <label for="designation">Designation</label>
                    <select id="designation" name="designation">
                        <option value="frontend">frontend</option>
                        <option value="backend">backend</option>
                        <option value="Devops">Devops</option>
                    </select>

            </div>
        </div>
    );
}

export default Profile;