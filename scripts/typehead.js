var guestList = new Firebase("https://inncubator-booking.firebaseio.com");

var allGuests = [];
guestList.on("child_added", function(snapshot) {
    var guestInfo = snapshot.val();
    var guestName = guestInfo.title.replace(" ", "").toLowerCase();
    if (allGuests.indexOf(guestName) == -1) {
        allGuests.push(guestName);
        console.log(allGuests);
    };
});

var getInfo = function(a) {
    var guestSearched = a.toString();
    
    guestList.on("child_added", function(snapshot) {
        person = snapshot.val();
        personID = snapshot.key();
        personName = person.title.replace(" ", "").toLowerCase();

        if (personName == guestSearched) {
            $("#message").html("<h2 class='text-center'>" + guestSearched + "</h2><div class='col-md-4'></div><div class='col-md-4'><table class='table table-bordered'><tr><td>Location</td><td class='amendable' id='location'>" + person.location + "</td><tr><td>Start</td><td class='amendable' id='start'>" + person.start + "</td></tr><tr><td>End</td><td class='amendable' id='end'>" + person.end + "</td></tr><tr><td>Status</td><td class='amendable' id='status'>" + person.status + "</td></tr><tr><td>ID</td><td id='guestID'>" + personID + "</td></tr></table></div><div class='col-md-4'></div>");
        };
    });
};

$("#search-form").autocomplete({
        hints: allGuests,
        width: 300,
        height: 30,
        onSubmit: function(text){
            getInfo(text);
        }
});
