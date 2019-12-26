class DateService {
    public static getDateRangeAsYYYYMMDD(startDate: string | Date, endDate: string | Date): string[] {
        if (typeof startDate === 'string' || typeof endDate === 'string') {
            startDate = new Date(startDate);
            endDate = new Date(endDate);
        }
        const dateRange = this.getDates(startDate, endDate);
        return this.transformDateRangeToArkiaDateString(dateRange);
    }

    public static validateDateString(dateStrings: string[]) {
        return (this.validateDateStringAsMMDDYYYY(dateStrings) && this.validateDateIsMaxTwoMonthsAhead(dateStrings))
    }

    private static getDates(startDate: Date, endDate: Date): Date[] {
        const dateArray = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
            dateArray.push(new Date(currentDate));
            currentDate = this.addDays(currentDate, 1);
        }
        return dateArray;
    }

    private static turnDateToYYYYMMDD(date: Date): string {
        const mm = date.getMonth() + 1; // getMonth() is zero-based
        const dd = date.getDate();

        return [date.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
        ].join('');
    }

    private static addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }

    private static transformDateRangeToArkiaDateString(dateRange: any[]): string[] {
        return dateRange.map((date: Date) => {
            return this.turnDateToYYYYMMDD(date);
        });
    }

    private static validateDateStringAsMMDDYYYY(dateStrings: string[]) {
        let isValid = true;
        dateStrings.forEach((dateString: string) => {
            const dateRegex = new RegExp(/0[1-9]|1[0-2]\/[0-3][0-9]\/[0-9]{2}(?:[0-9]{2})?/y);
            if (!dateRegex.test(dateString)) {
                isValid = false;
            }
        });
        return isValid;
    }

    private static validateDateIsMaxTwoMonthsAhead(dateStrings: string[]) {
        let isValid = true;
        dateStrings.forEach((dateString: string) => {
            const day = new Date(dateString);
            const today = new Date(new Date().setHours(0,0, 0)); // Reset the hours to 00:00
            const todayInMoreTwoMonths = this.addDays(new Date(new Date().setHours(0,0, 0)), 60);
            if (this.checkIfDateBiggerThanOther(today, day) || this.checkIfDateBiggerThanOther(day, todayInMoreTwoMonths)) {
                isValid = false;
            }
        });

        return isValid;
    }

    private static checkIfDateBiggerThanOther = (date1, date2) => {
        return Date.parse(date1) > Date.parse(date2)
    };
}

export {DateService};
