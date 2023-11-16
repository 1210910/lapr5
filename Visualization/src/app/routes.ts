import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FloorDetailsComponent} from './Floor/details/details.component';
import { LoginComponent } from './login/login.component';
import { BuildingComponent } from './Building/building.component';
import {BuildingCreateComponent} from "./Building/buildingCreate.component";
import {BuildingListComponent} from "./Building/buildingList.component";
import {BuildingEditComponent} from "./Building/buildingEdit.component";
import {FloorComponent} from "./Floor/floor.component";
import {FloorCreateComponent} from "./Floor/floorCreate.component";
import {FloorListComponent} from "./Floor/floorList.component";
import {FloorEditComponent} from "./Floor/floorEdit.component";
import {LiftComponent} from "./Lift/lift.component";
import {LiftCreateComponent} from "./Lift/liftCreate.component";
import {LiftEditComponent} from "./Lift/liftEdit.component";
import {LiftListComponent} from "./Lift/liftList.component";
import {PassagewayComponent} from "./PassageWay/passageway.component";
import {RoomComponent} from "./Room/room.component";
import {PassagewayCreateComponent} from "./PassageWay/passagewayCreate.component";
import {PassagewayListComponent} from "./PassageWay/passagewayList.component";
import {PassagewayEditComponent} from "./PassageWay/passagewayEdit.component";
import {RoomCreateComponent} from "./Room/roomCreate.component";
import {RoomEditComponent} from "./Room/roomEdit.component";
import {RoomListComponent} from "./Room/roomList.component";
import {BuildingDetailsComponent} from "./Building/details/details.component";
import {AboutUsComponent} from "./AboutUs/aboutUs.component";
import { RobotComponent } from "./Robot/robot.component";
import { RobotCreateComponent } from "./Robot/robotCreate.component";
import { PassagewayDetailsComponent } from "./PassageWay/details/details.component";
import {HomeFleetComponent} from "./home/homeFleet.component";
import {RobotTypeComponent} from "./RobotType/robotType.component";
import {RobotTypeCreateComponent} from "./RobotType/robotTypeCreate.component";
import {CampusComponent} from "./campus/campus.component";
import {LoadMapComponent} from "./campus/loadMap.component";
import {RobotEnableDisableComponent} from "./Robot/robotEnableDisable.component"


const routeConfig: Routes = [
  {
    path:'',
    component: LoginComponent,
    title: 'Login page'
  },
  {
    path:"campus",
    component: CampusComponent,
    title: 'Campus page'

  },
  {
    path:"loadMap",
    component: LoadMapComponent,
    title: 'Load Map page'
  },
  {
    path:'homeFleet',
    component: HomeFleetComponent,
    title: 'Home fleet page'
  },
  {
    path:'robotTypeCreate',
    component: RobotTypeCreateComponent,
    title: 'Robot type create page'

  },
  {
    path:'robotType',
    component: RobotTypeComponent,
    title: 'Robot type page'

  },
  {
    path:'aboutUs',
    component: AboutUsComponent,
    title: 'About us page'
  },
  {
    path:'buildingdetails/:id',
    component: BuildingDetailsComponent,
    title: 'building details page'

  },
  {
    path:'floordetails/:id',
    component: FloorDetailsComponent,
    title: 'floor details page'
  },
  {
    path:'passagewaydetails/:id',
    component: PassagewayDetailsComponent,
    title: 'passageway details page'
  },
  {
    path:'lift',
    component: LiftComponent,
    title: 'lift page'

  },
  {
    path:'passageway',
    component: PassagewayComponent,
    title: 'passageway page'

  },
  {
    path:'room',
    component: RoomComponent,
    title: 'room page'

  },
  {
    path:'passagewayCreate',
    component: PassagewayCreateComponent,
    title: 'passageway create page'

  },
  {
    path:'passagewayEdit',
    component: PassagewayEditComponent,
    title: 'passageway edit page'

  },
  {
    path:'passagewayList',
    component: PassagewayListComponent,
    title: 'passageway list page'
  },
  {
    path:'roomCreate',
    component: RoomCreateComponent,
    title: 'room create page'

  },
  {
    path:'roomEdit',
    component: RoomEditComponent,
    title: 'lift edit page'

  },
  {
    path:'roomList',
    component: RoomListComponent,
    title: 'room list page'
  },
  {
    path:'liftCreate',
    component: LiftCreateComponent,
    title: 'lift create page'

  },
  {
    path:'liftEdit',
    component: LiftEditComponent,
    title: 'lift edit page'

  },
  {
    path:'liftList',
    component: LiftListComponent,
    title: 'lift list page'
  },
  {
    path:'floor',
    component: FloorComponent,
    title: 'Floor page'
  },
  {
    path:'floorCreate',
    component: FloorCreateComponent,
    title: 'Floor create page'
  },
  {
    path:'floorEdit',
    component: FloorEditComponent,
    title: 'Floor edit page'
  },
  {
    path:'floorList',
    component: FloorListComponent,
    title: 'Floor list page'
  },
  {
    path:'building',
    component: BuildingComponent,
    title: 'building page'
  },
    {
        path:'buildingCreate',
        component: BuildingCreateComponent,
        title: 'building create page'
    },
    {
      path:'buildingEdit',
        component: BuildingEditComponent,
        title: 'building edit page'
    },
    {
        path:'buildingList',
        component: BuildingListComponent,
        title: 'building list page'
    },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'robot',
    component: RobotComponent,
    title: 'Robot page'
  },
  {
    path: 'robotCreate',
    component: RobotCreateComponent,
    title: 'Robot create page'
  },
  /*{
    path: 'robotList',
    component: RobotListComponent,
    title: 'Robot list page'
  },*/
  {
    path: 'robotEnableDisable',
    component: RobotEnableDisableComponent,
    title: 'Robot disable page'
  }
];

export default routeConfig;
