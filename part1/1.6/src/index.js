import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Display = (props) => {
  return (
      <>
      <h2>Statistics</h2>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
      </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const manageGood = (much) => {
    setGood(much)
  }
  const manageNeutral = (much) => {
    setNeutral(much)
  }
  const manageBad = (much) => {
    setBad(much)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => manageGood(good + 1)} text = 'good'/>
      <Button handleClick={() => manageNeutral(neutral + 1)} text = 'neutral'/>
      <Button handleClick={() => manageBad(bad + 1)} text = 'bad'/>

      <Display good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)