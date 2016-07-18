var fireData = new Firebase("https://inncubator-booking.firebaseio.com")

$(document).ready(function() {
    $("#edit").click(function() {
        var editView = $(this).text();
        if (editView == "Edit Guest Info") {
            $(this).text("Confirm Changes");
            //firt let's get the current data to mae it the default
            var currentLocation = $("#location").text();
            var currentStart = $("#start").text();
            var currentEnd = $("#end").text();
            var currentStatus = $("#status").text();
            var currentEmail = $("#email").text();

            //next let's make all the parameters editable
            //let's start with the property list
            var listOfProperties = ["berry", "casterly-rock", "forest", "kings", "webster", "webster-girls-room", "webster-private", "left-early"];
            var indexOfDefaultProperty = listOfProperties.indexOf(currentLocation);
            listOfProperties.splice(indexOfDefaultProperty, 1); 
            $("#location").html("<select id='location'><option>" + currentLocation + "</option></select>");
            for (var i = 0; i < listOfProperties.length; i++) {
                $("select#location").append("<option>" + listOfProperties[i] + "</option>");
            };

            //next let's do the start and end dates
            $("#start").html("<input type='date' value='" + currentStart + "' id='start'>");
            $("#end").html("<input type='date' value='" + currentEnd + "' id='end'>");

            //last let's do status
            var statusOptions = ["paid", "owes 1 month"];
            var indexOfCurrentStatus = statusOptions.indexOf(currentStatus);
            statusOptions.splice(indexOfCurrentStatus, 1);
            $("#status").html("<select id='status'><option>" + currentStatus +"</option><option>" + statusOptions[0] + "</option>");

            //let's do email
            $("#email").html("<input type='text' id='email' value='" + currentEmail + "'></input>");
        } else if (editView == "Confirm Changes") {
            var guestID = $("#guestID").text();
            var newLocation = $("select#location").val();
            var newStart = $("input#start").val();
            var newEnd = $("input#end").val();
            var newStatus = $("select#status").val();
            var newEmail = $("input#email").val();

            fireData.child(guestID).update({
                start: newStart,
                end: newEnd,
                status: newStatus,
                location: newLocation,
                email: newEmail,
            });
            alert("success");
            window.location.reload();
        } else {
            console.log("error during amendment. only 2 views possible");
        };
    });
});
