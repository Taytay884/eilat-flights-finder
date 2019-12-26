import {Application, NextFunction, Request, Response} from "express";
import {ArkiaService} from "./services/arkia";
import {Flight} from "./model/Flight";

class Routes {

    constructor(private app: Application) {
        this.init();
    }

    init() {
        this.app.get('/', (req: Request, res: Response): Object => {
            return res.send(__dirname + '/frontend/dist');
        });

        // ################## Flight To Eilat ##################
        // Valid request: http://localhost:3001/flight-to-eilat?startDate=12/25/2019&endDate=12/26/2019
        this.app.get('/flight-to-eilat', (req: Request, res: Response): any => {
            console.log('Request', req);
            if (!req.query || !req.query.startDate || !req.query.endDate) {
                return res.json({
                    status: 'error',
                    message: 'Missing query on request.'
                });
            }
            ArkiaService.findFlightsFromNatbagToEilat(req.query.startDate, req.query.endDate)
                .then((flights: Flight[]) => {
                    return res.json(flights);
                })
                .catch((err) => {
                    return res.json(err);
                });
        });

        // ################## Flight To Natbag ##################

        this.app.get('/flight-to-natbag', (req: Request, res: Response): any => {
            if (!req.query || !req.query.startDate || !req.query.endDate) {
                return res.json({
                    status: 'error',
                    message: 'Missing query on request.'
                });
            }
            ArkiaService.findFlightsFromEilatToNatbag(req.query.startDate, req.query.endDate)
                .then((flights: Flight[]) => {
                    return res.json(flights);
                })
                .catch((err) => {
                    return res.json(err);
                });
        });

        // ################## ROUTE NOT FOUND ##################

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const error = {message: "Route not found", status: 404};
            next(error);
        });

        this.app.use((error: { message: string; status: number }, req: Request, res: Response, next: NextFunction) => {
            res.status(error.status || 500);
            res.json({
                status: 'error',
                message: error.message
            });
            next();
        });
    }
}

export {Routes};
