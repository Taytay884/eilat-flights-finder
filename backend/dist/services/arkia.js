"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const date_1 = require("./date");
const Flight_1 = require("../model/Flight");
const ArkiaPostBody_1 = require("../model/ArkiaPostBody");
const ARKIA_URL = 'https://m.arkia.co.il/WebServices/DomesticFlightsService.asmx/GetSearchResults';
class ArkiaService {
    static findFlightsFromNatbagToEilat(startDate, endDate) {
        if (!date_1.DateService.validateDateString([startDate, endDate])) {
            return Promise.reject('Dates are invalid!');
        }
        const ArkiaDateRange = date_1.DateService.getDateRangeAsYYYYMMDD(startDate, endDate); // ArkiaDateRange is ['20191216', '20191217', '20191218']
        return this.findFlightsOnDateRange(ArkiaDateRange, true);
    }
    static findFlightsFromEilatToNatbag(startDate, endDate) {
        if (!date_1.DateService.validateDateString([startDate, endDate])) {
            return Promise.reject('Dates are invalid!');
        }
        const ArkiaDateRange = date_1.DateService.getDateRangeAsYYYYMMDD(startDate, endDate); // ArkiaDateRange is ['20191216', '20191217', '20191218']
        return this.findFlightsOnDateRange(ArkiaDateRange, false);
    }
    static findFlightsOnDateRange(dateRange, toEilat) {
        return new Promise((resolve, reject) => {
            const promises = dateRange.map((date) => {
                return this.findFlightsOnDate(date, toEilat);
            });
            Promise.all(promises)
                .then((resolvedPromises) => {
                const flights = [];
                // Put the whole flights into the same array.
                resolvedPromises.forEach((polishedFlights) => {
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
            });
        });
    }
    static findFlightsOnDate(date, toEilat) {
        const arkiaPostReqBody = new ArkiaPostBody_1.ArkiaPostBody(date, toEilat);
        return new Promise((resolve, reject) => {
            axios_1.default.post(ARKIA_URL, arkiaPostReqBody)
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
    static polishFlightData(flightsData) {
        const flights = [];
        flightsData.forEach((flightData) => {
            const flightPrice = flightData.PRICE;
            flightData.FLIGHTS.Value.forEach((currentFlightData) => {
                currentFlightData.PRICE = flightPrice;
                const flight = new Flight_1.Flight(flightPrice, currentFlightData.ARR_STATION_NAME, currentFlightData.DEP_STATION_NAME, currentFlightData.FLIGHT_NO, currentFlightData.DEP_DATE, currentFlightData.ARR_TIME, currentFlightData.DEP_TIME, 'Arkia');
                flights.push(flight);
            });
        });
        return flights;
    }
}
exports.ArkiaService = ArkiaService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJraWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYXJraWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFFMUIsaUNBQW1DO0FBQ25DLDRDQUF1QztBQUN2QywwREFBcUQ7QUFFckQsTUFBTSxTQUFTLEdBQUcsZ0ZBQWdGLENBQUM7QUFFbkcsTUFBTSxZQUFZO0lBRVAsTUFBTSxDQUFDLDRCQUE0QixDQUFDLFNBQWlCLEVBQUUsT0FBZTtRQUN6RSxJQUFJLENBQUMsa0JBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFO1lBQ3ZELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsTUFBTSxjQUFjLEdBQUcsa0JBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyx5REFBeUQ7UUFDeEksT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTSxNQUFNLENBQUMsNEJBQTRCLENBQUMsU0FBaUIsRUFBRSxPQUFlO1FBQ3pFLElBQUksQ0FBQyxrQkFBVyxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUU7WUFDdkQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDL0M7UUFDRCxNQUFNLGNBQWMsR0FBRyxrQkFBVyxDQUFDLHNCQUFzQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLHlEQUF5RDtRQUN4SSxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVPLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxTQUFtQixFQUFFLE9BQWdC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