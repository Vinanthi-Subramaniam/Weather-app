const request=require('request')
const forecast=(lat,long,callback)=>{
    const url="https://api.darksky.net/forecast/6af60ec46cbfb01947c09632d1e1dad9/"+lat+","+long //37.8267,-122.4233"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined, body.daily.data[0].summary +" The current temperature is "+body.currently.temperature +' The high today is '+body.daily.data[0].temperatureHigh +', with a low of '+body.daily.data[0].temperatureLow+'. The probabilty of precipitation is '+body.currently.precipProbability+'.')
                 
                    
                
        }
    })
    
}
module.exports=forecast