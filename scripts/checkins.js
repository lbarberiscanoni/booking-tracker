var listOfReservations = new Firebase("https://inncubator-booking.firebaseio.com");

$(document).ready(function() {
    $(".property").empty();
    
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
    console.log(month);

    //let's figure out 3 days from now
    var threeDaysFromNow = new Date(todaysDate);
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    var dd = threeDaysFromNow.getDate();
    var mm = threeDaysFromNow.getMonth() + 1;
    var yy = threeDaysFromNow.getFullYear();
    if (mm < 10) {
        var mm = "0".concat(mm.toString());
        window.mm = mm;
    };
    if (dd < 10) {
        var dd = "0".concat(dd.toString());
        window.dd = dd;
    };
    threeDaysFromNowFormatted = yy.toString() + "-" + mm.toString() + "-" + dd.toString();


    var showGuestsCheckingIn = function(a, b) {
        //let's populate the interface
        listOfReservations.orderByChild("start").on("child_added", function(snapshot) {
            guest = snapshot.val();
            console.log(guest.name + " " + guest.start);
            guestStartDate = guest.start;
            guestStartDate = guestStartDate.split("-");
            guestStartDate = new Date(parseInt(guestStartDate[0]), parseInt(guestStartDate[1]) - 1, parseInt(guestStartDate[2]));
            guestStartDateFormatted = guestStartDate.toString().split(" ", 3).join(" ");        
            todaysDate = a;
            todaysDate = todaysDate.split("-");
            todaysDate = new Date(parseInt(todaysDate[0]), parseInt(todaysDate[1]) - 1, parseInt(todaysDate[2]));
            threeDaysFromNowFormatted = b;
            threeDaysFromNowFormatted = new Date(threeDaysFromNowFormatted);

            //notify of checkins today
            if (todaysDate.toString() == guestStartDate.toString()) {
                alert(guest.title + " is checking IN today!");
            };

            //color code guest names based on when they are checkin in
            if (todaysDate <= guestStartDate) {
                if (guestStartDate <= threeDaysFromNowFormatted) {
                    if (guestStartDate.toString().split(" ", 4).join(" ") == todaysDate.toString().split(" ", 4).join(" ")) {
                        $("#" + guest.location).append("<h3 class='btn btn-default' style='background-color: red; color: white;'>" + guest.title + "<br>" + guestStartDateFormatted + "</h3>");
                        var numOfGuests = $("#" + guest.location).children().length;
                        $("#" + guest.location).parent().find("h2").html("<h2>" + guest.location + " [" + numOfGuests.toString() + "]</h2>");
                        console.log(guest.title);
                    } else {
                        $("#" + guest.location).append("<h3 class='btn btn-default' style='background-color: green; color: white;'>" + guest.title + "<br>" + guestStartDateFormatted + "</h3>");
                        var numOfGuests = $("#" + guest.location).children().length;
                        $("#" + guest.location).parent().find("h2").html("<h2>" + guest.location + " [" + numOfGuests.toString() + "]</h2>");
                        console.log(guest.title);
                    };
                };
            } else {
                console.log("not in the date range");
            };
        });
    };

    showGuestsCheckingIn(todaysDate, threeDaysFromNowFormatted);
});
