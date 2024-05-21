import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import axios from "axios";
import config from "../../config";

function ChangePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const handleChangePassword = async () => {
        const accessToken = getCookie("accessToken");
        try {
            await axios.post(
                `${config.backApi}/users/change-password`,
                { password },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            alert("Password changed successfully");
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Failed to change password");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrorVisible(false);
            handleChangePassword();
        } else {
            setErrorVisible(true);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container animate__animated animate__zoomInUp">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label
                            htmlFor="error"
                            id="error"
                            style={{ color: "red" }}
                            hidden={!errorVisible}
                        >
                            Passwords do not match
                        </label>
                        <br />
                        <label htmlFor="password">New password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <label htmlFor="confirmPassword">Confirm the password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default ChangePassword;
