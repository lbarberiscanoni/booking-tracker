var allData = new Firebase("https://inncubator-booking.firebaseio.com");

var ONE_DAY = 1000 * 3600 * 24;

var isDayFull = function(allCalEvents, todaysDate, limitForDay) {
    var todaysEOD = new Date(todaysDate.getTime() + ONE_DAY);

    var todaysEvents = allCalEvents.filter(function(calEvent) {
       var start = new Date(calEvent.start); 
       var end = new Date(calEvent.end);
       return todaysDate >= start && todaysEOD <= end;
    });

    if (todaysEvents.length < limitForDay) {
        return "AVAILABLE with [ " + (todaysEvents.length - limitForDay) * -1 + " ] spots open";
    } else if (todaysEvents.length == limitForDay) {
        return "FULLY BOOKED";
    } else {
        return "OVERBOOKED: [ " + (todaysEvents.length - limitForDay) + " ] extra people";
    };
}

var getEventsForHouse = function(house) {
    return Object.keys(window.allBookings[house]).map(function (guestName) {
        var event = window.allBookings[house][guestName];
        return [
          {
            start: event.start,
            end: event.end,
            title: guestName + ': ' + event.status,
        }];
    }).reduce(function(a,b) { return a.concat(b); });
};

allData.once("value", function(nameSnapshot) {
    var val = nameSnapshot.val();
    // transform to a regular array
    window.allBookings = Object.keys(val).map(function(key) { return val[key] });
});


function isRangeAvailable(calEvents, startDate, endDate, maxLimit) {
    var numDays = (endDate - startDate) / ONE_DAY;
    
    // foreach day
    var ret = [];
    for(var i = 0; i < numDays; i++) {
        var today = new Date(startDate.getTime() + ONE_DAY * i);
        var dayIsFull = isDayFull(calEvents, today, maxLimit);
        //if (dayIsFull) return false;
        ret.push(dayIsFull);
    }

    return ret;
}

$("#rangeCheck").click(function() {
    $("#resultList").empty();
    var startDate = new Date($("#startDate").val());
    var startDate = new Date(startDate.getTime() - ONE_DAY);
    var endDate = new Date($("#endDate").val());
    var property = $("#houseName").val();
    var bookingsForProperty = window.allBookings.filter(function(booking) { 
        return booking.location === property;
    });

    var HARDCODED_MAX_EVENT_LIMIT;
    switch (property) {
        case "new-york":
            var HARDCODED_MAX_EVENT_LIMIT = 1;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "berry":
            var HARDCODED_MAX_EVENT_LIMIT = 10;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "kings":
            var HARDCODED_MAX_EVENT_LIMIT = 10;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "forest":
            var HARDCODED_MAX_EVENT_LIMIT = 12;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "roselane":
            var HARDCODED_MAX_EVENT_LIMIT = 6;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "roselane-coed":
            var HARDCODED_MAX_EVENT_LIMIT = 4;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "santa-monica":
            var HARDCODED_MAX_EVENT_LIMIT = 1;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "webster":
            var HARDCODED_MAX_EVENT_LIMIT = 16;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "webster-girls-room":
            var HARDCODED_MAX_EVENT_LIMIT = 4;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
        case "casterly-rock":
            var HARDCODED_MAX_EVENT_LIMIT = 8;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
        case "stanford-inn":
            var HARDCODED_MAX_EVENT_LIMIT = 12;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
    }

    if (startDate && endDate) {
        console.log(property);
        console.log(HARDCODED_MAX_EVENT_LIMIT);
        var rangeOfDays = isRangeAvailable(bookingsForProperty, startDate, endDate, HARDCODED_MAX_EVENT_LIMIT);
        var j = 0;
        for (var i = rangeOfDays.length - 1; i >= 0; i--) {
            var oneDay = 1000 * 3600 * 24;
            var loopDate = new Date(endDate.getTime() - (i - 1) * oneDay);
            var dateAtThisTime = loopDate.toString().split("2015")[0];
            var dayAtThisTime = dateAtThisTime.split(" ")[1];
            $("#resultList").append("<h4 class='text-center'>" + dateAtThisTime + " is " + rangeOfDays[j] + "</h4>");
            var j = j + 1;
        }
    } else {
        alert('bad input bro');
    }
});
