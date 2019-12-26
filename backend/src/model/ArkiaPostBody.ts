class ArkiaPostBody {
    depCityCode: string;
    arrCityCode: string;
    depStationCode: string;
    arrStationCode: string;
    date: string;
    minDateTime: string;

    constructor(date: string, toEilat: boolean) {
        if (toEilat) {
            this.depCityCode = '9';
            this.arrCityCode = '1';
            this.depStationCode = 'tlv';
            this.arrStationCode = null;
        } else {
            this.depCityCode = '1';
            this.arrCityCode = '9';
            this.depStationCode = null;
            this.arrStationCode = "tlv";
        }
        this.date = date;
        this.minDateTime = null;

    }
}

export {ArkiaPostBody};
