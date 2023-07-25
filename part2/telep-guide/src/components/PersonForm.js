const PersonForm = ( { name, number, handleChangeNumber, handleChangeName, handleAddPerson } ) => {
  return (
    <div>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={name} onChange={handleChangeName} />
        </div>

        <div>
          number:{" "}
          <input value={number} onChange={handleChangeNumber} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
