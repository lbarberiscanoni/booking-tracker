$(document).ready(function() {
    $("#houseName").change(function() {
        $("#guestList").empty();
        var property = $("#houseName").val();
        var urlToList = "http://lbarberiscanoni.github.io/inncubator-cal/" + property + "/guestFlow.html";
        $("#guestList").append("<div class='col-md-4'></div><iframe src='" + urlToList + "' class='col-md-4' height='500px'></iframe><div class='col-md-4'></div>");
    });
});
