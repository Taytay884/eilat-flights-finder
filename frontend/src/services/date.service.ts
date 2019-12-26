// @ts-ignore
import {LitepickerType} from 'litepicker';

const Litepicker = require("litepicker");

export class DateService {
    static createHebrewDateRangePicker(): LitepickerType {
        return new Litepicker({
            element: document.getElementById('datepicker'),
            firstDay: 0,
            lang: 'he-IL',
            format: 'DD/MM/YYYY',
            lockDaysFormat: 'DD/MM/YYYY',
            bookedDaysFormat: 'YYYY-MM-DD',
            minDate: new Date(),
            maxDate: new Date().setMonth(new Date().getMonth() + 2),
            buttonText: {
                apply: 'החל',
                cancel: 'ביטול',
                previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',
                nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>'
            },
            tooltipText: {
                one: 'יום',
                other: 'ימים'
            },
            scrollToDate: true,
            mobileFriendly: true,
            autoApply: true,
            showTooltip: true,
            singleMode: false,
            selectForward: true,
            isRtl: true,
        });
    }

    static turnDateToMMDDYYYY(date: Date): string {
        let day = date.getDate();
        let month = date.getMonth() + 1; //Months are zero based
        let year = date.getFullYear();
        return [(month > 9 ? '' : '0') + month, (day > 9 ? '' : '0') + day, year].join('/');
    }
}
