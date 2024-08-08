import React, { useEffect } from 'react'
import UnixToRealHour from './helper_functions/UnixToRealHour'
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'




const HourlyForecast = (props) => {
  const weatherData = props.weatherData
  const isNight = props.isNight
  const isCloudy = props.isCloudy
  const hourly = weatherData.hourly.slice(0, 25) //get the hourly forecast for a period of 24h
  var uniqueId = 0 
  const offset = weatherData.timezone_offset

  const scrollLeft = () => {
    var scroll = document.getElementById('scroll')
    scroll.scrollLeft = scroll.scrollLeft - 400
  }

  const scrollRight = () => {
    var scroll = document.getElementById('scroll')
    scroll.scrollLeft = scroll.scrollLeft + 400
  }

  useEffect(() => {
    const hourly = document.getElementById('hourly')
    hourly.style.width = "65%"
    const bg_color = isNight ? 'rgb(25,0,75)' : (isCloudy ? '#808080' : 'rgb(45, 120, 185)')
    hourly.style.backgroundColor = bg_color
    document.getElementById('scroll-container').style.height = "70%"
  }, [weatherData, isNight, isCloudy])

  return (
    <div className='relative flex flex-col  mt-20 h-56 justify-center rounded-2xl' id='hourly' >
      <div className='h-5 absolute top-2 ml-5 font-extralight text-sm'>HOURLY-FORECAST </div>
      <hr className='ml-5 mr-5 mt-1'/>

      <div className='flex items-center w-full' id='scroll-container'>
        <MdChevronLeft size={40} onClick={scrollLeft} className='cursor-pointer opacity-50 hover:opacity-100 left-5' />

        <div id='scroll' className='overflow-x-scroll scroll-smooth whitespace-nowrap h-full scrollbar-hide w-full'> 
          {hourly.map((data) => {
            uniqueId = uniqueId + 1
            const icon_url = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            const hour = UnixToRealHour(data.dt + offset + 14400) 
            return (
              <div className='inline-block' key={uniqueId}>
                <div  className='flex flex-col items-center mt-12'>
                  <div className='-m-5'>
                    { uniqueId === 1 && 'Now'} 
                    { uniqueId !== 1 && hour}
                  </div>
                  <img src={icon_url} alt='/'/>
                  <div className='-m-5'> 
                    {Math.round(data.temp)}&deg;
                  </div>
                </div>
              </div>
            )
          }
          )}
        </div>

        <MdChevronRight size={40} onClick={scrollRight} className='cursor-pointer opacity-50 hover:opacity-100 right-5'/>
        </div>


    </div>
  )
}

export default HourlyForecast
