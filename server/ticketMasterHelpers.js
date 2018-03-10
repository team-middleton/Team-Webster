const axios = require('axios');
var geohash = require('ngeohash');
var dateFormat = require('dateformat');
var zipcodes = require('zipcodes');

var exampleLat = 40.755603;
var exampleLong = 73.984931;

var ticketMasterMethods = {};

ticketMasterMethods.createGeoPoint = function (lat, long) {
    return geohash.encode(lat, long);
}

ticketMasterMethods.getEventsFromTicketMaster = function(keyword, lat, long, zip, callback) {
    console.log('zip in ticket master request ', zip );
    console.log('lat in ticket master request ', lat );
    if(zip!== '0'   ) {
        var zipLat = zipcodes.lookup(zip).latitude;
        var zipLong = zipcodes.lookup(zip).longitude;
        var geoHash = this.createGeoPoint(zipLat, zipLong);
    } else {
        var geoHash = this.createGeoPoint(lat, long);      
    }
    var url = `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geoHash}&radius=20&unit=miles&keyword=${keyword}&size=20&classificationName=music&sort=date,asc&apikey=GrOOwv0SlHcwV6DctS7F86eWwXRdJDOJ`;
    // console.log('url in server ', url)
    axios.get(url)
    .then((res)=> {
        
        var event = res.data._embedded.events;
        var eventsArray = []
        res.data._embedded.events.map( event => {
            var eventData ={};
            eventData.name = event.name;
            eventData.url = event.url;
            eventData.date = event.dates.start.localDate;
            eventData.time = event.dates.start.localTime;
            eventData.dateTime = event.dates.start.dateTime;
            eventData.date = dateFormat(event.dates.start.localDate, 'fullDate');
            if(event.priceRanges) {
                eventData.minPrice = event.priceRanges[0].min;
                eventData.maxPrice = event.priceRanges[0].max;
            } 
            eventData.keyword = keyword;
            eventData.venue = event._embedded.venues[0].name;
            eventData.type = event.type;
            eventData.imageUrl = event.images[4].url
            var today = new Date();
            var eventDate = new Date(event.dates.start.localDate)
            if (eventDate >= today) {
                eventsArray.push(eventData);
            }
        })
        // callback('yo')
        // callback(res.data._embedded.events[0])
        // console.log('response data to send  ', eventsArray)
        callback(eventsArray)
    })
    .catch((err) => {
        console.log('err in server getting concerts ' , err.Error)
    })
}




module.exports = ticketMasterMethods;