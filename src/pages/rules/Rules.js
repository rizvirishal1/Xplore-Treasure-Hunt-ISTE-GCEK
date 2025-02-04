//imports...
import { Button } from '@mui/material';
import { Checkbox } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { START_TIME } from '../../constants';
import { END_TIME } from '../../constants';
//styles
import './Rules.scss';
import dateString2humanReadable from '../../services/dateString2humanReadable';

function Rules() {
    const navigate = useNavigate();
    const startTime = dateString2humanReadable(START_TIME);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEventOngoing, setIsEventOngoing] = useState(false);

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

    const onStartClick = () => {
        setIsSubmitting(true);
        if (isEventOngoing) {
            navigate("/question");
        }
        setIsSubmitting(false);
    }


    return (
        <div className="rules">
            <h1>Rules</h1>
            <ul>
                <li>Event starts on {startTime}</li>
                <li>Event ends on February 5, 2025 at 12:00 AM</li>
                <li>Refresh the page if the START button is not enabled automatically</li>
                <li>There will be 5 rounds.</li>
                <li>The one who completes all 5 rounds first will declared as the winner.</li>
                <li>You can only use CAPITAL LETTERS.</li>
                <li>If your answer has more than one word DON'T PUT SPACE between them.</li>
                <li>For example,If your answer is red cat,You should enter it as REDCAT.</li>
                <li>Additional hints will provide through whatsapp group based on general performance.</li>
            </ul>
            <form >

                <p>
                    <Checkbox
                        color="secondary"
                        required
                        className='checkbox'
                    >
                    </Checkbox>I have read and understood the rules
                </p>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onStartClick}
                    type='submit'
                    disabled={isSubmitting}
                >
                    Start
                </Button>

            </form>
        </div>
    )
}

export default Rules;