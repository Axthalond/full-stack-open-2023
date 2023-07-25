const Part = ({part}) => {
  return (
  <p>
    {part.name} {part.exercises}
  </p>
  )
}

const Header = ({heading}) => {
  return (
    <h2>
      {heading}
    </h2>
  )
}

const Content = ({parts}) => {
  return (
    <div>
    {parts.map(part => (
      <Part key={part.id} part={part}/>
    ))}
  </div>
  )
}

const Total = ( {parts} ) => {
  return (
    <p>
      <strong> 
        total of {parts.reduce((a,b) => a + b.exercises, 0)} exercises
      </strong>
    </p>
  )
}


const Courses = ({courses}) => {
  return (
    <>
      <div>
        <h1>Web development curriculum</h1>
      </div>
      
      <>
        {courses.map((course) => 
          <div>
            <Header heading = {course.name}/>
            <Content parts = {course.parts}/>
            <Total parts = {course.parts}/>
          </div>)}
      </>
    </>
  )
}

export default Courses