import React from "react";
import Countdown from "../countdown";
import ProgressBar from "../progress-bar";
import SessionTitle from "../session-title";

const Session = ( { session, sessionMinutes } ) => {

    // Get remaining time from session object, using old syntax to satisfy outdated bootcamp tests
    // Called to calculate elapsed time in seconds
    const remainingTime = session ? session.timeRemaining : null

    // Displays all session components (session title, countdown, progress bar), or hides them if no active session
    switch (!session) {
        case true: return null
        case false: return (
            <div>
                <div className="row mb-2">
                    <div className="col">
                        {/* Display session title and countdown */}
                        <SessionTitle session={session} sessionMinutes={sessionMinutes} />
                        <Countdown remainingTime={remainingTime} />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col">
                        {/* Display progress bar */}
                        <ProgressBar sessionMinutes={sessionMinutes} remainingTime={remainingTime} />
                    </div>
                </div>
        </div>
        )
        default: return null
    }

}

export default Session
