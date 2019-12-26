import { FlightModel } from "../models/flight.model";
var axios = require('axios').default;
var defaultUrl = '';
var FlightService = /** @class */ (function () {
    function FlightService() {
    }
    FlightService.getFlights = function (startDate, endDate) {
        var _this = this;
        var promises = [];
        promises.push(axios.get(defaultUrl + "/flight-to-eilat", { params: { startDate: startDate, endDate: endDate } })
            .then(function (res) {
            var flights = res.data;
            return _this.polishFlights(flights);
        })
            .catch(function (err) {
            return err;
        }));
        promises.push(axios.get(defaultUrl + "/flight-to-natbag", { params: { startDate: startDate, endDate: endDate } })
            .then(function (res) {
            var flights = res.data;
            return _this.polishFlights(flights);
        })
            .catch(function (err) {
            return err;
        }));
        return Promise.all(promises);
    };
    FlightService.polishFlights = function (flights) {
        return flights.map(function (flight) {
            return new FlightModel(flight.price, flight.destination, flight.departure, flight.flightNumber, flight.date, flight.arrivalTime, flight.departureTime, flight.carrier);
        });
    };
    return FlightService;
}());
export { FlightService };
