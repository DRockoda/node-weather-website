const request = require('request')

const forecast = (longitude,latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=20fb1802645d8736a136789c9b389830&query='+ latitude +',' + longitude+'&units=f'

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'todays temperature is ' + body.current.temperature + ' degree')
        }
    })
}

module.exports = forecast