const CountryDetails = ( {country} ) => {
  return (
    <>
      <div>
        <h1>{country.name}</h1>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <div>
          <img src={country.flags.png} alt={`${country} flag`} />
        </div>
      </div>
    </>
  );
}

export default CountryDetails