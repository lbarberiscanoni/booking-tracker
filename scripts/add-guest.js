var fireData = new Firebase("https://booking-example.firebaseio.com");

$(document).ready(function() {
    $("#add").click(function() {
        var property = $("#property").val();
        var guestName = $("#guestName").val();
        var guestLastName = $("#guestLastName").val();
        var guestID = guestName + "-" + guestLastName;
        var startDate = $("#start").val();
        var endDate = $("#end").val();
        var paymentStatus = $("#paymentStatus").val();

        alert("You are about to add " + guestID + " " + "to " + property + " starting on: " + startDate + " and ending on: " + endDate)
        fireData.child(property).child(guestID).set({
           start: startDate,
           end: endDate,
           status: paymentStatus,
        });
    });
});
