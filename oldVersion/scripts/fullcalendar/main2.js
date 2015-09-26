//This is for Firebase
var calendarData = new Firebase("https://booking-tracker.firebaseio.com");

//This is where the script starts
var ONE_DAY = 1000 * 3600 * 24;


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
        events: "https://booking-tracker.firebaseio.com/.json"
    });
};
