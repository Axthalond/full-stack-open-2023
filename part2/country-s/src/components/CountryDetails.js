import {useState} from 'react'
import axios from 'axios'
import kelvinToCelsius from '../utilis/kelvinToCelsius'


const CountryDetails = ( {country} ) => {
  const [temperature, setTemperature] = useState(0)
  const [wind, setWind] = useState(0)
  const [weather, setWeather] = useState('')
  const [icons, setIcon] = useState('')

  const api_key = process.env.REACT_APP_API_KEY
  
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&mode=json&appid=${api_key}`
    )
    .then(response => {
      setTemperature(kelvinToCelsius(response.data.main.temp).toFixed(2))
      setWind(response.data.wind.speed)
      setWeather(response.data.weather[0].description)
      setIcon(response.data.weather[0].icon)
    })
  

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
      <h2>Weather in {country.capital[0]}</h2>
      <div>
          Temperature: {temperature}° Celsius
      </div>
      <div>
            Weather: {weather}
            <img src={`https://openweathermap.org/img/wn/${icons}@2x.png`} alt={`${weather}`} />
      </div>
      <div>
          Wind: {wind} m/s
      </div>

    </>
  );
}

export default CountryDetails