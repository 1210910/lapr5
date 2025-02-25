import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import floor from './routes/floorRoute';
import building from './routes/buildingRoute';
import passageway from './routes/PassagewayRoute';
import room from './routes/RoomRoute';
import robot from './routes/robotRoute';
import robotTypeRoute from './routes/robotTypeRoute';
import floorMapRoute from './routes/floorMapRoute';
import lift from './routes/liftRoute';
import vigilanceTaskRoute from "./routes/vigilanceTaskRoute";
import deliveryTaskRoute from "./routes/deliveryTaskRoute";
import taskRequestRoute from './routes/taskRequestRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	floor(app);
	robot(app);
	robotTypeRoute(app);
	building(app);
	passageway(app);
	room(app);
	floorMapRoute(app);
	vigilanceTaskRoute(app);
	deliveryTaskRoute(app);
	taskRequestRoute(app);

	
	lift(app);

	return app
}