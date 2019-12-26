"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arkia_1 = require("./services/arkia");
class Routes {
    constructor(app) {
        this.app = app;
        this.init();
    }
    init() {
        // ################## Flight To Eilat ##################
        // Valid request: http://localhost:3001/flight-to-eilat?startDate=12/25/2019&endDate=12/26/2019
        this.app.get('/flight-to-eilat', (req, res) => {
            if (!req.query || !req.query.startDate || !req.query.endDate) {
                return res.json({
                    status: 'error',
                    message: 'Missing query on request.'
                });
            }
            arkia_1.ArkiaService.findFlightsFromNatbagToEilat(req.query.startDate, req.query.endDate)
                .then((flights) => {
                return res.json(flights);
            })
                .catch((err) => {
                return res.json(err);
            });
        });
        // ################## Flight To Natbag ##################
        this.app.get('/flight-to-natbag', (req, res) => {
            if (!req.query || !req.query.startDate || !req.query.endDate) {
                return res.json({
                    status: 'error',
                    message: 'Missing query on request.'
                });
            }
            arkia_1.ArkiaService.findFlightsFromEilatToNatbag(req.query.startDate, req.query.endDate)
                .then((flights) => {
                return res.json(flights);
            })
                .catch((err) => {
                return res.json(err);
            });
        });
        // ################## ROUTE NOT FOUND ##################
        this.app.use((req, res, next) => {
            const error = { message: "Route not found", status: 404 };
            next(error);
        });
        this.app.use((error, req, res, next) => {
            res.status(error.status || 500);
            res.json({
                status: 'error',
                message: error.message
            });
            next();
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYmFja2VuZC9zcmMvcm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNENBQThDO0FBRzlDLE1BQU0sTUFBTTtJQUVSLFlBQW9CLEdBQWdCO1FBQWhCLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFDaEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJO1FBQ0Esd0RBQXdEO1FBQ3hELCtGQUErRjtRQUMvRixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQU8sRUFBRTtZQUNsRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQzFELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDWixNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQUUsMkJBQTJCO2lCQUN2QyxDQUFDLENBQUM7YUFDTjtZQUNELG9CQUFZLENBQUMsNEJBQTRCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQzVFLElBQUksQ0FBQyxDQUFDLE9BQWlCLEVBQUUsRUFBRTtnQkFDeEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDWCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztRQUVILHlEQUF5RDtRQUV6RCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQU8sRUFBRTtZQUNuRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQzFELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDWixNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQUUsMkJBQTJCO2lCQUN2QyxDQUFDLENBQUM7YUFDTjtZQUNELG9CQUFZLENBQUMsNEJBQTRCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQzVFLElBQUksQ0FBQyxDQUFDLE9BQWlCLEVBQUUsRUFBRTtnQkFDeEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDWCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztRQUVILHdEQUF3RDtRQUV4RCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1lBQzdELE1BQU0sS0FBSyxHQUFHLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQTBDLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7WUFDekcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3pCLENBQUMsQ0FBQztZQUNILElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFFTyx3QkFBTSJ9