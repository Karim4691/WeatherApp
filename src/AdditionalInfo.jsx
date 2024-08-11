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
    const offset = weatherData.timezone_offset
    
    useEffect(() => {
        const info = document.getElementById('info')
        info.style.width = "70%"    
        info.style.height = "200px"

        if (Math.round(weatherData.current.feels_like) >= 30) {
          document.getElementById('feels-like').style.color = 'red'
        } else if (Math.round(weatherData.current.feels_like) >= 20) {
          document.getElementById('feels-like').style.color = 'orange'
        }
      }, [weatherData])
  return (
    <div id='info' className='mt-20 rounded-2xl grid grid-cols-4 justify-items-center gap-1'>
      <div className='flex items-center'> 
        <FiSunrise className='inline-block mr-2 text-yellow-300' size={30} />
        <div className='flex flex-col items-center'> 
          <div>Sunrise </div>
          <div className='text-2xl'>{UnixToRealTime(weatherData.current.sunrise + offset + 14400)}</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <PiThermometerHotLight className='inline-block mr-2 text-blue-300' size={30} id='feels-like'/>
        <div className='flex flex-col items-center'> 
          <div>Feels Like </div>
          <div className='text-2xl'>{Math.round(weatherData.current.feels_like)}&deg;</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <MdSunny className='inline-block mr-2 text-yellow-400' size={30} />
        <div className='flex flex-col items-center'> 
          <div>UVI </div>
          <div className='text-2xl'>{Math.round(weatherData.current.uvi)}</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <FaWind className='inline-block mr-2 text-gray-100' size={30} />
        <div className='flex flex-col items-center'> 
          <div>Wind </div>
          <div className='text-2xl'>{Math.round(weatherData.current.wind_speed * 3.6)}km/h</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <FiSunset className='inline-block mr-2 text-orange-400' size={30} />
        <div className='flex flex-col items-center'> 
          <div>Sunset </div>
          <div className='text-2xl'>{UnixToRealTime(weatherData.current.sunset + offset + 14400)}</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <WiHumidity className='inline-block mr-2 text-blue-500' size={30} />
        <div className='flex flex-col items-center'> 
          <div>Humidity </div>
          <div className='text-2xl'>{Math.round(weatherData.current.humidity)}%</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <LiaCloudscale className='inline-block mr-2 text-orange-300' size={30} />
        <div className='flex flex-col items-center'> 
          <div>Pressure </div>
          <div className='text-2xl'>{Math.round(weatherData.current.pressure)}hPa</div>
        </div>
      </div>

      <div className='flex items-center'> 
        <IoIosCloud className='inline-block mr-2 text-gray-300' size={30} />
        <div className='flex flex-col items-center'> 
          <div> Clouds </div>
          <div className='text-2xl'>{Math.round(weatherData.current.clouds)}%</div>
        </div>
      </div>
      
    </div>
  )
}

export default AdditionalInfo
