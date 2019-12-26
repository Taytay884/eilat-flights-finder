"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arkia_1 = require("./services/arkia");
class Routes {
    constructor(app) {
        this.app = app;
        this.init();
    }
    init() {
        this.app.get('/', (req, res) => {
            return res.send(__dirname + '/frontend/dist');
        });
        // ################## Flight To Eilat ##################
        // Valid request: http://localhost:3001/flight-to-eilat?startDate=12/25/2019&endDate=12/26/2019
        this.app.get('/flight-to-eilat', (req, res) => {
            console.log('Request', req);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDRDQUE4QztBQUc5QyxNQUFNLE1BQU07SUFFUixZQUFvQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQVUsRUFBRTtZQUN0RCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFFSCx3REFBd0Q7UUFDeEQsK0ZBQStGO1FBQy9GLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBTyxFQUFFO1lBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDMUQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNaLE1BQU0sRUFBRSxPQUFPO29CQUNmLE9BQU8sRUFBRSwyQkFBMkI7aUJBQ3ZDLENBQUMsQ0FBQzthQUNOO1lBQ0Qsb0JBQVksQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDNUUsSUFBSSxDQUFDLENBQUMsT0FBaUIsRUFBRSxFQUFFO2dCQUN4QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNYLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUgseURBQXlEO1FBRXpELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBTyxFQUFFO1lBQ25FLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDMUQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNaLE1BQU0sRUFBRSxPQUFPO29CQUNmLE9BQU8sRUFBRSwyQkFBMkI7aUJBQ3ZDLENBQUMsQ0FBQzthQUNOO1lBQ0Qsb0JBQVksQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDNUUsSUFBSSxDQUFDLENBQUMsT0FBaUIsRUFBRSxFQUFFO2dCQUN4QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNYLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUgsd0RBQXdEO1FBRXhELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7WUFDN0QsTUFBTSxLQUFLLEdBQUcsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBMEMsRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtZQUN6RyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUM7WUFDaEMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDTCxNQUFNLEVBQUUsT0FBTztnQkFDZixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87YUFDekIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQUVPLHdCQUFNIn0=