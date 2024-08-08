import React, { useState } from 'react'
import ParseInput from './helper_functions/ParseInput'

const InputField = (props) => {
  const [input, setInput] = useState(null);

  
  const updateLocation = (e) => {
    e.preventDefault()
    const {city, country} = ParseInput(input)
    props.setCity(city)
    props.setCountry(country)
    setInput(null)
  }

  return (
    <form className='inline-block' id='form' onSubmit={updateLocation}>
        <input placeholder='Enter a city and its country code (ex: Montreal, CA)...' className='rounded-md text-gray-400 pl-1' size={40} type='search' onChange={(e) => setInput(e.target.value)}>
        </input>

        <input type='submit' hidden/>
    </form>
  )
}

export default InputField
