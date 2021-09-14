import React from "react";
import BreakDuration from "./break-duration";
import FocusDuration from "./focus-duration";

const DurationDisplay = ( { session, focusDuration, setFocusDuration, breakDuration, setBreakDuration } ) => {

    // Display duration settings and controls
    return (
        <div className="row">
            <FocusDuration
                session={session}
                focusDuration={focusDuration}
                setFocusDuration={setFocusDuration}
            />
            <BreakDuration
                session={session}
                breakDuration={breakDuration}
                setBreakDuration={setBreakDuration}
            />
      </div>
    )

}

export default DurationDisplay