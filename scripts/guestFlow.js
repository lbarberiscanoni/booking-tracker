var listOfReservations = new Firebase("https://inncubator-booking.firebaseio.com");

$(document).ready(function() {
    $("#flowDirection").change(function() {
        $(".property").empty();
        var flowDirection = $("#flowDirection").val();
        
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

        //let's populate the interface
        if (flowDirection == "Check INs") {
            listOfReservations.orderByChild("start").on("child_added", function(snapshot) {
                guest = snapshot.val();
                if (guest.start == todaysDate) {
                    $("#" + guest.location).append("<h3 class='btn btn-default'>" + guest.title + "</h3>");
                    var numOfGuests = $("#" + guest.location).children().length;
                    $("#" + guest.location).parent().find("h2").html("<h2>" + guest.location + " [" + numOfGuests.toString() + "]</h2>");
                    console.log(guest.title);
                };
            });
        } else if (flowDirection == "Check OUTs") {
            listOfReservations.orderByChild("end").on("child_added", function(snapshot) {
                guest = snapshot.val();
                if (guest.end == todaysDate) {
                    $("#" + guest.location).append("<h3 class='btn btn-default'>" + guest.title + "</h3>");
                    var numOfGuests = $("#" + guest.location).children().length;
                    $("#" + guest.location).parent().find("h2").html("<h2>" + guest.location + " [" + numOfGuests.toString() + "]</h2>");
                    console.log(guest.title);
                };
            });
        } else {
            alert("Only INs and OUts are options");
        };
    });
});
