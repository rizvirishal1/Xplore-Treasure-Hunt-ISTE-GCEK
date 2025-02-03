//imports…
import api from '../../api';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useState } from 'react';
//styles
import './Home.scss';


function Home() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();


    const onInputChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const response = await api.post("/login", formData);
        if (response?.data?.message !== "Login successful") {
            const errorMessage = response?.data?.message || "Something went wrong!";
            toast.error(errorMessage);
        }
        else {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("partcipantMongoId", response.data.participantMongoId);
            navigate("/rules");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="home" >
            <h1>Treasure Hunt</h1>
            <ToastContainer />
            <div className="home-form">
                <p>
                    Join the 'Chase the Cluzz: Uncover the Hidden Treasure',
                    <br />hosted by ISTE GCEK SC, as part of the Xplore'24 Pre-event!

                    <br />🗓️ Date: February 4th, 2025
                    <br />⏰ Time: 8 PM
                    <br />💸 Registration Fee: ₹30
                    <br />💰 Prize Pool: ₹0.5K
                    <br />
                    <br /><a href='https://bit.ly/ChasetheCluzz'>Registration Link</a>
                    <br />
                    <br />For Queries:
                    <br />Vijay: 9188423757
                    <br />Adish:9778125838
                </p>
                <form onSubmit={onFormSubmit}>
                    <TextField
                        margin="dense"
                        label="Name"
                        variant="outlined"
                        name="name"
                        required
                        onChange={onInputChange}
                        fullWidth
                        color='secondary'
                        className='text-field'
                    />
                    <TextField
                        margin="dense"
                        label="Registered Email ID"
                        variant="outlined"
                        name="email"
                        required
                        onChange={onInputChange}
                        fullWidth
                        type='email'
                        color='secondary'
                        className='text-field'
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