import React, { useEffect } from 'react'

const DailyForecast = (props) => {
  const weatherData = props.weatherData
  const isNight = props.isNight
  const isCloudy = props.isCloudy
  var uniqueId = 99
  const offset = weatherData.timezone_offset


  useEffect(() => {
    const daily = document.getElementById('daily')
    daily.style.width = "65%"
    var bg_color;
    if (isNight != null) {
    bg_color = isNight ? 'rgb(25,0,75)' : (isCloudy ? '#808080' : 'rgb(45, 120, 185)')
    daily.style.backgroundColor = bg_color
    }
  }, [weatherData, isNight, isCloudy]) 

  return (
    <div className={`flex flex-col mt-20 relative rounded-2xl mb-20 bg-starry-night`} id='daily'>
      <div className='h-5 ml-5 mr-5 mt-2 mb-3 font-extralight text-sm'> 
        8-DAY FORECAST 
      </div>

      <div className='flex flex-col mb-2'> 
        {weatherData.daily.map((data) => {
          const icon_url = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          const date = (new Date((data.dt + offset + 14400)* 1000)).toDateString()
          
          uniqueId++
          return (
            <div key={uniqueId}> 
              {uniqueId === 100 && <hr className='ml-5 mr-5'/>}
              {uniqueId !==100 && <hr className='ml-5 mr-5 m-4'/>}

              <div className='flex mt-5 items-center ml-5 mr-5'>
                <div className='w-2/5'>
                  {uniqueId === 100 && 'Today'}
                  {uniqueId !== 100 && date.substring(0, 3)}
                </div>

                <div className='w-2/5'>
                  <img src={icon_url} alt='/'/>
                </div>

                <div className='flex flex-col w-1/5'>
                  <div> 
                    H:{Math.round(data.temp.max)}&deg;
                  </div>
                  <div>
                    L:{Math.round(data.temp.min)}&deg;
                  </div>
                </div>

              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default DailyForecast
