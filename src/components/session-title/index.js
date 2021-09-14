import React from "react";
import { minutesToDuration } from "../../utils/duration";

const SessionTitle = ( { session, sessionMinutes} ) => {

// Convert sessionMinutes to mm:ss display: called in to display total session length in the session title
const titleTime = minutesToDuration(sessionMinutes())

// Get session label using old syntax in order to satisfy Qualified
const sessionLabel = session ? session.label : null

// Display session title with label and total length
return (
    <h2 data-testid="session-title">
        {sessionLabel} for {titleTime} minutes
    </h2>
)

}

export default SessionTitle