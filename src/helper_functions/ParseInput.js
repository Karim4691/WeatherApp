
//get city and country entered
const ParseInput = (input) => {
  if (input === null) return {city: '', country: ''}
  const parsed = input.split(',')

  if (parsed.length < 2) return {city: parsed[0], country: ''}
  return {city: parsed[0], country: parsed[1]}
}

export default ParseInput
