//imports…
import api from '../../api';
import { Button } from '@mui/material';
import { END_TIME } from '../../constants';
import { START_TIME } from '../../constants';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
//styles
import "./Question.scss"
import dateString2humanReadable from '../../services/dateString2humanReadable';

function Question() {
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({});
    const [hintTag, setHintTag] = useState(<p></p>)
    const [isAnswerChanged, setIsAnswerChanged] = useState(false);
    const [isEventOngoing, setIsEventOngoing] = useState(false);
    const [isHintPresent, setIsHintPresent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [level, setLevel] = useState(1);
    const navigate = useNavigate();
    const [questionTag, setQuestionTag] = useState(<p></p>);

    const settingQuestionTag = (level, question) => {
        switch (level) {
            case 2:
            case 4: setQuestionTag(<pre
                style={
                    {
                        textWrap: "nowrap",


                    }
                }>{question}</pre>);
                break;
            case 1:
            case 3:
            case 5: setQuestionTag(<pre>{question}</pre>);
                break;
            default: setQuestionTag(<pre></pre>);


        }
    }

    const settingHintTag = (level, hint) => {
        if (hint) {
            setIsHintPresent(true)
        }
        else
            setIsHintPresent(false)
        switch (level) {
            case 3: setHintTag(<pre
                style={
                    {
                        textWrap: "nowrap",


                    }
                }>{hint}</pre>);
                break;
            case 1:
            case 2:
            case 4:
            case 5: setHintTag(<pre>{hint}</pre>);
                break;
            default: setHintTag(<pre></pre>);


        }
    }

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
            console.log("\n\n")
            console.log("fetchData function is running...")
            if (localStorage.getItem("partcipantMongoId") == null) {
                navigate("/");
                console.log('function returned and navigated to home page because of unauthorized entry');
                console.log('\n\n')
                return;
            }

            const participantData = await api.get(`participant/${localStorage.getItem("partcipantMongoId")}`);
            if (participantData?.data?.status === "success") {
                setLevel(participantData?.data?.participant?.level);
            }
            else
                toast.error(participantData?.data?.message)

            const response = await api.post(`question/${localStorage.getItem("partcipantMongoId")}`)
            if (response?.data?.status === "success") {
                settingQuestionTag(participantData?.data?.participant?.level, response?.data?.question);
                settingHintTag(participantData?.data?.participant?.level, response?.data?.hint)


            }
            else if (response?.data?.message === "You have answered all the questions") {
                setLevel(6);
            }
            else {
                toast.error(response?.data?.message || "Something went wrong!");
            }
            console.log("function end...");
            console.log('\n\n')

        }
        fetchData()
    }, [navigate])

    const onInputChange = async (e) => {
        setIsAnswerChanged(true);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFormSubmit = async (e) => {
        console.log("\n\n")
        console.log("onFormSubmit function is running...");

        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (!isAnswerChanged) {
                toast.error("incorrect Answer");
                return;
            }
            const partcipantMongoId = localStorage.getItem("partcipantMongoId");
            if (!partcipantMongoId) {
                setErrorMessage("Participant not found");
                console.log("function returned because of unauthorized entry");
                console.log('\n\n')
                navigate("/");
                return;
            }
            const response = await api.post(`/question/${partcipantMongoId}`, formData);
            console.log("question fetch response:");
            console.log(response);
            if (response?.data?.status === "success") {
                toast.success("Correct Answer");
                setLevel(response?.data?.level);
                settingQuestionTag(response?.data?.level, response?.data?.question)
                settingHintTag(response?.data?.level, response?.data?.hint)
            }
            else if (response?.data?.message === "Incorrect answer") {
                toast.error("Incorrect Answer");
                setIsAnswerChanged(false);
            }
            else if (response?.data?.message === "You have answered all the questions") {
                setLevel(6);
            }
            else {
                toast.error(response?.data?.message || "Something went wrong!");
            }
            console.log("function end...");
            console.log('\n\n')

        } catch (e) {
            console.log(e);
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <div className="question">
            {console.log("error message:")}
            {console.log(errorMessage)}
            <ToastContainer />
            {console.log("isEventOngoing:")}
            {console.log(isEventOngoing)}
            {!isEventOngoing && (
                <div className='question-page-event-not-ongoing'>
                    <p>Event starts on {dateString2humanReadable(START_TIME)}</p>
                    <p>Event ends on February 5, 2025 at 12:00 AM</p>
                    <p>Refresh the page if the Question is not loaded automatically</p>
                </div>
            )}
            {console.log("level:")}
            {console.log(level)}
            {isEventOngoing && level < 6 && (
                <div className='question-page-event-ongoing'>
                    <h1>LEVEL {level}</h1>
                    <h2>QUESTION</h2>

                    <span>{questionTag}</span>
                    {
                        isHintPresent && (
                            <h2>HINT</h2>)}

                    <span>{hintTag}</span>


                    <form onSubmit={onFormSubmit}>
                        <TextField
                            margin="dense"
                            label="answer"
                            variant="outlined"
                            name="answer"
                            required
                            onChange={onInputChange}
                            className='text-field'
                            color='secondary'
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={isSubmitting}
                            type="submit"
                            onClick={onFormSubmit}
                        >
                            Submit
                        </Button>
                    </form>

                </div>
            )}
            {level > 5 && (
                <div className='question-page-completed'>
                    <h1>Event Completed</h1>
                    <p>You have answered all the questions</p>
                    <p>Thank you for participating</p>
                </div>
            )

            }

        </div>
    )
}

export default Question;