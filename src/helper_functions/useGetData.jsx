import { useState, useEffect } from "react"


const useGetData = (API_KEY, latLon, units, setCountry) => {
    const [weatherData, setWeatherData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        setIsPending(true)
        setWeatherData(null)
        setError(null)
        const {lat, lon} = latLon
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`) 
        .then(response => response.json())
        .then(data1 => {
            return fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
            .then((resp) => resp.json())
            .then(data2 => {
                setIsPending(false)
                setWeatherData(data1)
                setCountry(data2[0].country)
                setError(false)
            })
        })       
        .catch(error => {
            setError(true)
            setIsPending(false)
            setWeatherData(null)
            setCountry(null)
            console.log('Location could not be found.')
            })
    }, [latLon, units, API_KEY, setCountry])

    return {weatherData, isPending, error}
}

export default useGetData

