import React from "react";
import classNames from "../../utils/class-names";

const TransportPlayPause = ( { setSession, isTimerRunning, setIsTimerRunning, focusDuration } ) => {

    // Checks for active session. If no, starts new session. If yes, pauses current session.
    const playPause = () => {
        setIsTimerRunning((prevState) => {
            const nextState = !prevState
            if (nextState) {
                setSession((prevStateSession) => {
                    switch (prevStateSession) {
                        case null: return {
                        label: "Focusing",
                        timeRemaining: focusDuration * 60,
                        }
                        default: return prevStateSession
                    }
                })
            }
            return nextState;
        })
    }

    return (
        <button
        type="button"
        className="btn btn-primary"
        data-testid="play-pause"
        title="Start or pause timer"
        onClick={playPause}
    >
        <span
        className={classNames({
            oi: true,
            "oi-media-play": !isTimerRunning,
            "oi-media-pause": isTimerRunning,
        })}
        />
    </button>
    )

}

export default TransportPlayPause