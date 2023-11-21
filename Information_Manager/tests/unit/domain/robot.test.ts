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


    const robotOrError = Robot.create(robotDTO);
    assert(robotOrError.isSuccess);
  });

  it("should fail a valid Robot when description is bigger tha 255", () => {

    const robotDTO = {
      code: "R1",
      name: "Robot number 1",
      type:"type",
      enabled: true,
      description: "description".repeat(255)
    }


    const robotOrError = Robot.create(robotDTO);
    assert(robotOrError.isFailure);
  });

  it("should fail a valid Robot when description is null", () => {

    const robotDTO = {
      code: "R1",
      name: "Robot number 1",
      type:"type",
      enabled: true,
      description: null
    }


    const robotOrError = Robot.create(robotDTO);
    assert(robotOrError.isFailure);
  });

  it("should fail a valid Robot when name is null", () => {

    const robotDTO = {
      code: "R1",
      name: null,
      type:"type",
      enabled: true,
      description: "aa"
    }


    const robotOrError = Robot.create(robotDTO);
    assert(robotOrError.isFailure);
  });

  it("should fail a valid Robot when type is null", () => {

    const robotDTO = {
      code: "R1",
      name: "Robot number 1",
      type: null,
      enabled: true,
      description: "robot"
    }


    const robotOrError = Robot.create(robotDTO);
    assert(robotOrError.isFailure);
  });

  it("should fail a valid Robot when code is null", () => {

    const robotDTO = {
      code: null,
      name: "Robot number 1",
      type: "type",
      enabled: true,
      description: "robot"
    }


    const robotOrError = Robot.create(robotDTO);
    assert(robotOrError.isFailure);
  });

  it("should fail a valid Robot when enabled is null", () => {

    const robotDTO = {
      code: "R1",
      name: "Robot number 1",
      type: "type",
      enabled: null,
      description: "robot"
    }


    const robotOrError = Robot.create(robotDTO);
    assert(robotOrError.isFailure);
  });

  it("should fail a valid Robot when name is bigger than 30", () => {

    const robotDTO = {
      code: "R1",
      name: "name".repeat(40),
      type:"type",
      enabled: true,
      description: "aa"
    }

    const robotOrError = Robot.create(robotDTO);
    assert(robotOrError.isFailure);
  });


  it("should pass when get code", () => {

    const robotDTO = {
      code: "R1",
      name: "name",
      type:"type",
      enabled: true,
      description: "aa"
    }

    const robotOrError = Robot.create(robotDTO);
    assert.equal(robotOrError.getValue().code,robotDTO.code);
  });

  it("should pass when get name", () => {

    const robotDTO = {
      code: "R1",
      name: "name",
      type:"type",
      enabled: true,
      description: "aa"
    }

    const robotOrError = Robot.create(robotDTO);
    assert.equal(robotOrError.getValue().name,robotDTO.name);
  });

  it("should pass when get type", () => {

    const robotDTO = {
      code: "R1",
      name: "name",
      type:"type",
      enabled: true,
      description: "aa"
    }

    const robotOrError = Robot.create(robotDTO);
    assert.equal(robotOrError.getValue().type,robotDTO.type);
  });

  it("should pass when get enabled", () => {

    const robotDTO = {
      code: "R1",
      name: "name",
      type:"type",
      enabled: true,
      description: "aa"
    }

    const robotOrError = Robot.create(robotDTO);
    assert.equal(robotOrError.getValue().enabled,robotDTO.enabled);
  });

  it("should pass when get description", () => {

    const robotDTO = {
      code: "R1",
      name: "name",
      type:"type",
      enabled: true,
      description: "aa"
    }

    const robotOrError = Robot.create(robotDTO);
    assert.equal(robotOrError.getValue().description,robotDTO.description);
  });


});
