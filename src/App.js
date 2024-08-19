import { useEffect, useState } from 'react';
import './index.css';
import InputField from './InputField';
import useGetData from './helper_functions/useGetData';
import Capitalize from './helper_functions/Capitalize';
import TitleCase from './helper_functions/TitleCase';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast'
import AdditionalInfo from './AdditionalInfo';
import { IoIosCloud } from 'react-icons/io';




function App() {
  const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY

  const [isNight, setIsNight] = useState(null);
  const [isCloudy, setIsCloudy] = useState(null);
  const [city, setCity] = useState('montreal')
  const [country, setCountry] = useState('ca')
  const [isCelcius, setIsCelcius] = useState(true);
  const [units, setUnits] = useState('metric'); //temperature units for api call
  const [latLon, setLatLon] = useState({lat:"45.5031824", lon:"-73.5698065"})
  const {weatherData, isPending, error} = useGetData(WEATHER_KEY, latLon,units, setCountry)

  const toFahrenheit = () => {
    if (isCelcius === false) return
    setUnits('imperial')
    setIsCelcius(false)
  }

  const toCelcius = () => {
    if (isCelcius === true) return
    setUnits('metric')
    setIsCelcius(true)
  }

  useEffect( () =>{
     if (weatherData) {
      var bg_img;
      if (weatherData.current.weather[0].icon.charAt(2) === 'n') {
        setIsNight(true)
        bg_img='night.jpg'
      } else {
        setIsNight(false)
      }
      if (weatherData.current.weather[0].id > 799 && weatherData.current.weather[0].id < 803) {
        setIsCloudy(false)
        if (!isNight) {
          bg_img = 'blue-sky.jpg'
        }
      } else if (isNight != null){
        setIsCloudy(true)
        if (!isNight) {
          bg_img = 'cloudy.jpg'
        }
      }
    
      document.body.style.backgroundImage =  `url(./background-images/${bg_img})`;
 
      if (isNight) {
        document.body.style.backgroundColor = "rgb(25,0,75)"
      } else if (isCloudy) {
        document.body.style.backgroundColor = '#808080'
      } else if (isNight != null){
        document.body.style.backgroundColor = "rgb(45, 120, 185)"
      }
     }
  }, [weatherData, country, city, latLon, isCelcius, isNight, isCloudy])
  

  return (
    <div className='relative'>
      {isPending && 
      <div className='justify-center items-center text-white'>
        <IoIosCloud className='animate-bounce w-full mt-48' size={600} />
      </div>}
      
      {error && 
        <div className='flex flex-col items-center justify-center mt-20'> 
          <InputField setLatLon={setLatLon} setCity={setCity}/>
          <p className='text-red-500 w-96 mt-5'>
            Something went wrong, please try again. 
          </p>
        </div>
      }

      {weatherData && 
        <div className='flex flex-col items-center' >

          <div className='mt-5 fixed z-10 w-full flex justify-center'>
            <div className='ml-20 w-fit'> 
              <InputField setLatLon={setLatLon} setCity={setCity}/>
            </div>

            <div className='inline-block'>
              <div className='pl-10'>
                {isCelcius && <div className='flex'>
                  <div className='cursor-pointer opacity-100 hover:text-lg' id='c' onClick={toCelcius}> &deg;C </div> <div className='opacity-75'>&nbsp;|&nbsp; </div>
                  <div className='cursor-pointer hover:opacity-75 opacity-50 active:opacity-100 hover:text-lg' id='f' onClick={toFahrenheit}>&deg;F</div>
                </div>
                }

                {!isCelcius && <div className='flex'>
                  <div className='cursor-pointer hover:opacity-75 opacity-50 active:opacity-100 hover:text-lg' id='c' onClick={toCelcius}> &deg;C </div> <div className='opacity-75'>&nbsp;|&nbsp; </div>
                  <div className='cursor-pointer opacity-100 hover:text-lg' id='f' onClick={toFahrenheit}>&deg;F</div>
                </div>
                }

              </div>
            </div>
          </div>

          <div className='mt-20 flex flex-col items-center relative'> 
            <div className='md:text-3xl sm:text-xl text-sm'>{Capitalize(city)}, {country.toUpperCase()}</div>
            <div className='flex flex-col items-center'>
              <div className='md:text-5xl sm:text-3xl text-2xl'> {Math.round(weatherData.current.temp)}&deg; </div>
              <div className='md:text-lg sm:text-sm'> {TitleCase(weatherData.current.weather[0].description)} </div>
            </div>
            <div className='flex justify-around items-center'> 
              <div className='md:text-xl sm:text-sm'> H:{Math.round(weatherData.daily[0].temp.max)}&deg; &nbsp;&nbsp;&nbsp;</div>
              <div className='md:text-xl sm:text-sm'> L:{Math.round(weatherData.daily[0].temp.min)}&deg; </div>
            </div>
          </div>

          <AdditionalInfo weatherData={weatherData} isNight={isNight} isCloudy={isCloudy} isCelcius={isCelcius}/>

          <HourlyForecast weatherData={weatherData} isNight={isNight} isCloudy={isCloudy}/>

          <DailyForecast weatherData={weatherData} isNight={isNight} isCloudy={isCloudy}/>
        
        </div>
        }
  </div>
  );
  
}

export default App
