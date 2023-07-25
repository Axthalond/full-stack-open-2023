const Numbers = ( { persons, query } ) => {
  return (
    <>
      {persons
        .filter(person => person.name.toLowerCase().includes(query)).map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  )
}

export default Numbers