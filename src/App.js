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


const API_KEY = 'a6df648c3ee83e12975579a47c7bf2aa'


function App() {
  const [isNight, setIsNight] = useState(null);
  const [isCloudy, setIsCloudy] = useState(null);
  const [city, setCity] = useState('montreal')
  const [country, setCountry] = useState('ca')
  const [isCelcius, setIsCelcius] = useState(true);
  const [units, setUnits] = useState('metric'); //temperature units for api call
  const {weatherData, isPending, error} = useGetData(API_KEY, city, country, units, setCountry)


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
    //determine bg image
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
        if (!isNight) bg_img = 'blue-sky.jpg'
      } else {
        setIsCloudy(true)
        if (!isNight) bg_img = 'cloudy.jpg'
      }


      document.body.style.backgroundImage =  `url(./background-images/${bg_img})`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
    }
  }, [weatherData, isCelcius, city, country, isNight, isCloudy])
  
  return (
    <div className='relative'>
      {isPending &&
      <div className='justify-center items-center text-white'>
        <IoIosCloud className='animate-bounce w-full mt-48' size={600} />
      </div>}
      
        {error && 
          <div className='flex flex-col items-center justify-center mt-20'> 
            <InputField setCity={setCity} setCountry={setCountry}/>
            <p className='text-red-500 w-96 mt-5'>
              The location entered could not be found. Please ensure that the city and country code (follow the ISO 3166 standard) are seperated by a comma.
            </p>
          </div>
          }

      {weatherData && 
        <div className='flex flex-col items-center'>

          <div className='mt-20 relative'>
            <div className='justify-center inline-block'> 
              <InputField setCity={setCity} setCountry={setCountry}/>
            </div>

            <div className='inline-block absolute'>
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

          <div className='mt-10 text-5xl flex flex-col items-center relative'> 
            <div>{Capitalize(city)}, {country.toUpperCase()}</div>
            <div className='flex flex-col items-center'>
              <div className='text-6xl'> {Math.round(weatherData.current.temp)}&deg; </div>
              <div className='text-lg'> {TitleCase(weatherData.current.weather[0].description)} </div>
            </div>
            <div className='flex justify-around items-center'> 
              <div className='text-xl'> H:{Math.round(weatherData.daily[0].temp.max)}&deg; &nbsp;&nbsp;&nbsp;</div>
              <div className='text-xl'> L:{Math.round(weatherData.daily[0].temp.min)}&deg; </div>
            </div>
          </div>

          <AdditionalInfo weatherData={weatherData} isNight={isNight} isCloudy={isCloudy}/>

          <HourlyForecast weatherData={weatherData} isNight={isNight} isCloudy={isCloudy}/>

          <DailyForecast weatherData={weatherData} isNight={isNight} isCloudy={isCloudy}/>
        
        </div>
        }
  </div>
  );
}

export default App
