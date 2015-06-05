var fireData = new Firebase("https://booking-example.firebaseio.com");

$(document).ready(function() {

    $("#property").change(function() {
        var property = $("#property").val();
        var guestList = new Firebase(fireData + "/" + property);

        $("body").append("<select>" + "</select>");
        $("select:last-of-type").attr("id", "guestName");

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

            $("body").append("<select>" + "</select>");
            $("select:last-of-type").attr("id", "guestInfo");

            guestReservation.orderByValue().on("value", function(snapshot) {

                $("select").append("<option>" + "select a option" + "</option>");

                snapshot.forEach(function(data) {
                    guestInfo = data.key();
                    $("#guestInfo").append("<option>" + guestInfo + "</option>");
                });
            });

            $("#guestInfo").change(function() {

               var guestInfo = $("#guestInfo").val();

               $("body").append("<input>" + "</input>");
               $("input").attr("type", "text");
               $("input").attr("placeholder", "enter new " + guestInfo);
               $("input").attr("id", "dataChange");
                
               $("body").append("<input>" + "</input>");
               $("input:last-of-type").attr("type", "button");
               $("input:last-of-type").attr("value", "submit change");
               $("input:last-of-type").attr("id", "submitChange");

               $("#submitChange").click(function() {

                   var property = $("#property").val();
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
