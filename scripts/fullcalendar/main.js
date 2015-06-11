//This is for Firebase
var myDataRef = new Firebase("https://blazing-torch-8586.firebaseio.com");
var myDataRef2 = new Firebase("https://booking-example.firebaseio.com");
//myDataRef.set("Let the hacking begin");

//This is where the script starts
var HARDCODED_MAX_EVENT_LIMIT = 0;
var ONE_DAY = 1000 * 3600 * 24;

var updateCalendarOnFirebase = function(newCalEvents) {
    myDataRef.set({events: newCalEvents});
};

var goToHouse = function() {
    houseName = $("select").val();
    location.replace(location.origin + location.pathname + "?house=" + houseName);
}

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

myDataRef2.once("value", function(nameSnapshot) {
    var val = nameSnapshot.val();

    // TODO this is hacky as fuck
    if (location.search) {
        var HOUSE = location.search.substr(7);
    }

    var events = Object.keys(val[HOUSE]).map(function (guestName) {
        var event = val[HOUSE][guestName];
        return [
       // {
       //     start: event.start,
       //     end: event.end,
       //     title: guestName + ': ' + event.status,
       //     rendering: 'background'
       // }, 
        {
            start: event.start,
            end: event.end,
            title: guestName + ': ' + event.status,
            //rendering: 'background'
        }];
    }).reduce(function(a,b) { return a.concat(b); });


    var startOfMonth = new Date('2015-06-01');
    var daysOfMonth = 31;

    for (var i = 0; i < daysOfMonth; i++) {
        var curDay = new Date(startOfMonth.getTime() + i * 3600 * 1000 * 24);
        var isFull = isDayFull(events, curDay);
        if (isFull) {
            if (i < 9) {
                var start = '2015-06-0' + (1 + i);
            } else {
                var start = '2015-06-' + (1 + i);
            }
            if (i < 8) {
                var end = '2015-06-0' + (2 + i);
            } else {
                var end = '2015-06-' + (2 + i);
            }
            var bgEvent = {
                start: start,
                end: end,
                rendering: 'background'
            };
            events.unshift(bgEvent);
        }
    }

    console.log(events);
    initCalendar(events);
});

var initCalendar = function(calendarEvents) {
    $("#calendar").fullCalendar({
        header: {
            left: "prev,next today",
            center: "title",
            right: "month, basicWeek, basicDay"
        },
        editable: true, 
        selectable: true,
        eventLimit: false,
        events: calendarEvents,
        eventDrop: function(event, delta, revertFunc) {
            if (!confirm("Are you sure about this change?")) {
                revertFunc();
            }

            var formattedEvent = {
                start: event.start.format(),
                end: event.end.format(),
                title: event.title
            };
            var staleEvent = calendarEvents.filter(function(e) { return e.title === event.title })[0];
            var idx = calendarEvents.indexOf(staleEvent);
            calendarEvents[idx] = formattedEvent;
            updateCalendarOnFirebase(calendarEvents);
        },
        dayClick: function(date, jsEvent, view) {
            var isFull = isDayFull(calendarEvents, date._d);
            
            //console.log("counted " + todaysEvents.length + " events today");
            //todaysEvents.map(function(e) { console.log(e.title + " is today"); });
            //console.log("================================");

            //alert("There are " + todaysEvents.length + " guests on this day")
            
            if (isFull) {
                $(this).css("background-color", "red");
            } else {
                $(this).css("background-color", "green");
            }
        },
        eventClick: function(event, element) {
            debugger;
            var allCalEvents = calendarEvents;
            var limitForDay = HARDCODED_MAX_EVENT_LIMIT;

            var todaysDate = date._d;
            var todaysEOD = new Date(todaysDate.getTime() + ONE_DAY);

            var todaysEvents = allCalEvents.filter(function(calEvent) {
                var start = new Date(calEvent.start); 
                var end = new Date(calEvent.end);
                return todaysDate >= start && todaysEOD <= end;
            })

            console.log(todaysDate.length);
            event.title = (12 - todaysDate.length).toString();
            $("#calendar").fullCalendar("updateEvent", event);
        },
    });
};
