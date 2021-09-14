import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration"
import Session from "../components/session"

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

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
  // Called in all "session" components
  const sessionMinutes = () => {
    switch (session?.label) {
      case "Focusing": {return focusDuration}
      case "On Break": {return breakDuration}
      default: {return focusDuration}
    }
  }

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

  // Convert duration in minutes to a mm:ss display format: called to display current settings alongside adjustment buttons
  const focusMinutes = minutesToDuration(focusDuration)
  const breakMinutes = minutesToDuration(breakDuration)

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play()
        return setSession(nextSession(focusDuration, breakDuration))
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  )

  /**
   * Called whenever the play/pause button is clicked.
   */
  const playPause = () => {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            }
          }
          return prevStateSession;
        })
      }
      return nextState;
    })
  }

  // Called whenever the stop button is clicked
  const stopSession = () => {
    setIsTimerRunning(false) 
    setSession(null)
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          {/* Focus Duration: displays current setting, with buttons to increase or decrease */}
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
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            {/* Play/Pause button */}
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
            {/* Stop button */}
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
          </div>
        </div>
      </div>
      {/* Displays session component & its children: session title, countdown, & progress bar */}
      <Session 
        session={session}
        sessionMinutes={sessionMinutes}
        />
    </div>
  )
}

export default Pomodoro;
