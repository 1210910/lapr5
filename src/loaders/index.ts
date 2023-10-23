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


  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      buildingSchema,
      PassagewaySchema,
      RoomSchema
    ],
    controllers: [
      roleController,
      buildingController,
      PassagewayController,
      RoomController
    ],
    repos: [
      roleRepo,
      userRepo,
      buildingRepo,
      PassagewayRepo,
      RoomRepo
    ],
    services: [
      roleService,
      buildingService,
      PassagewayService,
      RoomService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
