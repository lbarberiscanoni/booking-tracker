var fireData = new Firebase("https://booking-tracker.firebaseio.com");

$(document).ready(function() {
    $("#houseName").change(function() {
        var property = $("#houseName").val();
        var houseData = new Firebase(fireData + "/" + property);

        $("div.row.form-inline").append("<select id='guestName' class='form-control'>" + "</select>");
        $("select").append("<option>" + "select a guest" + "</option>");

        houseData.on("child_added", function(snapshot) {
            guestID = snapshot.key();
            guest = snapshot.val(); 
            $("select").append("<option>" + guest.title + " [" + guestID + "]" + "</option>");
        });

        $("#guestName").change(function() {
            $("div.row.form-inline").append("<select id='guestInfo' class='form-control'></select>");
            $("#guestInfo").append("<option>select guest info</option>");
            $("#guestInfo").append("<option>start</option>");
            $("#guestInfo").append("<option>end</option>");
            $("#guestInfo").append("<option>status</option>");
            $("#guestInfo").append("<option>email</option>");

            $("#guestInfo").change(function() {
                var guestInfo = $("#guestInfo").val();
                var thisGuestID = $("#guestName").val().split(" ")[1].replace("[", "").replace("]", "");

                var updateGuestInfo = function() {
                    $("div.row.form-inline").append("<input type='date' class='form-control' id='change'>");
                    $("div.row.form-inline").append("<button class='btn btn-primary' id='submit'>Submit</button>");
                    $("#change").change(function() {
                        var newData = $("#change").val();
                        window.newData = newData;
                    });
                };

                switch (guestInfo) {
                    case "start":
                        updateGuestInfo();
                        $("#submit").click(function() {
                            houseData.child(thisGuestID).update({
                                "start": newData,
                            });
                            alert("success");
                            window.location.reload();
                        });
                        break;
                    case "end":
                        updateGuestInfo();
                        $("#submit").click(function() {
                            houseData.child(thisGuestID).update({
                                "end": newData,
                            });
                            alert("success");
                            window.location.reload();
                        });
                        break;
                    case "status":
                        updateGuestInfo();
                        $("#submit").click(function() {
                            houseData.child(thisGuestID).update({
                                "status": newData,
                            });
                            alert("success");
                            window.location.reload();
                        });
                        break;
                    case "email":
                        updateGuestInfo();
                        $("#submit").click(function() {
                            houseData.child(thisGuestID).update({
                                "email": newData,
                            });
                            alert("success");
                            window.location.reload();
                        });
                        break;
                };
            });
        });
   });
});
