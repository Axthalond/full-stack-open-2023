import {useState, useEffect} from 'react'
import axios from 'axios'

const Matches = ( {countries,query} ) => {


  return (
    <>
      {countries
      .filter(country => country.name.common.toLowerCase().includes(query))
        .map((country) => (
          <div key={country.ccn3}>
            {country.name.common}
          </div>
        ))}
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterQuery, setFilterQuery] = useState("")

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (setValue) => (event) => {
    setValue(event.target.value.toLowerCase())
  }


  return (
    <div>
      <form>
        <div>
          find countries: <input value={filterQuery} type='text' onChange={handleChange(setFilterQuery)}/>
        </div>
        
        <div>
          <Matches countries={countries} query={filterQuery}/>
        </div>
      </form>
    </div>
  );
}

export default App;
