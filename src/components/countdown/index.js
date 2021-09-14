import React from "react";
import { secondsToDuration } from "../../utils/duration";

const Countdown = ( { remainingTime } ) => {

    // Convert remaining time to mm:ss display: called to display a countdown timer
    const countdown = secondsToDuration(remainingTime)

    // Display countdown timer
    return (
        <p className="lead" data-testid="session-sub-title">
            {countdown} remaining
        </p>
    )
}

export default Countdown