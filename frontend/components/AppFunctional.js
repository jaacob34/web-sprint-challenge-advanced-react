import React, { useState } from 'react'
import { DIR, idxToRC, moveIndex } from './gridLogic'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const SIZE = 3
const postURL = 'http://localhost:9000/api/result'

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex)

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return idxToRC(index, SIZE)
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { x, y } = getXY()
    return `Coordinates (${y + 1}, ${x + 1})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage)
    setEmail(initialEmail)
    setIndex(initialIndex)
    setSteps(initialSteps)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    return moveIndex(index, direction, SIZE)
  }

  function move(direction) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const next = getNextIndex(direction)

    if (next === index) {
      const friendly =
        direction === DIR.LEFT ? "You can't go left" :
          direction === DIR.RIGHT ? "You can't go right" :
            direction === DIR.UP ? "You can't go up" :
              direction === DIR.DOWN ? "You can't go down" :
                'no move'
      setMessage(friendly)
      return
    }
    setIndex(next)
    setSteps(s => s + 1) //same as prev => prev + 1
    setMessage('')
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value)
  }

  async function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    const { x, y } = getXY()
    const payload = { email: email, steps: steps, x: y + 1, y: x + 1 }

    try {
      const { data } = await axios.post(postURL, payload)
      setMessage(data.message)
      setEmail('')
    } catch (err) {
      setMessage(err.response.data.message)
    }


  }
  

  return (
    
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move(DIR.LEFT)}>LEFT</button>
        <button id="up" onClick={() => move(DIR.UP)}>UP</button>
        <button id="right" onClick={() => move(DIR.RIGHT)}>RIGHT</button>
        <button id="down" onClick={() => move(DIR.DOWN)}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
