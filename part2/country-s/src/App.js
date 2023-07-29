import { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";

const Matches = ({ countries, query }) => {
  const queryFiltered = countries.filter((country) =>
    country.name.toLowerCase().includes(query)
  );
  const queryLength = queryFiltered.length;

  if (queryLength == 1) {
    const country = queryFiltered[0];
    return (
      <CountryDetails country={country} />
    )
  } else if (queryLength > 1 && queryLength < 10) {
    return (
      <>
        {queryFiltered.map((country) => (
          <div key={country.ccn3}>{country.name}<button>show</button></div>
        ))}
      </>
    );
  } else if (queryLength >= 10) {
    return <>Too many matches, specify another filter</>;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

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

  const handleChange = (e) => setFilterQuery(e.target.value.toLowerCase());

  return (
    <div>
      <form>
        <div>
          find countries:{" "}
          <input value={filterQuery} type="text" onChange={handleChange} />
        </div>

        <div>
          <Matches countries={countries} query={filterQuery} />
        </div>
      </form>
    </div>
  );
};

export default App;
