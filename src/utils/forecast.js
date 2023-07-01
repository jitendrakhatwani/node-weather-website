const request = require('request');


const forecast = (lat,lng,callback) =>{
    const url = `https://api.weatherapi.com/v1/current.json?key=723690904ed345e6aaa163603231406&q=${lat},${lng}`;

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to Weather API',undefined);
        }else if(response.body.error){
            callback('Unable to get that Location, Please enter another location',undefined);
        }else {
            const location = response.body.location.name +" "+ response.body.location.region +" "+ response.body.location.country;
            callback(undefined,{
                location:location,
                currentTemperature:response.body.current.temp_c + " degree celcius",
                feelsLike:response.body.current.feelslike_c + " degree celcius",
                weatherCondition:response.body.current.condition.text
            })
        }

    })

}

module.exports = forecast