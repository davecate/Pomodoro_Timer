import React from "react";

const TransportStop = ( { session, setSession, setIsTimerRunning } ) => {

    // Set timer and session to default state,
    // called whenever the stop button is clicked
    const stopSession = () => {
        setIsTimerRunning(false) 
        setSession(null)
    }

    // Display stop button,
    // disabled if session is active
    return (
        <button
            type="button"
            className="btn btn-secondary"
            data-testid="stop"
            onClick={stopSession}
            disabled={!session}
            title="Stop the session"
            >
            <span className="oi oi-media-stop" />
        </button>
    )

}

export default TransportStop