//imports…
import api from '../../api';
import { Button } from '@mui/material';
import { END_TIME } from '../../constants';
import { START_TIME } from '../../constants';
import { TextField } from '@mui/material';
import { useNavigate } from "react-router";
import { useState } from 'react';
import { useEffect } from 'react';
//styles
import "./Question.scss"
import dateString2humanReadable from '../../services/dateString2humanReadable';

function Question() {
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({});
    const [isEventOngoing, setIsEventOngoing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [level, setLevel] = useState(1);
    const navigate = useNavigate();
    const [question, setQuestion] = useState("");

    useEffect(() => {

        const startTime = new Date(START_TIME);
        const endTime = new Date(END_TIME);

        const checkEventStatus = () => {
            const currentTime = new Date();
            if (currentTime < startTime) {
                setIsEventOngoing(false);
            } else if (currentTime <= endTime) {
                setIsEventOngoing(true);
            } else {
                setIsEventOngoing(false);
            }
        };

        // Check immediately on mount
        checkEventStatus();

        // Then set up interval
        const timer = setInterval(checkEventStatus, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (localStorage.getItem("partcipantMongoId") != null) {
                const participantData = await api.get(`participant/${localStorage.getItem("partcipantMongoId")}`);
                setLevel(participantData?.data?.level);
                const question = await api.get(`question/${localStorage.getItem("partcipantMongoId")}`)
                setQuestion(question);
            }
        }
        fetchData()
    }, [])

    const onInputChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await api.post("answer", formData);
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
            console.log(e);
        }
    }

    return (
        <div className="question">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {!isEventOngoing && (
                <div className='question-page-event-not-ongoing'>
                    <p>Event starts on {dateString2humanReadable(START_TIME)}</p>
                    <p>Event ends on {dateString2humanReadable(END_TIME)}</p>
                    <p>Refresh the page if the Question is not loaded automatically</p>
                </div>
            )}
            {isEventOngoing && (
                <div className='question-page-event-ongoing'>
                    <h1>LEVEL {level}</h1>
                    <p>{question?.question}</p>
                    <h1>HINTS</h1>
                    <p>{question?.hint}</p>
                    <form onSubmit={onFormSubmit}>
                        <TextField
                            margin="dense"
                            label="answer"
                            variant="outlined"
                            name="answer"
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
                            Submit
                        </Button>
                    </form>

                </div>
            )}

        </div>
    )
}

export default Question;