import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return (
    <>
    <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}

const StatisticsLine = ({text, value}) => {
  return(
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalComments = good + neutral + bad
  const average = (good-bad)/totalComments
  const positive = (good/totalComments)*100
  return (
    totalComments > 0 ? (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticsLine text='Good' value={good}/>
            <StatisticsLine text='Neutral' value={neutral}/>
            <StatisticsLine text='Bad' value={bad}/>
            <StatisticsLine text='Total' value={totalComments}/>
            <StatisticsLine text='Average' value={average}/>
            <StatisticsLine text='Positive' value={`${positive}%`}/>
          </tbody>
        </table>
      </>
    ) : <p>No feedback given</p>
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

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)