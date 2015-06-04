var fireData = new Firebase("https://booking-example.firebaseio.com")

$(document).ready(function() {
    $("#find").click(function() {
        var property = $("#property").val();
        var guest = $("#guest").val();
        var guestData = new Firebase(fireData + "/" + property + "/" + guest)
        guestData.orderByValue().on("value", function(snapshot) {
            snapshot.forEach(function(data) {
                guestInfo = data.key() + ": " + data.val();
                $("body").append("<p>" + guestInfo + "</p>");
            });
        });
    });
});


