var FlightModel = /** @class */ (function () {
    function FlightModel(price, destination, departure, flightNumber, dateStr, arrivalTime, departureTime, carrier) {
        this.price = price;
        this.destination = destination;
        this.departure = departure;
        this.flightNumber = flightNumber;
        this.arrivalTime = arrivalTime;
        this.departureTime = departureTime;
        this.carrier = carrier;
        this.date = this.formatStringDateIntoDate(dateStr);
    }
    FlightModel.prototype.formatStringDateIntoDate = function (date) {
        var year = date.substr(0, 4);
        var month = date.substr(4, 2);
        var day = date.substr(6, 2);
        return new Date(month + "/" + day + "/" + year);
    };
    return FlightModel;
}());
export { FlightModel };
