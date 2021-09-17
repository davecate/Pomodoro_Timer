import React from "react";
import Countdown from "./session-countdown";
import ProgressBar from "./session-progress-bar";
import SessionTitle from "./session-title";

const SessionDisplay = ( { session, focusDuration, breakDuration } ) => {
    
    // NOTE FOR THINKFUL GRADERS/STUDENTS: Thinkful provides starter code 
    // using session?.timeRemaining, but requires code to pass in Qualified,
    // which doesn't support using the new syntax inside of JSX.

    // Get remaining time from session object, using old syntax 
    // Called to calculate elapsed time in seconds
    const remainingTime = session ? session.timeRemaining : null

    // Combine focus and break durations into a single variable, 
    // returning the appropriate value based on the session label
    const sessionMinutes = () => {
        switch (session?.label) {
        case "Focusing": {return focusDuration}
        case "On Break": {return breakDuration}
        default: {return focusDuration}
        }
    }

    // Displays all session components (session title, countdown, progress bar), 
    // or hides them if no active session
    switch (!session) {
        case true: return null
        case false: return (
            <div>
                <div className="row mb-2">
                    <div className="col">
                        {/* Display session title and countdown */}
                        <SessionTitle 
                            session={session} 
                            sessionMinutes={sessionMinutes} 
                        />
                        <Countdown 
                            remainingTime={remainingTime} 
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col">
                        {/* Display progress bar */}
                        <ProgressBar 
                            sessionMinutes={sessionMinutes} 
                            remainingTime={remainingTime} 
                        />
                    </div>
                </div>
        </div>
        )
        default: return null
    }

}

export default SessionDisplay
