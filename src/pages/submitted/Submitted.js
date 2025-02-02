//imports…
import { useState } from 'react';
import { useEffect } from 'react';
//styles
import "./Submitted.scss"

function Submitted() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isEventStarted, setIsEventStarted] = useState(false);

    useEffect(() => {
        const startTime = new Date("2025-02-03T11:30:00.000Z");

        if (currentTime < startTime) {
            const timer = setInterval(() => {
                const now = new Date();
                setCurrentTime(now);
            }, 1000);

            return () => clearInterval(timer);
        }
        else if (currentTime >= startTime) {
            setIsEventStarted(true);
        }
    }, [currentTime]);

    return (
        <div className="question">
            {!isEventStarted && (
                <div className='submitted-page-event-not-started'>
                    404
                </div>
            )}

        </div>
    )
}

export default Submitted;