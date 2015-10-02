var fireData = new Firebase("https://inncubator-booking.firebaseio.com");

$(document).ready(function() {
    $("#add").click(function() {
        var property = $("#houseName").val();
        var guestName = $("#guestName").val();
        var guestLastName = $("#guestLastName").val();
        var guestID = guestName + "-" + guestLastName;
        var startDate = $("#start").val();
        var endDate = $("#end").val();
        var paymentStatus = $("#paymentStatus").val();
        var email = $("#email").val();

        alert("You are about to add " + guestID + " " + "to " + property + " starting on: " + startDate + " and ending on: " + endDate)

        fireData.push({
            start: startDate,
            end: endDate,
            title: guestID,
            status: paymentStatus,
            email: email,
            location: property,
        });

        window.location.reload();
    });
});
