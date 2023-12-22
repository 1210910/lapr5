import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000, 

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/test",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    building: {
      name: "BuildingController",
      path: "../controllers/buildingController"
    },
    passageway: {
      name: "PassagewayController",
      path: "../controllers/PassagewayController"
    },
    room: {
      name: "RoomController",
      path: "../controllers/RoomController"
    },
    floor: {
      name: "FloorController",
      path: "../controllers/floorController"
    },
    robot: {
      name: "RobotController",
      path: "../controllers/robotController"
    },
    robotType: {
      name: "RobotTypeController",
      path: "../controllers/robotTypeController"
    },
    lift: {
      name:"LiftController",
      path:"../controllers/liftController"
    },
    floorMap: {
      name:"FloorMapController",
      path:"../controllers/floorMapController"
    },
    deliveryTask:{
      name:"DeliveryTaskController",
      path:"../controllers/deliveryTaskController"
    },
    vigilanceTask:{
      name:"VigilanceTaskController",
      path:"../controllers/vigilanceTaskController"
    },
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    building: {
      name: "BuildingRepo",
      path: "../repos/buildingRepo"
    },
    passageway: {
      name: "PassagewayRepo",
      path: "../repos/PassagewayRepo"
    },
    room: {
      name: "RoomRepo",
      path: "../repos/RoomRepo"
    },
    floor: {
      name: "FloorRepo",
      path: "../repos/floorRepo"
    },
    robot: {
      name: "RobotRepo",
      path: "../repos/robotRepo"
    },
    robotType: {
      name: "RobotTypeRepo",
      path: "../repos/robotTypeRepo"
    },
    lift: {
      name: "LiftRepo",
      path: "../repos/liftRepo"
    },
    floorMap: {
      name: "FloorMapRepo",
      path: "../repos/floorMapRepo"
    },
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    building: {
      name: "BuildingService",
      path: "../services/buildingService"
    },
    passageway: {
      name: "PassagewayService",
      path: "../services/PassagewayService"
    },
    room: {
      name: "RoomService",
      path: "../services/RoomService"
    },
    floor: {
      name: "FloorService",
      path: "../services/floorService"
    },
    robot: {
      name: "RobotService",
      path: "../services/robotService"
    },
    robotType: {
      name: "RobotTypeService",
      path: "../services/robotTypeService"
    },
    lift: {
      name: "LiftService",
      path: "../services/liftService"
    },
    floorMap: {
      name: "FloorMapService",
      path: "../services/floorMapService"
    },
    deliveryTask:{
      name: "DeliveryTaskService",
      path: "../services/deliveryTaskService"
    },
    vigilanceTask:{
      name: "VigilanceTaskService",
      path: "../services/vigilanceTaskService"
    },
  },
};
