const Filter = ( {query, handleChange} ) => {
  return(
    <div>
      <p>
      filter shown with: {' '}
      <input value={query} onChange={handleChange}/>
      </p>
    </div>
  )
}

export default Filter

