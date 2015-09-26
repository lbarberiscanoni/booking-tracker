var fireData = new Firebase("https://booking-tracker.firebaseio.com");

$(document).ready(function() {
    $("#houseName").change(function() {
        var property = $("#houseName").val();

        $("div.row.form-inline").append("<select id='guestName' class='form-control'>" + "</select>");
        $("select").append("<option>" + "select a guest" + "</option>");

        fireData.child(property).on("child_added", function(snapshot) {
            guest = snapshot.val(); 
            guestName = guest.title;
            $("select").append("<option>" + guestName + "</option>");
        });

        $("#guestName").change(function() {
            $("div.row.form-inline").append("<select id='guestInfo' class='form-control'></select>");
            $("#guestInfo").append("<option>select guest info</option>");
            $("#guestInfo").append("<option>start</option>");
            $("#guestInfo").append("<option>end</option>");
            $("#guestInfo").append("<option>status</option>");

            $("#guestInfo").change(function() {
                var guestInfo = $("#guestInfo").val();
                switch (guestInfo) {
                    case "start":
                        $("div.row.form-inline").append("<input type='date' class='form-control'>");
                        $("div.row.form-inline").append("<button class='btn btn-primary' id='submit'> Submit");
                        break;
                    case "end":
                        $("div.row.form-inline").append("<input type='date' class='form-control'>");
                        $("div.row.form-inline").append("<button class='btn btn-primary' id='submit'> Submit");
                        break;
                    case "status":
                        $("div.row.form-inline").append("<input type='text' placeholder='enter owed amount' class='form-control'>");
                        $("div.row.form-inline").append("<button class='btn btn-primary' id='submit'> Submit");
                        break;
                };
            });
        });
   });
});
