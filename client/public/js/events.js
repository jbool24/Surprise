$(document).ready(function() {
    var page = window.location.pathname;
    if (page === "/events") {
        listEvents();
    }
});

function listEvents() {
    var baseurl = window.location.origin;
    var url = baseurl + "/events/all";
    
    $.ajax({method: "GET", url: url, contentType: "application/json; charset=utf-8"}).done(function(data) {
        var events = data.events;
        var tableBody = $('.table-data');
        var tableData = $('<td>');

        tableBody.empty();

        events.forEach(function(event, idx) {
            var tableRow = $('<tr>');
            var formatedDateTime = moment(event.eventDateTime).format('MM/DD/YYYY h:mm a');
            var tableData = `<td>${event.eventName}</td><td>${formatedDateTime}</td><td>${event.eventOfferDuration}</td><td>${event.eventDescription}</td>`

            //adds idx as id attribute
            tableRow.attr('id', idx);

            tableBody.append(tableRow)
            $('#' + idx).append(tableData);
        });
    });

}
