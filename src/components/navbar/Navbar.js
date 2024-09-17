import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeComponent from '../home/Home';
import TeamFile from '../files/files';
import SignUpPage from '../login/signup';
import Login from '../login/Login';
import About from '../About/about';
import SignOutPage from '../login/Signout';
import CreateTeam from '../TeamsFile/TeamsApp';
import Profile from '../Profile/profile';
import Imgup from '../image/Img';
import Chatbot from '../message/messaging';

function Navbar() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Main</Link></li>  
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/files">Files</Link></li>
                        <li>
                        <Link to="/create-team">Teams</Link>
                        </li>
                        <li>
                        <Link to="/create-team/upload">Upload</Link>
                        </li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/message">Chatbot</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/message' element={<Chatbot />} />
                    <Route path='/create-team/upload' element={<Imgup/>} />
                    <Route path='/profile' element={<Profile/>} />
                    <Route path='/create-team' element={<CreateTeam />} />
                    <Route path='/signout' element={<SignOutPage/>} />
                    <Route path="/" element={<About/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/home" element={<HomeComponent />} />
                    <Route path="/files" element={<TeamFile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Navbar;
