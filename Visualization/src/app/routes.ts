import { Routes } from "@angular/router";
import { HomeCampusComponent } from "./home/homeCampus.component";
import { FloorDetailsComponent } from "./Floor/details/details.component";
import { LoginComponent } from "./login/login.component";
import { BuildingComponent } from "./Building/building.component";
import { BuildingCreateComponent } from "./Building/buildingCreate/buildingCreate.component";
import { BuildingListComponent } from "./Building/buildingList/buildingList.component";
import { BuildingEditComponent } from "./Building/buildingEdit/buildingEdit.component";
import { FloorComponent } from "./Floor/floor.component";
import { FloorCreateComponent } from "./Floor/floorCreate/floorCreate.component";
import { FloorListComponent } from "./Floor/floorList/floorList.component";
import { FloorEditComponent } from "./Floor/floorEdit/floorEdit.component";
import { LiftComponent } from "./Lift/lift.component";
import { LiftCreateComponent } from "./Lift/liftCreate/liftCreate.component";
import { LiftEditComponent } from "./Lift/liftEdit/liftEdit.component";
import { LiftListComponent } from "./Lift/liftList/liftList.component";
import { LiftDetailsComponent } from "./Lift/details/details.component";
import { PassagewayComponent } from "./PassageWay/passageway.component";
import { RoomComponent } from "./Room/room.component";
import { RoomDetailsComponent } from "./Room/details/details.component";
import { PassagewayCreateComponent } from "./PassageWay/passagewayCreate/passagewayCreate.component";
import { PassagewayListComponent } from "./PassageWay/passagewayList/passagewayList.component";
import { PassagewayEditComponent } from "./PassageWay/passagewayEdit/passagewayEdit.component";
import { RoomCreateComponent } from "./Room/roomCreate/roomCreate.component";
import { BuildingDetailsComponent } from "./Building/details/details.component";
import { AboutUsComponent } from "./AboutUs/aboutUs.component";
import { RobotComponent } from "./Robot/robot.component";
import { RobotCreateComponent } from "./Robot/robotCreate/robotCreate.component";
import { PassagewayDetailsComponent } from "./PassageWay/details/details.component";
import { HomeFleetComponent } from "./home/homeFleet.component";
import { RobotTypeComponent } from "./RobotType/robotType.component";
import { RobotTypeCreateComponent } from "./RobotType/robotTypeCreate/robotTypeCreate.component";
import { CampusComponent } from "./campus/campus.component";
import { LoadMapComponent } from "./campus/loadMap.component";
import { RobotEnableDisableComponent } from "./Robot/robotEnableDisable/robotEnableDisable.component";
import { PlantComponent } from "./visualization_3d/plant/plant.component";
import { ViewMapComponent } from "./campus/viewMap.component";
import { RobotListComponent } from "./Robot/robotList/robotList.component";
import { RobotDetailsComponent } from "./Robot/details/details.component";
import { FleetComponent } from "./Fleet/fleet.component";
import { GetPathComponent } from "./Fleet/getPath.component";
import { SignUpComponent } from "./signUp/signUp/signUp.component";
import { TermsAndConditionsComponent } from "./signUp/termsAndConditions/termsAndConditions.component";
import { PrivacyPolicyComponent } from "./signUp/privacyPolicy/privacyPolicy.component";
import { HomeUserComponent } from "./home/homeUser.component";
import { UserComponent } from "./User/user.component";
import { DataCopyComponent } from "./User/dataCopy/dataCopy.component";
import { DeleteAccountComponent } from "./User/deleteAccount/deleteAccount.component";
import { EditDataComponent } from "./User/editData/editData.component";
import { AdminComponent } from "./home/admin.component";
import { CreateUserComponent } from "./signUp/createUser/createUser.component";
import { TaskComponent } from "./Task/TaskManager/task.component";
import { ListAllTaskRequestComponent } from "./Task/TaskManager/TaskList/listAllTaskRequest.component";
import { ListAllTaskComponent } from "./Task/TaskManager/TaskList/listAllTask.component";
import { TaskApproveRejectComponent } from "./Task/TaskManager/TaskApproveReject/taskApproveReject.component";
import { TaskManagerComponent } from "./home/homeTask.component";
import { HomeComponent } from "./home/home.component";

const routeConfig: Routes = [

  // LOGIN
  {
    path: "home",
    component: HomeComponent,
    title: "Redirecting..."
  },
  {
    path: "",
    component: LoginComponent,
    title: "Login page"
  },
  {
    path: "signup",
    component: SignUpComponent,
    title: "Sign Up page"
  },
  {
    path: "privacyPolicy",
    component: PrivacyPolicyComponent,
    title: "Privacy Policy page"
  },
  {
    path: "termsandConditions",
    component: TermsAndConditionsComponent,
    title: "Terms and Conditions page"
  },
  {
    path: "aboutUs",
    component: AboutUsComponent,
    title: "About us page"
  },


  // ADMIN
  {
    path: "admin",
    component: AdminComponent,
    title: "Admin home page"
  },
  {
    path: "createUser",
    component: CreateUserComponent,
    title: "Create User page"
  },


  // CAMPUS
  {
    path: "campusManager",
    component: HomeCampusComponent,
    title: "Campus manager home page"
  },
  {
    path: "campus",
    component: CampusComponent,
    title: "Campus page"
  },
  {
    path: "loadMap",
    component: LoadMapComponent,
    title: "Load Map page"
  },
  {
    path: "view",
    component: ViewMapComponent,
    title: "View Map page"
  },
  {
    path: "plant",
    component: PlantComponent,
    title: "Plant page"
  },
  {
    path: "building",
    component: BuildingComponent,
    title: "building page"
  },
  {
    path: "buildingCreate",
    component: BuildingCreateComponent,
    title: "building create page"
  },
  {
    path: "buildingEdit",
    component: BuildingEditComponent,
    title: "building edit page"
  },
  {
    path: "buildingList",
    component: BuildingListComponent,
    title: "building list page"
  },
  {
    path: "buildingdetails/:id",
    component: BuildingDetailsComponent,
    title: "building details page"
  },
  {
    path: "floor",
    component: FloorComponent,
    title: "Floor page"
  },
  {
    path: "floorCreate",
    component: FloorCreateComponent,
    title: "Floor create page"
  },
  {
    path: "floorEdit",
    component: FloorEditComponent,
    title: "Floor edit page"
  },
  {
    path: "floorList",
    component: FloorListComponent,
    title: "Floor list page"
  },
  {
    path: "floordetails/:id",
    component: FloorDetailsComponent,
    title: "floor details page"
  },
  {
    path: "passageway",
    component: PassagewayComponent,
    title: "passageway page"
  },
  {
    path: "passagewayCreate",
    component: PassagewayCreateComponent,
    title: "passageway create page"
  },
  {
    path: "passagewayEdit",
    component: PassagewayEditComponent,
    title: "passageway edit page"
  },
  {
    path: "passagewayList",
    component: PassagewayListComponent,
    title: "passageway list page"
  },
  {
    path: "passagewaydetails/:id",
    component: PassagewayDetailsComponent,
    title: "passageway details page"
  },
  {
    path: "lift",
    component: LiftComponent,
    title: "lift page"
  },
  {
    path: "liftCreate",
    component: LiftCreateComponent,
    title: "lift create page"
  },
  {
    path: "liftEdit",
    component: LiftEditComponent,
    title: "lift edit page"
  },
  {
    path: "liftList",
    component: LiftListComponent,
    title: "lift list page"
  },
  {
    path: "liftdetails/:id",
    component: LiftDetailsComponent,
    title: "lift details page"
  },
  {
    path: "room",
    component: RoomComponent,
    title: "room page"
  },
  {
    path: "roomCreate",
    component: RoomCreateComponent,
    title: "room create page"

  },
  {
    path: "roomDetails",
    component: RoomDetailsComponent,
    title: "room details page"
  },


  // USER
  {
    path: "homeUser",
    component: HomeUserComponent,
    title: "User page"
  },
  {
    path: "userData",
    component: UserComponent,
    title: "User page"
  },
  {
    path: "dataCopy",
    component: DataCopyComponent,
    title: "Data Copy page"
  },
  {
    path: "editData",
    component: EditDataComponent,
    title: "Edit Data page"
  },
  {
    path: "deleteAccount",
    component: DeleteAccountComponent,
    title: "Delete Account page"
  },


  // FLEET
  {
    path: "homeFleet",
    component: HomeFleetComponent,
    title: "Home fleet page"
  },
  {
    path: "fleet",
    component: FleetComponent,
    title: "Fleet page"
  },
  {
    path: "getPath",
    component: GetPathComponent,
    title: "Get Path page"
  },
  {
    path: "robot",
    component: RobotComponent,
    title: "Robot page"
  },
  {
    path: "robotCreate",
    component: RobotCreateComponent,
    title: "Robot create page"
  },
  {
    path: "robotList",
    component: RobotListComponent,
    title: "Robot list page"
  },
  {
    path: "robotEnableDisable",
    component: RobotEnableDisableComponent,
    title: "Robot disable page"
  },
  {
    path: "robotdetails",
    component: RobotDetailsComponent,
    title: "Robot details page"
  },
  {
    path: "robotType",
    component: RobotTypeComponent,
    title: "Robot type page"

  },
  {
    path: "robotTypeCreate",
    component: RobotTypeCreateComponent,
    title: "Robot type create page"
  },

  // TASK MANAGER
  {
    path: "taskManager",
    component: TaskManagerComponent,
    title: "Task manager home page"
  },
  {
    path: "taskManagement",
    component: TaskComponent,
    title: "Task management page"
  },
  {
    path: "getAllTask",
    component: ListAllTaskRequestComponent,
    title: "List task request page"
  },
  {
    path: "listAllTask",
    component: ListAllTaskComponent,
    title: "List task page"
  },
  {
    path: "actionTask",
    component: TaskApproveRejectComponent,
    title: "Task action page"
  }

];

export default routeConfig;
