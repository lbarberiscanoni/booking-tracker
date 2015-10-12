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
        return "OVERBOOKED: [ " + (limitForDay = todaysEvents.length) + " ] extra people";
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
    var startDate = new Date($("#startDate").val());
    var endDate = new Date($("#endDate").val());
    var property = $("#houseName").val();
    var bookingsForProperty = window.allBookings.filter(function(booking) { 
        return booking.location === property;
    });

    var HARDCODED_MAX_EVENT_LIMIT;
    switch (property) {
        case "aviato":
            HARDCODED_MAX_EVENT_LIMIT = 10;
            break;
        case "berry":
            HARDCODED_MAX_EVENT_LIMIT = 12;
            break;
        case "forest":
            HARDCODED_MAX_EVENT_LIMIT = 12;
            break;
        case "roselane":
            HARDCODED_MAX_EVENT_LIMIT = 10;
            break;
        case "santa-monica":
            HARDCODED_MAX_EVENT_LIMIT = 7;
            break;
        case "webster":
            HARDCODED_MAX_EVENT_LIMIT = 20;
            break;
    }

    if (startDate && endDate){
        var rangeOfDays = isRangeAvailable(bookingsForProperty, startDate, endDate, HARDCODED_MAX_EVENT_LIMIT);
        for (var i = 0; i < rangeOfDays.length; i++) {
            var oneDay = 1000 * 3600 * 24;
            var loopDate = new Date(endDate.getTime() - (i - 1) * oneDay);
            var dateAtThisTime = loopDate.toString().split("2015")[0];
            var dayAtThisTime = dateAtThisTime.split()[1];
            console.log(startDate);
            console.log(endDate);
            console.log(bookingsForProperty);
            console.log(dateAtThisTime);
            $(".container").append("<p>" + dateAtThisTime + " is " + rangeOfDays[i] + "</p>");
        }
    } else {
        alert('bad input bro');
    }
});
