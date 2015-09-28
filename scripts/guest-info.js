var fireData = new Firebase("https://booking-tracker.firebaseio.com");

$(document).ready(function() {
    $("#houseName").change(function() {
        var property = $("#houseName").val();
        var guestList = new Firebase(fireData + "/" + property);

        $("div.row.form-inline").append("<select>" + "</select>");
        $("select:last-of-type").attr("id", "guest");
        $("select:last-of-type").addClass("form-control");

        $("div.row.form-inline").append("<button>" + "Get Guest Info" + "</button>");
        $("button:last").attr("id", "find");
        $("button:last").addClass("btn btn-primary");

        guestList.orderByValue().on("value", function(snapshot) {
            $("select:last-of-type").append("<option>" + "select a guest" + "</option>");
            snapshot.forEach(function(data) {
                guestID = data.key();
                guest = data.val();
                $("select:last-of-type").append("<option>" + guest.title + " [" + guestID + "]" + "</option>");

            });

            $("#find").click(function() {
                //remove duplicates
                $(".container h3").remove();

                var guestNameAndInfo = $("#guest").val();
                var justGuestID = guestNameAndInfo.split(" ")[1];
                var justGuestID_1 = justGuestID.replace("[", "");
                var justGuestID_2 = justGuestID_1.replace("]", "");

                guestList.child(justGuestID_2).on("child_added", function(snapshot) {
                    var parameter = snapshot.key();
                    var guestInfo = snapshot.val();
                    $(".container").append("<h3>" + parameter + ": " + guestInfo + "</h3>");
                });
            });
        });
    });
});


