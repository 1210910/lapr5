import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import passageway from './routes/PassagewayRoute';
import room from './routes/RoomRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	building(app);
	passageway(app);
	room(app);
	
	return app
}