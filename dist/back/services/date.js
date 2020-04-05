"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateService {
    static getDateRangeAsYYYYMMDD(startDate, endDate) {
        if (typeof startDate === 'string' || typeof endDate === 'string') {
            startDate = new Date(startDate);
            endDate = new Date(endDate);
        }
        const dateRange = this.getDates(startDate, endDate);
        return this.transformDateRangeToArkiaDateString(dateRange);
    }
    static validateDateString(dateStrings) {
        return (this.validateDateStringAsMMDDYYYY(dateStrings) && this.validateDateIsMaxTwoMonthsAhead(dateStrings));
    }
    static getDates(startDate, endDate) {
        const dateArray = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
            dateArray.push(new Date(currentDate));
            currentDate = this.addDays(currentDate, 1);
        }
        return dateArray;
    }
    static turnDateToYYYYMMDD(date) {
        const mm = date.getMonth() + 1; // getMonth() is zero-based
        const dd = date.getDate();
        return [date.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
        ].join('');
    }
    static addDays(date, days) {
        date.setDate(date.getDate() + days);
        return date;
    }
    static transformDateRangeToArkiaDateString(dateRange) {
        return dateRange.map((date) => {
            return this.turnDateToYYYYMMDD(date);
        });
    }
    static validateDateStringAsMMDDYYYY(dateStrings) {
        let isValid = true;
        dateStrings.forEach((dateString) => {
            const dateRegex = new RegExp(/0[1-9]|1[0-2]\/[0-3][0-9]\/[0-9]{2}(?:[0-9]{2})?/y);
            if (!dateRegex.test(dateString)) {
                isValid = false;
            }
        });
        return isValid;
    }
    static validateDateIsMaxTwoMonthsAhead(dateStrings) {
        let isValid = true;
        dateStrings.forEach((dateString) => {
            const day = new Date(dateString);
            const today = new Date(new Date().setHours(0, 0, 0)); // Reset the hours to 00:00
            const todayInMoreTwoMonths = this.addDays(new Date(new Date().setHours(0, 0, 0)), 60);
            if (this.checkIfDateBiggerThanOther(today, day) || this.checkIfDateBiggerThanOther(day, todayInMoreTwoMonths)) {
                isValid = false;
            }
        });
        return isValid;
    }
}
exports.DateService = DateService;
DateService.checkIfDateBiggerThanOther = (date1, date2) => {
    return Date.parse(date1) > Date.parse(date2);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2JhY2tlbmQvc3JjL3NlcnZpY2VzL2RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFdBQVc7SUFDTixNQUFNLENBQUMsc0JBQXNCLENBQUMsU0FBd0IsRUFBRSxPQUFzQjtRQUNqRixJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDOUQsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQjtRQUNELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELE9BQU8sSUFBSSxDQUFDLG1DQUFtQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSxNQUFNLENBQUMsa0JBQWtCLENBQUMsV0FBcUI7UUFDbEQsT0FBTyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsK0JBQStCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtJQUNoSCxDQUFDO0lBRU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFlLEVBQUUsT0FBYTtRQUNsRCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQzVCLE9BQU8sV0FBVyxJQUFJLE9BQU8sRUFBRTtZQUMzQixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVP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