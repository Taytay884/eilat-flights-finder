import axios from 'axios';

import {DateService} from './date';
import {Flight} from "../model/Flight";
import {ArkiaPostBody} from "../model/ArkiaPostBody";

const ARKIA_URL = 'https://m.arkia.co.il/WebServices/DomesticFlightsService.asmx/GetSearchResults';

class ArkiaService {

    public static findFlightsFromNatbagToEilat(startDate: string, endDate: string): Promise<Flight[]> {
        if (!DateService.validateDateString([startDate, endDate])) {
            return Promise.reject('Dates are invalid!');
        }
        const ArkiaDateRange = DateService.getDateRangeAsYYYYMMDD(startDate, endDate); // ArkiaDateRange is ['20191216', '20191217', '20191218']
        return this.findFlightsOnDateRange(ArkiaDateRange, true);
    }

    public static findFlightsFromEilatToNatbag(startDate: string, endDate: string): Promise<Flight[]> {
        if (!DateService.validateDateString([startDate, endDate])) {
            return Promise.reject('Dates are invalid!');
        }
        const ArkiaDateRange = DateService.getDateRangeAsYYYYMMDD(startDate, endDate); // ArkiaDateRange is ['20191216', '20191217', '20191218']
        return this.findFlightsOnDateRange(ArkiaDateRange, false);
    }

    private static findFlightsOnDateRange(dateRange: string[], toEilat: boolean): Promise<Flight[]> {
        return new Promise((resolve, reject) => {
            const promises = dateRange.map((date: string) => {
                return this.findFlightsOnDate(date, toEilat)
            });
            Promise.all(promises)
                .then((resolvedPromises: Flight[][]) => {
                    const flights = [];
                    // Put the whole flights into the same array.
                    resolvedPromises.forEach((polishedFlights: Flight[]) => {
                        flights.push(...polishedFlights);
                    });
                    // Sort the flights by price.
                    flights.sort((a, b) => {
                        return a.price - b.price;
                    });
                    resolve(flights);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    private static findFlightsOnDate(date: string, toEilat: boolean): Promise<Flight[]> {
        const arkiaPostReqBody = new ArkiaPostBody(date, toEilat);
        return new Promise((resolve, reject) => {
            axios.post(ARKIA_URL, arkiaPostReqBody)
                .then((res) => {
                    const responseData = res.data;
                    const flightsData = responseData.d.Result.Flights.Value;
                    const flights = this.polishFlightData(flightsData);
                    resolve(flights);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    private static polishFlightData(flightsData): Flight[] {
        const flights = [];

        flightsData.forEach((flightData) => {
            const flightPrice = flightData.PRICE;
            flightData.FLIGHTS.Value.forEach((currentFlightData) => {
                currentFlightData.PRICE = flightPrice;
                const flight = new Flight(flightPrice, currentFlightData.ARR_STATION_NAME, currentFlightData.DEP_STATION_NAME, currentFlightData.FLIGHT_NO, currentFlightData.DEP_DATE,
                    currentFlightData.ARR_TIME, currentFlightData.DEP_TIME, 'Arkia');
                flights.push(flight);
            });
        });

        return flights;
    }
}

export {ArkiaService};
