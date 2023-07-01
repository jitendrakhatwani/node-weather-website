const request = require("request");

const geocode =(address, callback) =>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoiaml0ZW5kcmFraGF0d2FuaSIsImEiOiJjbGpmNHBqeXgwMGl3M25xbXVpMmJpYmdqIn0.xlSxF7flMMRvdbLhZj8lgA&limit=1';
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to map server',undefined);
        }else if(response.body.features.length===0){
            callback('Please enter a valid address',undefined);
        }else {
            callback(undefined, {
                location:response.body.features[0].place_name,
                lat: response.body.features[0].center[1],
                lng: response.body.features[0].center[0]
            })


        }
    })
};


module.exports = geocode