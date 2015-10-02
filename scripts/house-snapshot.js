var allData = new Firebase("https://inncubator-booking.firebaseio.com");

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
        var guestInfo = snapshot.val();
        var houseName = guestInfo.location;
        if (guestInfo.end > todaysDate && guestInfo.start <= todaysDate) {
            $("#" + houseName).append("<h3 class='btn btn-default'>Name: " + guestInfo.title + "<br>Start: " + guestInfo.start + "<br>End: " + guestInfo.end + "<br>Status: " + guestInfo.status + "<br>Email: " + guestInfo.email + "</h3>");
            var numOfGuests = $("#" + houseName).children().length - 1;
            $("#" + houseName + " h2").html(houseName + " [" + numOfGuests.toString() + "]");
        } else {
            return false;
        };
    });
});
