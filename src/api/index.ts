import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import floor from './routes/floorRoute';
import building from './routes/buildingRoute';
import passageway from './routes/PassagewayRoute';
import room from './routes/RoomRoute';
import robotTypeRoute from './routes/robotTypeRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	floor(app);
	robotTypeRoute(app);
	building(app);
	passageway(app);
	room(app);
	
	return app
}