import { useState, useEffect } from 'react'
import axios from 'axios'
import Language from './Language'
const Button = ({ handleClick, text, country }) => (
    <button onClick={() => handleClick({ country })}>{text}</button>
)
const geoApi = axios.create({
    baseURL: 'http://api.openweathermap.org/geo/1.0'
})
const weatherApi = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5'
})
function App() {
    const api_key = process.env.REACT_APP_API_KEY
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    const [display, setDisplay] = useState(<div>
        Too many matches, specify another filter
            </div>)
    const hook = () => {
        console.log('effect')
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }
    useEffect(hook, [])
    function location(country, api_key) {
        const specific = '/direct?q=' + country.capital[0] + '&limit=5&appid=' + api_key
        geoApi
            .get(specific)
            .then(response => {
                weather(country,response.data,api_key)
            })
    }
    function weather(country,coord, api_key) {
        const specific = '/weather?lat=' + coord[0].lat + '&lon=' + coord[0].lat + '&appid=' + api_key
        weatherApi
            .get(specific)
            .then(response => {
                const icon = 'http://openweathermap.org/img/wn/' + response.data.weather[0].icon +'@2x.png'
                setDisplay(<div>
                    <h1> {country.name.common} </h1>
                    <p> capital {country.capital}</p>
                    <p> area {country.area}</p>
                    <b>languages:</b>
                    {Language(country.languages)}
                    <img src={country.flags.png} />
                    <h2> Weather in {country.capital}</h2>
                    <p>temperature {Number((response.data.main.temp - 273.15).toFixed(2))} Celcius</p>
                    <img src={icon} />
                    <p>wind {response.data.wind.speed}m/s</p>
                </div>)
            })
    }
    const show = (country) => (
        location(country, api_key)
    )
    const handleFilterChange = (event) => {
        setSearch(event.target.value)
        const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        if (countriesToShow.length > 10) {
            setDisplay(
                <div>
                    Too many matches, specify another filter
            </div>)
        } else if (countriesToShow.length > 1) {
            setDisplay(
                <div>
                    {countriesToShow.map(country =>
                        <p key={country.name.common}>{country.name.common} <button onClick={() => show( country )}>show</button></p>)}
                </div>
            )
        } else if (countriesToShow.length === 1) {
            const country = countriesToShow[0]
            location(country, api_key)
        } else {
            setDisplay(
                <div>
                    No countries match the filter. Please note that this only checks for a country's official name.
            </div>)
        }
    }
    
  return (
    <div>
          find countries:<input value={search} onChange={handleFilterChange} />
          {display}
    </div>
  );
}

export default App;
