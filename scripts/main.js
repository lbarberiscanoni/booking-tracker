var allData = new Firebase("https://inncubator-booking.firebaseio.com");

$(document).ready(function() {


    //let's get today's date in order to make it the default
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    if (month < 10) {
        var month = "0".concat(month.toString());
        window.month = month;
    };
    var day = today.getDate();
    if (day < 10) {
        var day = "0".concat(day.toString());
        window.day = day;
    };
    var todaysDate = year.toString() + "-" + month.toString() + "-" + day.toString();

    //rendering the calendar with the appropriate data
    var initCalendar = function(guestList) {
        $("#calendar").remove();
        $("body").append("<div id='calendar'></div>");
        $("#calendar").fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            defaultDate: todaysDate,
            editable: false,
            //what this is about to do is ugly af but Dan really wanted to just see the numbers
            eventLimit: 1, // allow "more" link when too many events
            events: guestList,
            dayClick: function(date) {
                var thisDate = date.format();
                var allEvents = $("#calendar").fullCalendar("clientEvents");
                var eventsOnDay = [];
                var loopCount = 0
                for (var i = 0; i < allEvents.length; i++) {
                    var thisEvent = allEvents[i];
                    loopCount = loopCount + 1;

                    if (thisEvent.start._i <= thisDate && thisEvent.end._i > thisDate) {
                        eventsOnDay.push(thisEvent);
                    };

                    if (loopCount == allEvents.length) {
                        var property = $("#houseName").val();
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
                                var HARDCODED_MAX_EVENT_LIMIT = 14;
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
                                break;
                            case "webster-private":
                                var HARDCODED_MAX_EVENT_LIMIT = 1;
                                window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
                                break;
                            case "casterly-rock":
                                var HARDCODED_MAX_EVENT_LIMIT = 8;
                                window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
                            case "stanford-inn":
                                var HARDCODED_MAX_EVENT_LIMIT = 12;
                                window.HARDCODED_MAX_EVENT_LIMIT = HARDCODED_MAX_EVENT_LIMIT;
                        }
                        
                        alert(eventsOnDay.length + " guests on this day");
                        //make the day red in case of overbooking 
                        if (eventsOnDay.length > HARDCODED_MAX_EVENT_LIMIT) {
                            $(this).css("background-color", "red");
                        } else if (eventsOnDay.length == HARDCODED_MAX_EVENT_LIMIT) {
                            $(this).css("background-color", "yellow");
                        };
                    };
                };
            }
        });
    };

    allData.once("value", function(nameSnapshot) {
        var val = nameSnapshot.val();
        // transform to a regular array
        window.allBookings = Object.keys(val).map(function(key) { return val[key] });
    });

    $("#houseName").change(function() {
        var houseSelected = $("#houseName").val();
        var guestList = window.allBookings.filter(function(a) { return a.location === houseSelected; });
        initCalendar(guestList);
    });
});
