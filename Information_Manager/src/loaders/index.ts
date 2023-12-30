import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';


export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  // Schemas

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const buildingSchema = {
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  };

  const PassagewaySchema = {
    name: 'passagewaySchema',
    schema: '../persistence/schemas/passagewaySchema',
  };

  const RoomSchema = {
    name: 'RoomSchema',
    schema: '../persistence/schemas/RoomSchema',
  };

  const floorSchema = {
    name: 'floorSchema',
    schema: '../persistence/schemas/floorSchema',
  };

  const robotSchema = {
    name: 'robotSchema',
    schema: '../persistence/schemas/robotSchema',
  };

  const robotTypeSchema = {
    name: 'robotTypeSchema',
    schema: '../persistence/schemas/robotTypeSchema',
  };

  const liftSchema = {
    name: 'liftSchema',
    schema: '../persistence/schemas/liftSchema',
  };

  const floorMapSchema = {
    name: 'floorMapSchema',
    schema: '../persistence/schemas/floorMapSchema',
  };
  // Controllers

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path
  }

  const PassagewayController = {
    name: config.controllers.passageway.name,
    path: config.controllers.passageway.path
  }

  const RoomController = {
    name: config.controllers.room.name,
    path: config.controllers.room.path
  }

  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  }

  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path
  }

  const robotTypeController = {
    name: config.controllers.robotType.name,
    path: config.controllers.robotType.path
  }
  const liftController = {
    name: config.controllers.lift.name,
    path: config.controllers.lift.path
  }
  const floorMapController = {
    name: config.controllers.floorMap.name,
    path: config.controllers.floorMap.path
  }
  const deliveryTaskController = {
    name: config.controllers.deliveryTask.name,
    path: config.controllers.deliveryTask.path
  }
    const vigilanceTaskController = {
        name: config.controllers.vigilanceTask.name,
        path: config.controllers.vigilanceTask.path
    }
    const taskRequestController = {
      name: config.controllers.taskRequest.name,
      path: config.controllers.taskRequest.path
    }
  // Repos

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path 
  }

  const PassagewayRepo = {
    name: config.repos.passageway.name,
    path: config.repos.passageway.path
  }

  const RoomRepo = {
    name: config.repos.room.name,
    path: config.repos.room.path
  }

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  }

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path
  }

  const robotTypeRepo = {
    name: config.repos.robotType.name,
    path: config.repos.robotType.path
  }
  const liftRepo = {
    name: config.repos.lift.name,
    path: config.repos.lift.path
  }
  const floorMapRepo = {
    name: config.repos.floorMap.name,
    path: config.repos.floorMap.path
  }



  // Services

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path
  }

  const PassagewayService = {
    name: config.services.passageway.name,
    path: config.services.passageway.path
  }

  const RoomService = {
    name: config.services.room.name,
    path: config.services.room.path
  }

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path
  }

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path
  }

  const robotTypeService = {
    name: config.services.robotType.name,
    path: config.services.robotType.path
  }
  const liftService = {
    name: config.services.lift.name,
    path: config.services.lift.path
  }
  const floorMapService = {
    name: config.services.floorMap.name,
    path: config.services.floorMap.path
  }
  const deliveryTaskService = {
        name: config.services.deliveryTask.name,
        path: config.services.deliveryTask.path
    }
    const vigilanceTaskService = {
        name: config.services.vigilanceTask.name,
        path: config.services.vigilanceTask.path
    }
    const taskRequestService = {
      name: config.services.taskRequest.name,
      path: config.services.taskRequest.path
  }


  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      buildingSchema,
      PassagewaySchema,
      RoomSchema,
      floorSchema,
      robotSchema,
      robotTypeSchema,
      liftSchema,
      floorMapSchema
    ],
    controllers: [
      roleController,
      buildingController,
      PassagewayController,
      RoomController,
      floorController,
      robotController,
      robotTypeController,
      liftController,
      floorMapController,
      deliveryTaskController,
      vigilanceTaskController,
      taskRequestController

    ],
    repos: [
      roleRepo,
      userRepo,
      floorRepo,
      buildingRepo,
      PassagewayRepo,
      RoomRepo,
      robotRepo,
      robotTypeRepo,
      liftRepo,
      floorMapRepo
      
    ],
    services: [
      roleService,
      buildingService,
      PassagewayService,
      RoomService,
      floorService,
      robotService,
      robotTypeService,
      liftService,
      floorMapService,
      deliveryTaskService,
      vigilanceTaskService,
      taskRequestService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
