import React from "react";
import { minutesToDuration } from "../../../../utils/duration";

const SessionTitle = ( { session, sessionMinutes} ) => {

// Convert sessionMinutes to mm:ss display, 
// called in to display total session length in the session title
const titleTime = minutesToDuration(sessionMinutes())

// NOTE FOR THINKFUL GRADERS/STUDENTS: Thinkful provides starter code 
// using session?.label syntax, but requires code to pass in Qualified's
// test environment, which doesn't support using the new syntax inside of JSX.

// Get session label using old syntax
const sessionLabel = session ? session.label : null

// Displays session title with session type and session length
return (
    <h2 data-testid="session-title">
        {sessionLabel} for {titleTime} minutes
    </h2>
)

}

export default SessionTitle
