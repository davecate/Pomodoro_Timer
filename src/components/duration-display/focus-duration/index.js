import React from "react";
import { minutesToDuration } from "../../../utils/duration";

const FocusDuration = ( { session, focusDuration, setFocusDuration } ) => {

    // Convert duration in minutes to a mm:ss display format: called to display current settings alongside adjustment buttons
    const focusMinutes = minutesToDuration(focusDuration)

    // Changing focus duration: called whenever Focus Duration "+" or "-" is clicked, respectively
    const increaseFocusDuration = () => {
        switch(focusDuration) {
        case 60: return
        default: setFocusDuration(focusDuration + 5)
        }
    }
    const decreaseFocusDuration = () => {
        switch(focusDuration) {
        case 5: return
        default: setFocusDuration(focusDuration - 5)
        }
    }

    // Display focus duration setting & controls
    return (
        <div className="col">
            {/* Focus Duration: displays current setting */}
                <div className="input-group input-group-lg mb-2">
                        <span className="input-group-text" data-testid="duration-focus">
                            Focus Duration: {focusMinutes}
                        </span>
                        <div className="input-group-append">
                            {/* Decrease focus duration */}
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-testid="decrease-focus"
                                    onClick={decreaseFocusDuration}
                                    disabled={session}
                                >
                                    <span className="oi oi-minus" />
                                </button>
                                {/* Increase focus duration */}
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-testid="increase-focus"
                                    onClick={increaseFocusDuration}
                                    disabled={session}
                                >
                                    <span className="oi oi-plus" />
                                </button>
                        </div>
                </div>
        </div>
    )

}

export default FocusDuration