const UnixToRealHour = (unixTime) => {
  const realTime = new Date(unixTime * 1000)
  var realHour = realTime.getHours()
  if (realHour === 0) return '12AM'
  if (realHour === 12) return '12PM'
  if (realHour < 12) return `${realHour}AM`
  return `${realHour - 12}PM`

}

export default UnixToRealHour
