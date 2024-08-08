const UnixToRealTime = (unixDate) => {
    const date = new Date(unixDate * 1000)
    var hour = date.getHours()
    var minute = date.getMinutes()
    if (minute < 10) {
        var minute_str = `0${minute}`
    } else {
        var minute_str = `${minute}`
    }
    if (hour === 0) return `12:${minute_str}AM`
    if (hour === 12) return `12:${minute_str}PM`
    if (hour < 12) return `${hour}:${minute_str}AM`
    return `${hour - 12}:${minute_str}PM`
}

export default UnixToRealTime
