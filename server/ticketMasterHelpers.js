const axios = require('axios');
var geohash = require('ngeohash');

var exampleLat = 40.755603;
var exampleLong = 73.984931;

var ticketMasterMethods = {};

ticketMasterMethods.createGeoPoint = function (lat, long) {
    return geohash.encode(lat, long);
}

ticketMasterMethods.getEventsFromTicketMaster = function(keyword, lat, long, callback) {
    var geoHash = this.createGeoPoint(lat, long);
    var url = `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geoHash}&radius=20&unit=miles&keyword=${keyword}&size=10&classificationName=music&sort=date,desc&apikey=GrOOwv0SlHcwV6DctS7F86eWwXRdJDOJ`;
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
            if(event.priceRanges) {
                eventData.minPrice = event.priceRanges[0].min;
                eventData.maxPrice = event.priceRanges[0].max;
            } 
            eventData.keyword = keyword;
            eventData.venue = event._embedded.venues[0].name;
            eventData.type = event.type;
            eventsArray.push(eventData);
        })
        // callback('yo')
        // callback(res.data._embedded.events[0])
        callback(eventsArray)
    })
}




module.exports = ticketMasterMethods;