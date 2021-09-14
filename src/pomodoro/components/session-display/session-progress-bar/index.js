import React from "react";

// Pure function: Convert a given value into a percentage of a given total
const percentageTracker = (totalValue, currentValue) => (currentValue/totalValue)*100

// Pure function: Convert minutes to seconds
const minutesToSeconds = (value) => value*60

const ProgressBar = ( { sessionMinutes, remainingTime } ) => {

    // Convert sessionMinutes to seconds,
    // called to calculate elapsed time in seconds
    const totalTime = minutesToSeconds(sessionMinutes())

    // Get elapsed time,
    // called to calculate elapsed time as a percentage of total session length
    const elapsedTime = totalTime - remainingTime

    // Get elapsed time in percentage form,
    // called to set the width of the progress bar
    const progress = percentageTracker(totalTime, elapsedTime)

    // Displays progress bar 
    return (
        <div className="progress" style={{ height: "20px" }}>
            <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progress}
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}

export default ProgressBar
