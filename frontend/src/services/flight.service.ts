import {FlightInterface} from "../interfaces/flight.interface";
import {FlightModel} from "../models/flight.model";

const axios = require('axios').default;

const defaultUrl = '';

export class FlightService {
    static getFlights(startDate: string, endDate: string) {
        const promises = [];
        promises.push(axios.get(`${defaultUrl}/flight-to-eilat`, {params: {startDate, endDate}})
            .then((res: any) => {
                const flights: FlightInterface[] = res.data;
                return this.polishFlights(flights);
            })
            .catch((err: Error) => {
                return err;
            }));
        promises.push(axios.get(`${defaultUrl}/flight-to-natbag`, {params: {startDate, endDate}})
            .then((res: any) => {
                const flights: FlightInterface[] = res.data;
                return this.polishFlights(flights);
            })
            .catch((err: Error) => {
                return err;
            }));
        return Promise.all(promises);
    }

    private static polishFlights(flights: FlightInterface[]) {
        return flights.map(flight => {
            return new FlightModel(flight.price, flight.destination, flight.departure, flight.flightNumber, flight.date,
                            flight.arrivalTime, flight.departureTime, flight.carrier);
        });
    }
}
