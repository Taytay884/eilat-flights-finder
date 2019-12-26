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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJraWFQb3N0Qm9keS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9BcmtpYVBvc3RCb2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxhQUFhO0lBUWYsWUFBWSxJQUFZLEVBQUUsT0FBZ0I7UUFDdEMsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjthQUFNO1lBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUU1QixDQUFDO0NBQ0o7QUFFTyxzQ0FBYSJ9