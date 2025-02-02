//imports…
import api from '../../api';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { useState } from 'react';
//styles
import './Home.scss';


function Home() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();


    const onInputChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await api.post("login", formData);
            if (response?.status !== 200) {
                const errorMessage = response?.data?.message || "Something went wrong!";
                setErrorMessage(errorMessage);
            }
            else {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("partcipantMongoId", response.data.participantMongoId);
                navigate("/rules");
            }
        } catch (e) {
            alert("Invalid Credentials!");
        }
    };

    return (
        <div className="home" >
            <h1>Treasure Hunt</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="home-form">
                <form onSubmit={onFormSubmit}>
                    <TextField
                        margin="dense"
                        label="Name"
                        variant="outlined"
                        name="name"
                        required
                        onChange={onInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Registered Email ID"
                        variant="outlined"
                        name="email"
                        required
                        onChange={onInputChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        Start
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Home;