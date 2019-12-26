class Flight {
    constructor(private price: number,
                private destination: string,
                private departure: string,
                private flightNumber: number,
                private date: string,
                private arrivalTime: string,
                private departureTime: string,
                private carrier: string) {
    }
}

export {Flight};
