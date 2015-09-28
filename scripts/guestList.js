var allData = new Firebase("https://booking-tracker.firebaseio.com");

$(document).ready(function() {
    allData.on("child_added", function(snapshot) {
        var houseName = snapshot.key();
        var lol = $(".container").append("<div class='row' id='" + houseName + "'><h2>" + houseName + "</h2></div>");
        allData.child(houseName).on("child_added", function(snapshot) {
            var guest = snapshot.val();
            $("#" + houseName).append("<h3 class='btn btn-default'>Name: " + guest.title + "<br>Start: " + guest.start + "<br>End: " + guest.end + "<br>Status: " + guest.status + "<br>Email: " + guest.email + "</h3>");
        });
    });
});
