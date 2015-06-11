// holy jesus  what the fuck
var HARDCODED_MAX_EVENT_LIMIT = 0;
var ONE_DAY = 1000 * 3600 * 24;
var myDataRef2 = new Firebase("https://booking-example.firebaseio.com");

var isDayFull = function(allCalEvents, todaysDate) {
    var limitForDay = HARDCODED_MAX_EVENT_LIMIT;

    var todaysEOD = new Date(todaysDate.getTime() + ONE_DAY);

    var todaysEvents = allCalEvents.filter(function(calEvent) {
       var start = new Date(calEvent.start); 
       var end = new Date(calEvent.end);
       return todaysDate >= start && todaysEOD <= end;
    });

    return todaysEvents.length > limitForDay;
}

//myDataRef.once("value", function(nameSnapshot) {
//    var val = nameSnapshot.val();
//    initCalendar(val.events);
//});

var getEventsForHouse = function(house) {
    return Object.keys(window.allHouseData[house]).map(function (guestName) {
        var event = window.allHouseData[house][guestName];
        return [
          {
            start: event.start,
            end: event.end,
            title: guestName + ': ' + event.status,
        }];
    }).reduce(function(a,b) { return a.concat(b); });
};

myDataRef2.once("value", function(nameSnapshot) {
    var val = nameSnapshot.val();
    window.allHouseData = val;
});


function isRangeAvailable(calEvents, startDate, endDate) {
    var numDays = (endDate - startDate) / ONE_DAY;
    // foreach day
    var ret = [];
    for(var i = 0; i < numDays; i++) {
        var today = new Date(startDate.getTime() + ONE_DAY * i);
        var dayIsFull = isDayFull(calEvents, today);
        //if (dayIsFull) return false;
        ret.push(dayIsFull);
    }

    return ret;
}

// fuck my life
var onThingyClick = function() {
    var startDate = new Date($("#startDate").val());
    var endDate = new Date($("#endDate").val());
    var property = $("select").val();
    var events = getEventsForHouse(property);

    if (startDate && endDate){
        alert(isRangeAvailable(events, startDate, endDate));
        var rangeOfDays = isRangeAvailable(events, startDate, endDate);
        $(".container").append("<p>" + rangeOfDays + "</p>");
    } else {
        alert('bad input is the only thing that i like');
    }
};
