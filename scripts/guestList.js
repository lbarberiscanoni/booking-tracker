var allData = new Firebase("https://inncubator-booking.firebaseio.com");

$(document).ready(function() {
    var todaysDate = new Date();
    todaysDate = todaysDate.getTime();

    $("#direction").change(function() {
        $(".container .row .row h3").remove();
        var direction = $("#direction").val();
        if (direction == "Current") {
            console.log(todaysDate);
            allData.on("child_added", function(snapshot) {
                var guest = snapshot.val();
                var endDate = new Date(guest.end);
                console.log(endDate);
                console.log(endDate.getTime());
                var startDate = new Date(guest.start);
                var guestLocation = guest.location;
                if (startDate.getTime() < todaysDate) {
                    if (todaysDate < endDate.getTime()) {
                        $("#" + guestLocation).append("<h3 class='btn btn-default'>Name: " + guest.title + "<br>Start: " + guest.start + "<br>End: " + guest.end + "<br>Status: " + guest.status + "<br>Email: " + guest.email + "</h3>");
                    };
                };
            });
        } else if (direction == "Future") {
            console.log(todaysDate);
            allData.on("child_added", function(snapshot) {
                var guest = snapshot.val();
                var endDate = new Date(guest.end);
                console.log(endDate);
                console.log(endDate.getTime());
                var startDate = new Date(guest.start);
                var guestLocation = guest.location;
                if (startDate.getTime() > todaysDate) {
                    $("#" + guestLocation).append("<h3 class='btn btn-default'>Name: " + guest.title + "<br>Start: " + guest.start + "<br>End: " + guest.end + "<br>Status: " + guest.status + "<br>Email: " + guest.email + "</h3>");
                };
            });
        } else {
        };
    });
});
