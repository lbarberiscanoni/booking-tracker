var fireData = new Firebase("https://inncubator-booking.firebaseio.com");

$(document).ready(function() {
    $("#add").click(function() {
        var property = $("#houseName").val();
        var guestName = $("#guestName").val();
        var guestLastName = $("#guestLastName").val();
        var guestID = guestName + "-" + guestLastName;
        guestID = guestID.toLowerCase();
        var startDate = $("#start").val();
        var endDate = $("#end").val();
        var paymentStatus = $("#paymentStatus").val();
        var email = $("#email").val();


        fireData.once("value", function(snapshot) {
            var totalNumberOfGuests = snapshot.numChildren();
            var arrayOfGuestsToCompareAgainst = [];
            fireData.on("child_added", function(snapshot) {
                guestLoopedThrough = snapshot.val();
                guestLoopedThroughName = guestLoopedThrough.title;
                arrayOfGuestsToCompareAgainst.push(guestLoopedThroughName.toLowerCase());
                if (arrayOfGuestsToCompareAgainst.length == totalNumberOfGuests) {
                    console.log(arrayOfGuestsToCompareAgainst);
                    if (arrayOfGuestsToCompareAgainst.indexOf(guestID) > 0) {
                        alert("this guest is already in the system");
                        var duplicateGuestInfo = "<!DOCTYPE html><head></head><body><h1>" + guestLoopedThrough.title + "</h1><h3>" + guestLoopedThrough.location + "</h3><h3>" + guestLoopedThrough.start + "</h3><h3>" + guestLoopedThrough.end + "</h3><h3>" + guestLoopedThrough.status + "</h3></body>";
                        var displayPage = window.open();
                        displayPage.document.write(duplicateGuestInfo);
                    } else {;
                        fireData.push({
                            start: startDate,
                            end: endDate,
                            title: guestID,
                            status: paymentStatus,
                            email: email,
                            location: property,
                        });
                        alert("You are about to add " + guestID + " " + "to " + property + " starting on: " + startDate + " and ending on: " + endDate)
                        window.location.reload();
                    };
                };
            });
        });

    });
});
