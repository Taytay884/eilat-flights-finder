"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArkiaPostBody {
    constructor(date, toEilat) {
        if (toEilat) {
            this.depCityCode = '9';
            this.arrCityCode = '1';
            this.depStationCode = 'tlv';
            this.arrStationCode = null;
        }
        else {
            this.depCityCode = '1';
            this.arrCityCode = '9';
            this.depStationCode = null;
            this.arrStationCode = "tlv";
        }
        this.date = date;
        this.minDateTime = null;
    }
}
exports.ArkiaPostBody = ArkiaPostBody;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJraWFQb3N0Qm9keS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2JhY2tlbmQvc3JjL21vZGVsL0Fya2lhUG9zdEJvZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLGFBQWE7SUFRZixZQUFZLElBQVksRUFBRSxPQUFnQjtRQUN0QyxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQzlCO2FBQU07WUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBRTVCLENBQUM7Q0FDSjtBQUVPLHNDQUFhIn0=