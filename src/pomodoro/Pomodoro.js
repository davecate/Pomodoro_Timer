import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import SessionDisplay from "../components/session-display"
import TransportDisplay from "../components/transport-display";
import DurationDisplay from "../components/duration-display";

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
const nextTick = (prevState) => {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  }
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */

const nextSession = (focusDuration, breakDuration) => {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    }
  }
}

const Pomodoro = () => {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  // The current session - null where there is no session running
  const [session, setSession] = useState(null)

  // Default values for focus and break duration
  const [focusDuration, setFocusDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)

  // Combine focus and break durations into a single variable, returning the appropriate value based on the session label
  // Called in all session-display components
  const sessionMinutes = () => {
    switch (session?.label) {
      case "Focusing": {return focusDuration}
      case "On Break": {return breakDuration}
      default: {return focusDuration}
    }
  }

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1831.mp3").play()
        return setSession(nextSession(focusDuration, breakDuration))
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  )

  // Displays pomodoro app
  return (
    <div className="pomodoro">
    {/*Displays duration settings and controls */}
      <DurationDisplay 
        session={session}
        focusDuration={focusDuration}
        setFocusDuration={setFocusDuration}
        breakDuration={breakDuration}
        setBreakDuration={setBreakDuration}
      />
      {/* Displays session transport: play/pause, stop */}
      <TransportDisplay 
        session={session}
        setSession={setSession}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        focusDuration={focusDuration}
      />
      {/* Displays session component & its children: session title, countdown, & progress bar */}
      <SessionDisplay 
        session={session} 
        sessionMinutes={sessionMinutes} 
      />
    </div>
  )
}

export default Pomodoro;
