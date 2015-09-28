var allData = new Firebase("https://booking-tracker.firebaseio.com");

$(document).ready(function() {
    //let's get todays date
    var todaysDate = new Date();
    var dd = todaysDate.getDate();
    var mm = todaysDate.getMonth()+1; //January is 0!
    var yyyy = todaysDate.getFullYear();

    if(dd<10) {
            dd='0'+dd
    } 

    if(mm<10) {
            mm='0'+mm
    } 

    todaysDate = yyyy + "-" + mm + '-' + dd;
    
    //let's add guest
    allData.on("child_added", function(snapshot) {
        var houseName = snapshot.key();
        var lol = $(".container").append("<div class='row col-md-6' id='" + houseName + "'><h2>" + houseName + "</h2></div>");
        i = 0;
        allData.child(houseName).on("child_added", function(snapshot) {
            var guest = snapshot.val();
            if (guest.end > todaysDate && guest.start <= todaysDate) {
                i = i + 1
                $("#" + houseName).append("<h3 class='btn btn-default'>Name: " + guest.title + "<br>Start: " + guest.start + "<br>End: " + guest.end + "<br>Status: " + guest.status + "<br>Email: " + guest.email + "</h3>");
                $("#" + houseName + " h2").html(houseName + " [" + i.toString() + "]");
            } else {
                return false;
            };
        });
    });
});
