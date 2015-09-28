var allData = new Firebase("https://booking-tracker.firebaseio.com/");

var ONE_DAY = 1000 * 3600 * 24;

var isDayFull = function(allCalEvents, todaysDate) {
    var limitForDay = HARDCODED_MAX_EVENT_LIMIT;

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

allData.once("value", function(nameSnapshot) {
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

$("#rangeCheck").click(function() {
    var startDate = new Date($("#startDate").val());
    var endDate = new Date($("#endDate").val());
    var property = $("#houseName").val();
    switch (property) {
        case "aviato":
            var HARDCODED_MAX_EVENT_LIMIT = 10;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "berry":
            var HARDCODED_MAX_EVENT_LIMIT = 12;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "forest":
            var HARDCODED_MAX_EVENT_LIMIT = 12;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "roselane":
            var HARDCODED_MAX_EVENT_LIMIT = 10;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "santa-monica":
            var HARDCODED_MAX_EVENT_LIMIT = 10;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
        case "webster":
            var HARDCODED_MAX_EVENT_LIMIT = 20;
            window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
            break;
    }
    var events = getEventsForHouse(property);

    if (startDate && endDate){
        var rangeOfDays = isRangeAvailable(events, startDate, endDate);
        for (var i = 0; i < rangeOfDays.length; i++) {
            var oneDay = 1000 * 3600 * 24;
            var loopDate = new Date(endDate.getTime() - (i - 1) * oneDay);
            var dateAtThisTime = loopDate.toString().split("2015")[0];
            var dayAtThisTime = dateAtThisTime.split()[1];
            console.log(startDate);
            console.log(endDate);
            console.log(events);
            console.log(dateAtThisTime);
            $(".container").append("<p>" + dateAtThisTime + " is " + rangeOfDays[i] + "</p>");
        }
    } else {
        alert('bad input is the only thing that i like');
    }
});
