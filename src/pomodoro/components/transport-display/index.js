import React from "react";
import TransportPlayPause from "./transport-play-pause";
import TransportStop from "./transport-stop";

const TransportDisplay = ( { session, setSession, isTimerRunning, setIsTimerRunning, focusDuration } ) => {

    // Display transport controls
    return (
        <div className="row">
            <div className="col">
                <div
                    className="btn-group btn-group-lg mb-2"
                    role="group"
                    aria-label="Timer controls"
                >
                {/* Play/Pause button */}
                <TransportPlayPause 
                    session={session}
                    setSession={setSession} 
                    isTimerRunning={isTimerRunning} 
                    setIsTimerRunning={setIsTimerRunning}
                    focusDuration={focusDuration}
                />
                {/* Stop button */}
                <TransportStop
                    session={session}
                    setSession={setSession}
                    setIsTimerRunning={setIsTimerRunning}
                />
                </div>
            </div>
        </div>
    )

}

export default TransportDisplay