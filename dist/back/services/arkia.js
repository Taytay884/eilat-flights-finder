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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJraWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9iYWNrZW5kL3NyYy9zZXJ2aWNlcy9hcmtpYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUUxQixpQ0FBbUM7QUFDbkMsNENBQXVDO0FBQ3ZDLDBEQUFxRDtBQUVyRCxNQUFNLFNBQVMsR0FBRyxnRkFBZ0YsQ0FBQztBQUVuRyxNQUFNLFlBQVk7SUFFUCxNQUFNLENBQUMsNEJBQTRCLENBQUMsU0FBaUIsRUFBRSxPQUFlO1FBQ3pFLElBQUksQ0FBQyxrQkFBVyxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUU7WUFDdkQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDL0M7UUFDRCxNQUFNLGNBQWMsR0FBRyxrQkFBVyxDQUFDLHNCQUFzQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLHlEQUF5RDtRQUN4SSxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVNLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxTQUFpQixFQUFFLE9BQWU7UUFDekUsSUFBSSxDQUFDLGtCQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRTtZQUN2RCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUMvQztRQUNELE1BQU0sY0FBYyxHQUFHLGtCQUFXLENBQUMsc0JBQXNCLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMseURBQXlEO1FBQ3hJLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU8sTUFBTSxDQUFDLHNCQUFzQixDQUFDLFNBQW1C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