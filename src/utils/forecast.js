const request = require('postman-request')



const getForecast = (address, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=1d6733af4644f947c5f79a05d321fc60&query='+ address +'&units=f'

request({url: url, json: true}, (error, response, body) => {
        //  console.log('===================')
        //  console.log('Error: ' + body)
        //  return
    
    if (error)
    {
        // console.log('Sorry couldnt fetch weather data')
        // return
        callback('Sorry couldnt fetch weather data', undefined)
    } else if (body.error)
    {
        //console.log(body.error.info)
        callback('Sorry couldnt fetch weather data', undefined)
       // return
    }
    else{
        callback(undefined, {
            temperature: body.current.temperature,
            feelsLike: body.current.feelslike,
            location: body.location.name,
            condition: body.current.weather_descriptions[0]
        })
    }
    // console.log(body.current)

    // console.log(chalk.bgYellow.green('Weather Condition: ' + body.current.weather_descriptions[0]))
    // console.log('It is currently ' + body.current.temperature +  ' degrees temperature. There is a ' + body.current.precip + '% chances of rain today.' 
    // + '. It feels like ' + body.current.feelslike + ' degrees out')
    //console.log(response)
   // const data = JSON.parse(body)
   // console.log(data)
    // console.log('===================')
    // console.log(data.current)

})
}

 module.exports = getForecast
