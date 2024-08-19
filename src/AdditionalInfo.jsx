import React, { useEffect } from 'react'
import { FiSunrise, FiSunset } from "react-icons/fi";
import UnixToRealTime from './helper_functions/UnixToRealTime';
import { PiThermometerHotLight } from 'react-icons/pi';
import { WiHumidity } from 'react-icons/wi';
import { MdSunny } from 'react-icons/md';
import { LiaCloudscale } from 'react-icons/lia';
import { FaWind } from 'react-icons/fa';
import { IoIosCloud } from 'react-icons/io';

const AdditionalInfo = (props) => {
    const weatherData = props.weatherData
    const isCelcius = props.isCelcius
    const offset = weatherData.timezone_offset
    
    useEffect(() => {
        const info = document.getElementById('info')
        info.style.width = "70%"    
        info.style.height = "200px"

        if (isCelcius) {
          if (Math.round(weatherData.current.feels_like) >= 30) {
            document.getElementById('feels-like').style.color = 'red'
          } else if (Math.round(weatherData.current.feels_like) >= 20) {
            document.getElementById('feels-like').style.color = 'orange'
          }
        } else {
          if (Math.round(weatherData.current.feels_like) >= 86) {
            document.getElementById('feels-like').style.color = 'red'
          } else if (Math.round(weatherData.current.feels_like) >= 68) {
            document.getElementById('feels-like').style.color = 'orange'
          }
        }
      }, [weatherData, isCelcius])
  return (
    <div id='info' className='mt-20 rounded-2xl grid grid-cols-4 justify-items-center gap-1'>
      <div className='flex items-center'> 
        <FiSunrise className='inline-block mr-2 text-yellow-300 md:size-8 size-6'  />
        <div className='flex flex-col items-center'> 
          <div className='md:text-xl text-xs'>Sunrise </div>
          <div className='md:text-2xl sm:text-base text-sm'>{UnixToRealTime(weatherData.current.sunrise + offset + 14400)}</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <PiThermometerHotLight className='inline-block mr-2 text-blue-300 md:size-8 sm:size-6 size-4' id='feels-like'/>
        <div className='flex flex-col items-center'> 
          <div className='md:text-xl text-xs'>Feels Like </div>
          <div className='md:text-2xl sm:text-base text-sm'>{Math.round(weatherData.current.feels_like)}&deg;</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <MdSunny className='inline-block mr-2 text-yellow-400 md:size-8 sm:size-6 size-4'  />
        <div className='flex flex-col items-center'> 
          <div className='md:text-xl text-xs'>UVI </div>
          <div className='md:text-2xl sm:text-base text-sm'>{Math.round(weatherData.current.uvi)}</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <FaWind className='inline-block mr-2 text-gray-100 md:size-8 sm:size-6 size-4'  />
        <div className='flex flex-col items-center'> 
          <div className='md:text-xl text-xs'>Wind </div>
          <div className='md:text-2xl sm:text-base text-sm'>{Math.round(weatherData.current.wind_speed * 3.6)}km/h</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <FiSunset className='inline-block mr-2 text-orange-400 md:size-8 size-6'  />
        <div className='flex flex-col items-center'> 
          <div className='md:text-xl text-xs'>Sunset </div>
          <div className='md:text-2xl sm:text-base text-sm'>{UnixToRealTime(weatherData.current.sunset + offset + 14400)}</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <WiHumidity className='inline-block mr-2 text-blue-500 md:size-8 sm:size-6 size-4' />
        <div className='flex flex-col items-center'> 
          <div className='md:text-xl text-xs'>Humidity </div>
          <div className='md:text-2xl sm:text-base text-sm'>{Math.round(weatherData.current.humidity)}%</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <LiaCloudscale className='inline-block mr-2 text-orange-300 md:size-8 sm:size-6 size-4'  />
        <div className='flex flex-col items-center'> 
          <div className='md:text-xl text-xs'>Pressure </div>
          <div className='md:text-2xl sm:text-base text-sm'>{Math.round(weatherData.current.pressure)}hPa</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <IoIosCloud className='inline-block mr-2 text-gray-300 md:size-8 sm:size-6 size-4'  />
        <div className='flex flex-col items-center'> 
          <div className='md:text-xl text-xs'> Clouds </div>
          <div className='md:text-2xl sm:text-base text-sm'>{Math.round(weatherData.current.clouds)}%</div>
        </div>
      </div>
      
    </div>
  )
}

export default AdditionalInfo
