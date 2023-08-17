import { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";


const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [showCountry, setShowCountry] = useState({});

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) =>
      setCountries(
        response.data.map(
          ({ name, capital, population, area, languages, flags, ccn3 }) => ({
            name: name.common,
            capital,
            population,
            area,
            languages,
            flags,
            ccn3,
          })
        )
      )
    );
  }, []);

  const handleChange = (e) => {
    setFilterQuery(e.target.value.toLowerCase());
    setShowCountry({});
  }

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(filterQuery)
  )

  const handleShow = name => () => {
    setShowCountry(
      filteredCountries.filter(country => country.name.includes(name))[0]
      )
  }


  return (
    <div>
      <form>
        <p>
          find countries<input value={filterQuery} type="text" onChange={handleChange} />
        </p>
        {filteredCountries.length > 10 && (
          <div>Too many matches, specify another filter</div>
        )}

        {filteredCountries.length <= 10 && 
          filteredCountries.length > 1 &&
          filteredCountries.map(country => (
            <div key={country.name}>
              {country.name}{' '} 
              <button onClick={handleShow(country.name)} type="button">show</button>
            </div>
          ))}
        {filteredCountries.length === 1 && <CountryDetails country={filteredCountries[0]} />}
        
        {showCountry.name && <CountryDetails country={showCountry} />}
      </form>
    </div>
  );
};

export default App;
