var FlightTableService = /** @class */ (function () {
    function FlightTableService() {
    }
    FlightTableService.createTableHeaders = function (headers) {
        var thElements = headers.map(function (header) {
            return "<th>" + header + "</th>";
        });
        var thElementsAsString = thElements.join('');
        return "<tr>" + thElementsAsString + "</tr>";
    };
    FlightTableService.createTableRows = function (flights) {
        var rows = flights.map(function (flight) {
            return [flight.flightNumber, flight.departure + " --> " + flight.destination, flight.date.toLocaleDateString(), flight.departureTime, flight.arrivalTime, flight.price];
        });
        var readyRows = rows.map(function (row) {
            var flightRow = row.map(function (flightDetail) {
                return "<td>" + flightDetail + "</td>";
            }).join('');
            return "<tr>" + flightRow + "</tr>";
        });
        return readyRows.join('');
    };
    return FlightTableService;
}());
export { FlightTableService };
