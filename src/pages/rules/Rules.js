//imports...
import { useEffect } from 'react';
import { START_TIME } from '../../constants';
import { END_TIME } from '../../constants';
//styles
import './Rules.scss';
import dateString2humanReadable from '../../services/dateString2humanReadable';

function Rules() {
    const startTime = dateString2humanReadable(START_TIME);
    const endTime = dateString2humanReadable(END_TIME);
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
                <li>Event ends on {endTime}</li>
                <li>Refresh the page if the question is not loaded automatically</li>
                <li>Rule 1</li>
                <li>Rule 2</li>
                <li>Rule 3</li>
                <li>Rule 4</li>
                <li>Rule 5</li>
            </ul>
            <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting || !isEventOngoing}
                onclick={onStartClick}
            >
                Start
            </Button>
        </div>
    )
}

export default Rules;