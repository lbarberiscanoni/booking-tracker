// holy jesus  what the fuck (gosh abdul is so dumb)
$("#houseName").change(function() {
    var houseName = $("#houseName").val();

    if (houseName == "webster") {
        var HARDCODED_MAX_EVENT_LIMIT = 18;
    } else if (houseName == "forest") {
        var HARDCODED_MAX_EVENT_LIMIT = 12;
    } else if (houseName == "oasis") {
        var HARDCODED_MAX_EVENT_LIMIT = 10;
    } else if (houseName == "aviato") {
        var HARDCODED_MAX_EVENT_LIMIT = 10;
    } else if (houseName == "brannan") {
        var HARDCODED_MAX_EVENT_LIMIT = 14;
    } else if (houseName == "berry") {
        var HARDCODED_MAX_EVENT_LIMIT = 10;
    } else {
        var HARDCODED_MAX_EVENT_LIMIT = 0;
    };
});


var ONE_DAY = 1000 * 3600 * 24;
var myDataRef2 = new Firebase("https://booking-tracker.firebaseio.com");

var isDayFull = function(allCalEvents, todaysDate) {
    var limitForDay = HARDCODED_MAX_EVENT_LIMIT;

    var todaysEOD = new Date(todaysDate.getTime() + ONE_DAY);

    var todaysEvents = allCalEvents.filter(function(calEvent) {
       var start = new Date(calEvent.start); 
       var end = new Date(calEvent.end);
       return todaysDate >= start && todaysEOD <= end;
    });

    if (todaysEvents.length > limitForDay) {
        return "AVAILABLE with [ " + (todaysEvents.length - limitForDay) + " ] spots open";
    } else if (todaysEvents.length == limitForDay) {
        return "FULLY BOOKED";
    } else {
        return "OVERBOOKED: [ " + (limitForDay = todaysEvents.length) + " ] extra people";
    };
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

var onThingyClick = function() {
    var startDate = new Date($("#startDate").val());
    var endDate = new Date($("#endDate").val());
    var property = $("select").val();
    var events = getEventsForHouse(property);

    if (startDate && endDate){
        var rangeOfDays = isRangeAvailable(events, startDate, endDate);
        for (var i = 0; i < rangeOfDays.length; i++) {
            var oneDay = 1000 * 3600 * 24;
            var loopDate = new Date(startDate.getTime() - (i - 1) * oneDay);
            var dateAtThisTime = loopDate.toString().split("2015")[0];
            var dayAtThisTime = dateAtThisTime.split()[1];
            console.log(dateAtThisTime);
            $(".container").append("<p>" + dateAtThisTime + " is " + rangeOfDays[i] + "</p>");
        }
    } else {
        alert('bad input is the only thing that i like');
    }
};
