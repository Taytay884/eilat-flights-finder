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
