import { useState, useEffect } from "react"


const useGetData = (API_KEY, city, country, units, setCountry) => {
    const [weatherData, setWeatherData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        //fetch lat & lon of city
        setIsPending(true)
        setWeatherData(null)
        setError(null)
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${API_KEY}`).then(response => response.json())
        .then(coordinates=> {
            const {lat, lon} = coordinates[0]
            setCountry(coordinates[0].country)
            //fetch weather data
            return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`); })
            .then(response => response.json())
            .then(data => {
                setWeatherData(data)
                setIsPending(false)
                setError(false)
            }) 


      
        .catch(error => {
            setError(true)
            setIsPending(false)
            setWeatherData(null)
            console.log('Location could not be found.')
            })
        }, [city, country, units, API_KEY, setCountry])

        return {weatherData, isPending, error}
    }

export default useGetData

