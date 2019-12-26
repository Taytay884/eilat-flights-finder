import './style/index.scss';
import {flightPageTemplate} from './pages/flight-page'
import {DateService} from "./services/date.service";
import {FlightService} from "./services/flight.service";
import {FlightTableService} from "./services/flight.table.service";

// init();
const getDateElement = document.getElementById('search-button');
const resultsTableHeaders = document.querySelectorAll('.results-header');
const resultsTableBodyToEilat = document.querySelector('.results-container-to-eilat .results-body');
const resultsTableBodyToNatbag = document.querySelector('.results-container-to-natbag .results-body');
getDateElement.addEventListener('click', () => searchFlights());

let picker = DateService.createHebrewDateRangePicker();

async function searchFlights() {
    const datesObj = getPickerDate();
    // const flights = await FlightService.getFlights(datesObj.startDate, datesObj.endDate);
    const flights = await FlightService.getFlights(datesObj.startDate, datesObj.endDate);
    const tableHeaderString = FlightTableService.createTableHeaders([`מס' טיסה`, 'כיוון', 'תאריך', 'המראה', 'נחיתה', 'מחיר']);
    const tableBodyStringToEilat = FlightTableService.createTableRows(flights[0]);
    const tableBodyStringToNatbag = FlightTableService.createTableRows(flights[1]);
    resultsTableHeaders.forEach((resultsTableHeader) => {
        resultsTableHeader.innerHTML = tableHeaderString;
    });
    resultsTableBodyToEilat.innerHTML = tableBodyStringToEilat;
    resultsTableBodyToNatbag.innerHTML = tableBodyStringToNatbag;
}

function getPickerDate(): {startDate: string, endDate: string} {
    const startDate: Date = picker.getStartDate();
    const endDate: Date = picker.getEndDate();
    return {startDate: DateService.turnDateToMMDDYYYY(startDate), endDate: DateService.turnDateToMMDDYYYY(endDate)}
}

function init(): void {
    const pageOutletElement = document.querySelector('.page-outlet');
    pageOutletElement.innerHTML = flightPageTemplate;
}
