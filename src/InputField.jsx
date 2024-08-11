import React, { useState } from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

const InputField = (props) => {
  const [input, setInput] = useState('');
  var unique_id = 120

  const handleSelect = async (selected) => {
    try {
      const addr_array = input.split(',')
      if (addr_array.length === 1) throw new Error("Must specify city or state")
      const results = await geocodeByAddress(selected)
      const lat_lon = await getLatLng(results[0])
      const {lat, lng: lon} = lat_lon
      props.setLatLon({lat, lon})
      props.setCity(addr_array[0])
      } 
    catch (error) {
      setInput('')
      console.log(error)
    }
  }

  const onError = (status, clearSuggestions) => {
    console.log('Google Maps API returned error with status: ', status)
    clearSuggestions()
  }
  
  return (
    <PlacesAutocomplete value={input} onChange={setInput} onSelect={handleSelect} onError={onError}>
      {({getInputProps, suggestions, getSuggestionItemProps}) => (
        <div> 
          <input {...getInputProps({
            placeholder: "Search or enter a city...", 
            className: 'rounded-md text-gray-400 pl-1',
            size: "40"
          })} />

          <div className='bg-white rounded-md'>
            {suggestions.map((suggestion) => {
              unique_id++;
              const style = {
                '--tw-text-opacity': '1',
                color: 'rgba(156, 163, 175, var(--tw-text-opacity))',
                backgroundColor: suggestion.active ? "rgba(243, 244, 246, var(--tw-text-opacity))" : "white",
                cursor: 'pointer',
                width: '384px',
                'margin' : "2px 5px 2px 5px",
                'borderRadius': "5px"
              }
              return (
                <div key={unique_id} {...getSuggestionItemProps(suggestion, {style})} >
                  {suggestion.active && setInput(suggestion.description)}
                  {suggestion.description} 
                </div>
              )
            }) }
          </div>

        </div>
        )
      }
      </PlacesAutocomplete>
      
  )

}

export default InputField
