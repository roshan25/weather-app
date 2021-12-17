const request = require('postman-request')


const getGeocode = (address, callback) => {

    const locationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoicm9zaGFudGhhcGEiLCJhIjoiY2t4MDBhY283MGxseTJ3cDlkaW9mMjExNSJ9.Juhhy4ZSp-mpj9TOleOhDQ&limit=1'

    request({url: locationURL, json: true}, (error, response, body) =>{
      //  console.log('Error: ' + response.body.error)
        
        if (error)
        {
           // console.log('Sorry couldnt fetch location data')
            callback ('Sorry couldnt fetch location data', undefined)
        } 
        else if (body.features == undefined || body.features.length == 0 )
        {
           // console.log('Sorry, couldnt find location. ' + body.attribution)
            callback ('Sorry, couldnt find location', undefined)
        }
        else{
        // console.log('longitude: ' + body.features[0].center[0])
        // console.log('latitude: ' +  body.features[0].center[1])
        callback(undefined, {
            latitude: body.features[0].center[0],
            longitude: body.features[0].center[1],
            place: body.features[0].place_name
        })
    
    }
    })
    
}


module.exports = getGeocode