var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import './style/index.scss';
import { flightPageTemplate } from './pages/flight-page';
import { DateService } from "./services/date.service";
import { FlightService } from "./services/flight.service";
import { FlightTableService } from "./services/flight.table.service";
// init();
var getDateElement = document.getElementById('search-button');
var resultsTableHeaders = document.querySelectorAll('.results-header');
var resultsTableBodyToEilat = document.querySelector('.results-container-to-eilat .results-body');
var resultsTableBodyToNatbag = document.querySelector('.results-container-to-natbag .results-body');
getDateElement.addEventListener('click', function () { return searchFlights(); });
var picker = DateService.createHebrewDateRangePicker();
var mockFlights = [{ "price": 109, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 805, "date": "20191228", "arrivalTime": "18:35", "departureTime": "17:35", "carrier": "Arkia" }, { "price": 129, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 845, "date": "20191228", "arrivalTime": "20:00", "departureTime": "19:00", "carrier": "Arkia" }, { "price": 129, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 1807, "date": "20191228", "arrivalTime": "22:30", "departureTime": "21:30", "carrier": "Arkia" }, { "price": 129, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 801, "date": "20191228", "arrivalTime": "15:30", "departureTime": "14:30", "carrier": "Arkia" }, { "price": 189, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 1845, "date": "20191228", "arrivalTime": "21:30", "departureTime": "20:30", "carrier": "Arkia" }, { "price": 199, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 1807, "date": "20191230", "arrivalTime": "22:00", "departureTime": "21:00", "carrier": "Arkia" }, { "price": 199, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 823, "date": "20191230", "arrivalTime": "17:20", "departureTime": "16:20", "carrier": "Arkia" }, { "price": 209, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 841, "date": "20191228", "arrivalTime": "13:30", "departureTime": "12:30", "carrier": "Arkia" }, { "price": 209, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 843, "date": "20191228", "arrivalTime": "17:15", "departureTime": "16:15", "carrier": "Arkia" }, { "price": 219, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 825, "date": "20191230", "arrivalTime": "16:20", "departureTime": "15:20", "carrier": "Arkia" }, { "price": 239, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 821, "date": "20191230", "arrivalTime": "19:30", "departureTime": "18:30", "carrier": "Arkia" }, { "price": 239, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 1805, "date": "20191230", "arrivalTime": "20:30", "departureTime": "19:30", "carrier": "Arkia" }, { "price": 249, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 2821, "date": "20191229", "arrivalTime": "07:05", "departureTime": "06:05", "carrier": "Arkia" }, { "price": 259, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 801, "date": "20191230", "arrivalTime": "07:30", "departureTime": "06:30", "carrier": "Arkia" }, { "price": 259, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 827, "date": "20191230", "arrivalTime": "18:10", "departureTime": "17:10", "carrier": "Arkia" }, { "price": 299, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 1815, "date": "20191230", "arrivalTime": "15:00", "departureTime": "14:00", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 803, "date": "20191230", "arrivalTime": "09:00", "departureTime": "08:00", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 1805, "date": "20191229", "arrivalTime": "22:15", "departureTime": "21:15", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 803, "date": "20191229", "arrivalTime": "08:40", "departureTime": "07:40", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 807, "date": "20191229", "arrivalTime": "09:30", "departureTime": "08:30", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 807, "date": "20191230", "arrivalTime": "10:30", "departureTime": "09:30", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 811, "date": "20191230", "arrivalTime": "12:05", "departureTime": "11:05", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 5803, "date": "20191230", "arrivalTime": "13:30", "departureTime": "12:30", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 815, "date": "20191229", "arrivalTime": "11:30", "departureTime": "10:30", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 805, "date": "20191229", "arrivalTime": "12:45", "departureTime": "11:45", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 819, "date": "20191229", "arrivalTime": "14:40", "departureTime": "13:40", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 821, "date": "20191229", "arrivalTime": "15:25", "departureTime": "14:25", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 801, "date": "20191229", "arrivalTime": "08:10", "departureTime": "07:10", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 1817, "date": "20191229", "arrivalTime": "19:05", "departureTime": "18:05", "carrier": "Arkia" }, { "price": 372, "destination": "אילת רמון", "departure": "נתבג", "flightNumber": 1815, "date": "20191229", "arrivalTime": "15:55", "departureTime": "14:55", "carrier": "Arkia" }];
function searchFlights() {
    return __awaiter(this, void 0, void 0, function () {
        var datesObj, flights, tableHeaderString, tableBodyStringToEilat, tableBodyStringToNatbag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    datesObj = getPickerDate();
                    return [4 /*yield*/, FlightService.getFlights(datesObj.startDate, datesObj.endDate)];
                case 1:
                    flights = _a.sent();
                    tableHeaderString = FlightTableService.createTableHeaders(["\u05DE\u05E1' \u05D8\u05D9\u05E1\u05D4", 'כיוון', 'תאריך', 'המראה', 'נחיתה', 'מחיר']);
                    tableBodyStringToEilat = FlightTableService.createTableRows(flights[0]);
                    tableBodyStringToNatbag = FlightTableService.createTableRows(flights[1]);
                    resultsTableHeaders.forEach(function (resultsTableHeader) {
                        resultsTableHeader.innerHTML = tableHeaderString;
                    });
                    resultsTableBodyToEilat.innerHTML = tableBodyStringToEilat;
                    resultsTableBodyToNatbag.innerHTML = tableBodyStringToNatbag;
                    return [2 /*return*/];
            }
        });
    });
}
function getPickerDate() {
    var startDate = picker.getStartDate();
    var endDate = picker.getEndDate();
    return { startDate: DateService.turnDateToMMDDYYYY(startDate), endDate: DateService.turnDateToMMDDYYYY(endDate) };
}
function init() {
    var pageOutletElement = document.querySelector('.page-outlet');
    pageOutletElement.innerHTML = flightPageTemplate;
}
