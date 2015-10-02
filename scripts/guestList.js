var allData = new Firebase("https://inncubator-booking.firebaseio.com");

$(document).ready(function() {
    allData.on("child_added", function(snapshot) {
        var guest = snapshot.val();
        var houseName = guest.location;
        $("#" + houseName).append("<h3 class='btn btn-default'>Name: " + guest.title + "<br>Start: " + guest.start + "<br>End: " + guest.end + "<br>Status: " + guest.status + "<br>Email: " + guest.email + "</h3>");
    });
});
