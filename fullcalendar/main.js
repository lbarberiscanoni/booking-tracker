//This is for Firebase
var myDataRef = new Firebase("https://blazing-torch-8586.firebaseio.com");
//myDataRef.set("Let the hacking begin");

//This is where the script starts
var HARDCODED_MAX_EVENT_LIMIT = 2;
var ONE_DAY = 1000 * 3600 * 24;

//var HARDCODED_EVENTS = [
//    {
//        title: "Event 1",
//        start: "2015-06-29",
//        end: "2015-06-30"
//    },
//    {
//        title: "Event 2",
//        start: "2015-06-29",
//        end: "2015-06-30"
//    },
//    {
//        title: "Event 3",
//        start: "2015-06-29",
//        end: "2015-06-30"
//    },
//    {
//        title: "Event 4",
//        start: "2015-06-29",
//        end: "2015-06-30"
//    },
//    {
//        title: "Event 5",
//        start: "2015-06-29",
//        end: "2015-06-30"
//    },
//    {
//        title: "Event 6",
//        start: "2015-06-29",
//        end: "2015-06-30"
//    },
//    {
//        title: "Event 7",
//        start: "2015-06-29",
//        end: "2015-06-30"
//    },
//    {
//        title: "Event 8",
//        start: "2015-06-29",
//        end: "2015-06-30"
//    },
//    {
//        title: "Event 9",
//        start: "2015-06-29",
//        end: "2015-06-30"
//    },
//    {
//        title: "Event 10",
//        start: "2015-06-29",
//        end: "2015-06-31"
//    },
//    {
//        title: "Event 11",
//        start: "2015-06-15",
//        end: "2015-06-17"
//    },
//    {
//        title: "Event 12",
//        start: "2015-06-16",
//        end: "2015-06-17"
//    },
//    {
//        title: "Event 13",
//        start: "2015-06-17",
//        end: "2015-06-19"
//    },
//    {
//        title: "Event 14",
//        start: "2015-06-10",
//        end: "2015-06-19"
//    },
//];

var updateCalendarOnFirebase = function(newCalEvents) {
    myDataRef.set({events: newCalEvents});
};

myDataRef.once('value', function(nameSnapshot) {
    var val = nameSnapshot.val();
    console.log(val)
    initCalendar(val.events);
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
        dayClick: function(date) {
            alert("Clicked on: " + date.format());
        },
        dayClick: function(date, jsEvent, view) {
            var allCalEvents = calendarEvents;
            var limitForDay = HARDCODED_MAX_EVENT_LIMIT;

            var todaysDate = date._d;
            var todaysEOD = new Date(todaysDate.getTime() + ONE_DAY);

            var todaysEvents = allCalEvents.filter(function(calEvent) {
               var start = new Date(calEvent.start); 
               var end = new Date(calEvent.end);
               return todaysDate >= start && todaysEOD <= end;
            });
            
            console.log('counted ' + todaysEvents.length + ' events today');
            todaysEvents.map(function(e) { console.log(e.title + ' is today'); });
            console.log('================================');
            
            if (todaysEvents.length > limitForDay) {
                $(this).css("background-color", "red");
            } else {
                $(this).css("background-color", "green");
            }
        },
        select: function(start, end, jsEvent, view) {
            alert("Selected " + start.format() + end.format())
            $(this).css("background-color", "red");
        }
    });
};
