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

const mockFlights = [{"price":109,"destination":"אילת רמון","departure":"נתבג","flightNumber":805,"date":"20191228","arrivalTime":"18:35","departureTime":"17:35","carrier":"Arkia"},{"price":129,"destination":"אילת רמון","departure":"נתבג","flightNumber":845,"date":"20191228","arrivalTime":"20:00","departureTime":"19:00","carrier":"Arkia"},{"price":129,"destination":"אילת רמון","departure":"נתבג","flightNumber":1807,"date":"20191228","arrivalTime":"22:30","departureTime":"21:30","carrier":"Arkia"},{"price":129,"destination":"אילת רמון","departure":"נתבג","flightNumber":801,"date":"20191228","arrivalTime":"15:30","departureTime":"14:30","carrier":"Arkia"},{"price":189,"destination":"אילת רמון","departure":"נתבג","flightNumber":1845,"date":"20191228","arrivalTime":"21:30","departureTime":"20:30","carrier":"Arkia"},{"price":199,"destination":"אילת רמון","departure":"נתבג","flightNumber":1807,"date":"20191230","arrivalTime":"22:00","departureTime":"21:00","carrier":"Arkia"},{"price":199,"destination":"אילת רמון","departure":"נתבג","flightNumber":823,"date":"20191230","arrivalTime":"17:20","departureTime":"16:20","carrier":"Arkia"},{"price":209,"destination":"אילת רמון","departure":"נתבג","flightNumber":841,"date":"20191228","arrivalTime":"13:30","departureTime":"12:30","carrier":"Arkia"},{"price":209,"destination":"אילת רמון","departure":"נתבג","flightNumber":843,"date":"20191228","arrivalTime":"17:15","departureTime":"16:15","carrier":"Arkia"},{"price":219,"destination":"אילת רמון","departure":"נתבג","flightNumber":825,"date":"20191230","arrivalTime":"16:20","departureTime":"15:20","carrier":"Arkia"},{"price":239,"destination":"אילת רמון","departure":"נתבג","flightNumber":821,"date":"20191230","arrivalTime":"19:30","departureTime":"18:30","carrier":"Arkia"},{"price":239,"destination":"אילת רמון","departure":"נתבג","flightNumber":1805,"date":"20191230","arrivalTime":"20:30","departureTime":"19:30","carrier":"Arkia"},{"price":249,"destination":"אילת רמון","departure":"נתבג","flightNumber":2821,"date":"20191229","arrivalTime":"07:05","departureTime":"06:05","carrier":"Arkia"},{"price":259,"destination":"אילת רמון","departure":"נתבג","flightNumber":801,"date":"20191230","arrivalTime":"07:30","departureTime":"06:30","carrier":"Arkia"},{"price":259,"destination":"אילת רמון","departure":"נתבג","flightNumber":827,"date":"20191230","arrivalTime":"18:10","departureTime":"17:10","carrier":"Arkia"},{"price":299,"destination":"אילת רמון","departure":"נתבג","flightNumber":1815,"date":"20191230","arrivalTime":"15:00","departureTime":"14:00","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":803,"date":"20191230","arrivalTime":"09:00","departureTime":"08:00","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":1805,"date":"20191229","arrivalTime":"22:15","departureTime":"21:15","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":803,"date":"20191229","arrivalTime":"08:40","departureTime":"07:40","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":807,"date":"20191229","arrivalTime":"09:30","departureTime":"08:30","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":807,"date":"20191230","arrivalTime":"10:30","departureTime":"09:30","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":811,"date":"20191230","arrivalTime":"12:05","departureTime":"11:05","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":5803,"date":"20191230","arrivalTime":"13:30","departureTime":"12:30","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":815,"date":"20191229","arrivalTime":"11:30","departureTime":"10:30","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":805,"date":"20191229","arrivalTime":"12:45","departureTime":"11:45","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":819,"date":"20191229","arrivalTime":"14:40","departureTime":"13:40","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":821,"date":"20191229","arrivalTime":"15:25","departureTime":"14:25","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":801,"date":"20191229","arrivalTime":"08:10","departureTime":"07:10","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":1817,"date":"20191229","arrivalTime":"19:05","departureTime":"18:05","carrier":"Arkia"},{"price":372,"destination":"אילת רמון","departure":"נתבג","flightNumber":1815,"date":"20191229","arrivalTime":"15:55","departureTime":"14:55","carrier":"Arkia"}]

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
