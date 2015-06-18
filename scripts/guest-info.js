var fireData = new Firebase("https://booking-example.firebaseio.com")

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
                guestName = data.key();
                $("select:last-of-type").append("<option>" + guestName + "</option>");
            });
        });

        $("#find").click(function() {
            var guest = $("#guest").val();
            var guestData = new Firebase(guestList + "/" + guest);

            guestData.orderByValue().on("value", function(snapshot) {
                snapshot.forEach(function(data) {
                    guestInfo = data.key() + " : " + data.val();
                    $("div.container").append("<h3>" + guestInfo + "</h3>");
                });
            });
        });
    });
});


