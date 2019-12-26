export class FlightModel {
    public date: Date;

    constructor(
        public price: number,
        public destination: string,
        public departure: string,
        public flightNumber: number,
        dateStr: string,
        public arrivalTime: string,
        public departureTime: string,
        public carrier: string) {
        this.date = this.formatStringDateIntoDate(dateStr);
    }

    private formatStringDateIntoDate(date: string) { // Input 'YYYYMMDD', Output Date('YYYY-MM-DD')
        const year = date.substr(0, 4);
        const month = date.substr(4, 2);
        const day = date.substr(6, 2);
        return new Date(`${month}/${day}/${year}`);
    }

}
