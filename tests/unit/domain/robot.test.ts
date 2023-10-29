import  assert  from 'assert';
import { Robot } from '../../../src/domain/robot';


describe("Robot Test", () => {

  it("should create a valid Robot when all the parameters are valid", () => {

    const robotDTO = {
      code: "R1",
      name: "Robot number 1",
      type:"type",
      enabled: true,
      description: "description"
    }


    const buildingOrError = Robot.create(robotDTO);
    assert(buildingOrError.isSuccess);
  });

  it("should fail a valid Robot when description is bigger tha 255", () => {

    const robotDTO = {
      code: "R1",
      name: "Robot number 1",
      type:"type",
      enabled: true,
      description: "description".repeat(255)
    }


    const buildingOrError = Robot.create(robotDTO);
    assert(buildingOrError.isFailure);
  });

  it("should fail a valid Robot when description is null", () => {

    const robotDTO = {
      code: "R1",
      name: "Robot number 1",
      type:"type",
      enabled: true,
      description: null
    }


    const buildingOrError = Robot.create(robotDTO);
    assert(buildingOrError.isFailure);
  });

  it("should fail a valid Robot when name is null", () => {

    const robotDTO = {
      code: "R1",
      name: null,
      type:"type",
      enabled: true,
      description: "aa"
    }


    const buildingOrError = Robot.create(robotDTO);
    assert(buildingOrError.isFailure);
  });

  it("should fail a valid Robot when type is null", () => {

    const robotDTO = {
      code: "R1",
      name: "Robot number 1",
      type: null,
      enabled: true,
      description: "robot"
    }


    const buildingOrError = Robot.create(robotDTO);
    assert(buildingOrError.isFailure);
  });

  it("should fail a valid Robot when code is null", () => {

    const robotDTO = {
      code: null,
      name: "Robot number 1",
      type: "type",
      enabled: true,
      description: "robot"
    }


    const buildingOrError = Robot.create(robotDTO);
    assert(buildingOrError.isFailure);
  });

  it("should fail a valid Robot when enabled is null", () => {

    const robotDTO = {
      code: "R1",
      name: "Robot number 1",
      type: "type",
      enabled: null,
      description: "robot"
    }


    const buildingOrError = Robot.create(robotDTO);
    assert(buildingOrError.isFailure);
  });

  it("should fail a valid Robot when name is bigger than 30", () => {

    const robotDTO = {
      code: "R1",
      name: "name".repeat(40),
      type:"type",
      enabled: true,
      description: "aa"
    }

    const buildingOrError = Robot.create(robotDTO);
    assert(buildingOrError.isFailure);
  });

  it("should fail a valid Robot when enable is false", () => {

    const robotDTO = {
      code: "R1",
      name: "name",
      type:"type",
      enabled: false,
      description: "aa"
    }

    const buildingOrError = Robot.create(robotDTO);
    assert(buildingOrError.isFailure);
  });

  it("should fail a valid Robot when enable is false", () => {

    const robotDTO = {
      code: "R1",
      name: "name",
      type:"type",
      enabled: false,
      description: "aa"
    }

    const buildingOrError = Robot.create(robotDTO);
    assert(buildingOrError.isFailure);
  });


});
