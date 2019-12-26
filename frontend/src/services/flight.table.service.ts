import {FlightModel} from "../models/flight.model";

export class FlightTableService {
    static createTableHeaders(headers: string[]) {
        const thElements = headers.map((header) => {
            return `<th>${header}</th>`
        });
        const thElementsAsString = thElements.join('');
        return `<tr>${thElementsAsString}</tr>`;
    }

    static createTableRows(flights: FlightModel[]) {
        const rows = flights.map((flight: FlightModel) => {
            return [flight.flightNumber, `${flight.departure} --> ${flight.destination}`, flight.date.toLocaleDateString(), flight.departureTime, flight.arrivalTime, flight.price];
        });
        const readyRows = rows.map((row: any) => {
            const flightRow = row.map((flightDetail: any) => {
                return `<td>${flightDetail}</td>`
            }).join('');
            return `<tr>${flightRow}</tr>`;
        });
        return readyRows.join('');

    }
}
