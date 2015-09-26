var fireData = new Firebase("https://booking-tracker.firebaseio.com");

$(document).ready(function() {

    $("#houseName").change(function() {
        var property = $("#houseName").val();
        var guestList = new Firebase(fireData + "/" + property);

        $("div.row.form-inline").append("<select>" + "</select>");
        $("select:last-of-type").attr("id", "guestName");
        $("select:last-of-type").addClass("form-control");

        guestList.orderByValue().on("value", function(snapshot) {

            $("select").append("<option>" + "select a guest" + "</option>");

            snapshot.forEach(function(data) {
                guestName = data.key(); 
                $("select").append("<option>" + guestName + "</option>");
            });
        });

        $("#guestName").change(function() {
            var guestName = $("#guestName").val();
            var guestReservation = new Firebase(fireData + "/" + property + "/" + guestName);

            $("div.row.form-inline").append("<select>" + "</select>");
            $("select:last-of-type").attr("id", "guestInfo");
            $("select:last-of-type").addClass("form-control");

            guestReservation.orderByValue().on("value", function(snapshot) {

                $("select").append("<option>" + "select a option" + "</option>");

                snapshot.forEach(function(data) {
                    guestInfo = data.key();
                    $("#guestInfo").append("<option>" + guestInfo + "</option>");
                });
            });

            $("#guestInfo").change(function() {

               var guestInfo = $("#guestInfo").val();

               $("div.row.form-inline").append("<input>" + "</input>");
               
               if (guestInfo == "start" || guestInfo == "end") {
                   $("input").attr("type", "date");
               } else {
                   $("input").attr("placeholder", "enter new " + guestInfo);
               };

               $("input").attr("id", "dataChange");
               $("input:last").addClass("form-control");
                
               $("div.row.form-inline").append("<button>" + "Submit Change" + "</button>");
               $("button").attr("id", "submitChange");
               $("button").addClass("btn btn-primary");

               $("#submitChange").click(function() {

                   var property = $("#houseName").val();
                   var guestName = $("#guestName").val();
                   var firstPath = fireData.child(property)
                   var guestInfo = $("#guestInfo").val();
                   var change = $("#dataChange").val();
                
                   alert("You are changing the [" + guestInfo + "] of [" + guestName + "] to [" + change + "]");

                   if (guestInfo == "start") {
                       firstPath.child(guestName).update({
                           start: change
                       });
                   } else if (guestInfo == "end") {
                       firstPath.child(guestName).update({
                           end: change
                       });
                    } else if (guestInfo == "status") {
                       firstPath.child(guestName).update({
                           status: change
                       });
                    } else {
                        alert("ERROR!!!!")
                    }
                });
            });
        });
   });
});
