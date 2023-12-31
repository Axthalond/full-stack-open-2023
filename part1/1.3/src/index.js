import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <li>
        {props.part.name}, {props.part.exercises} exercises.
      </li>
    </>
  )
}
const Content = (props) => {
  return (
    <>
      <Part part = {props.part1} />
      <Part part = {props.part2} />
      <Part part = {props.part3} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>
        Number of excercises {props.totalpart1 + props.totalpart2 + props.totalpart3}
      </p>
    </>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name :'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header 
      course = {course}
      />
      <Content 
      part1 = {part1} 
      part2 = {part2} 
      part3 = {part3} 
      />
        <Total 
      totalpart1 = {part1.exercises} 
      totalpart2 = {part2.exercises} 
      totalpart3 = {part3.exercises}
      /> 
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))
