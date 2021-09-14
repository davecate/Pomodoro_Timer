import React from "react";
import { minutesToDuration } from "../../../utils/duration";

const BreakDuration = ( { session, breakDuration, setBreakDuration } ) => {

    // Convert duration in minutes to a mm:ss display format: called to display current settings alongside adjustment buttons
    const breakMinutes = minutesToDuration(breakDuration)

    // Changing break duration: called whenever Break Duration "+" or "-" is clicked, respectively
    const increaseBreakDuration = () => {
        switch (breakDuration) {
        case 15: return
        default: setBreakDuration(breakDuration + 1)
        }
    }
    const decreaseBreakDuration = () => {
        switch (breakDuration) {
        case 1: return
        default: setBreakDuration(breakDuration - 1)
        }
    }

    // Display break duration setting & controls
    return (
        <div className="col">
                <div className="float-right">
                {/* Break Duration: displays current setting, with buttons to increase or decrease */}
                        <div className="input-group input-group-lg mb-2">
                                <span className="input-group-text" data-testid="duration-break">
                                    Break Duration: {breakMinutes}
                                </span>
                                <div className="input-group-append">
                                    {/* Decrease break duration */}
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-testid="decrease-break"
                                        onClick={decreaseBreakDuration}
                                        disabled={session}
                                    >
                                        <span className="oi oi-minus" />
                                    </button>
                                    {/* Increase break duration */}
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-testid="increase-break"
                                        onClick={increaseBreakDuration}
                                        disabled={session}
                                    >
                                        <span className="oi oi-plus" />
                                    </button>
                                </div>
                        </div>
                </div>
        </div>
    )

}

export default BreakDuration
