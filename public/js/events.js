function listEvents() {
    var baseurl = window.location.origin;

    $.ajax({
        type: "GET",
        url: baseurl + "events/all",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            var events = data.events;
            var eventslist = $('events-target');
            var listItem = $('<li>');

            eventslist.empty();
            events.forEach(function(event) {
              listItem.
              eventslist.append()
            })

            //   $.each(msg.d, function (index, obj) { let row = "
            //         <tr>" + "
            //         <td>" + obj.eventName + "</td>" + "
            //         <td>" + obj.eventDateTime + "</td>" + "
            //         <td>" + obj.eventOfferDuration + "</td>" + "
            //         <td>" + obj.eventDescription + "</td>" + "
            //         <td>" + obj.eventActive + "</td>" + "
            //         </tr>"
            // });
        }
    });
}
