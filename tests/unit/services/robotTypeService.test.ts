import { mock, when, instance, anything } from "ts-mockito";
import { expect } from "chai";

import IRobotTypeRepo from "../../../src/services/IRepos/IRobotTypeRepo";
import IRobotTypeService from "../../../src/services/IServices/IRobotTypeService";
import RoboTypeService from "../../../src/services/robotTypeService";
import { RobotType } from "../../../src/domain/robotType";

describe("RobotTypeService", async () => {

    it("should fail because robot type code is empty", async () => {
        const robotTypeDto = {
            code: "",
            brand: "iRobot",
            model: "Roomba 980",
            description: "Robot aspirador",
            taskTypeCode: "TT-001"
        };

        const robotTypeRepo = mock<IRobotTypeRepo>();
        const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
        expect((await robotTypeService.createRobotType(robotTypeDto)).error).to.equal('There is no code.');
    });

    it("should fail because robot type code already exists", async () => {
        const robotTypeDto = {
            code: "RT-001",
            brand: "iRobot",
            model: "Roomba 980",
            description: "Robot aspirador",
            taskTypeCode: "TT-001"
        };

        const robotTypeRepo = mock<IRobotTypeRepo>();
        when(robotTypeRepo.existsByCode(robotTypeDto.code)).thenResolve(true);
        const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
        expect((await robotTypeService.createRobotType(robotTypeDto)).error).to.equal("RobotType already exists");
    });

    it("shouldn't create a valid robot when code is longer than 25 characters", async () => {

        const robotTypeDto = {
            code: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            brand: "brand",
            model: "model",
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };

        const robotTypeRepo = mock<IRobotTypeRepo>();
        const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
        expect((await robotTypeService.createRobotType(robotTypeDto)).error).to.equal('Code must be 25 characters or less');
    });

    it("should fail because robot type brand is empty", async () => {
        const robotTypeDto = {
            code: "RT-001",
            brand: "",
            model: "Roomba 980",
            description: "Robot aspirador",
            taskTypeCode: "TT-001"
        };

        const robotTypeRepo = mock<IRobotTypeRepo>();
        const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
        expect((await robotTypeService.createRobotType(robotTypeDto)).error).to.equal("There is no brand.");
    });

    it("shouldn't create a valid robot when brand is longer than 50 characters", async () => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            model: "model",
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };


        const robotTypeRepo = mock<IRobotTypeRepo>();
        const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
        expect((await robotTypeService.createRobotType(robotTypeDto)).error).to.equal("Brand must be 50 characters or less");
    });

    it("should fail because robot type model is empty", async () => {
        const robotTypeDto = {
            code: "RT-001",
            brand: "iRobot",
            model: "",
            description: "Robot aspirador",
            taskTypeCode: "TT-001"
        };

      const robotTypeRepo = mock<IRobotTypeRepo>();
      const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
      expect((await robotTypeService.createRobotType(robotTypeDto)).error).to.equal("There is no model.");
    });

  it("shouldn't create a valid robot when model is longer than 100 characters", async () => {

    const robotTypeDto = {
      code: "RT-001",
      brand: "brand",
      model: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      description: "This is a test robot",
      taskTypeCode: "TT-001"
    };

    const robotTypeRepo = mock<IRobotTypeRepo>();
    const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
    expect((await robotTypeService.createRobotType(robotTypeDto)).error).to.equal("Model must be 100 characters or less");
  });

/*    it("should create with a null description", async () => {
        const robotTypeDto = {
            code: "RT-001",
            brand: "iRobot",
            model: "Roomba 980",
            description: "",
            taskTypeCode: "TT-001"
        };

        const robotType = RobotType.create(robotTypeDto).getValue();

        const robotTypeRepo = mock<IRobotTypeRepo>();
        when(robotTypeRepo.save(anything())).thenResolve(robotType);
        const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
        expect((await robotTypeService.createRobotType(robotTypeDto)).getValue()).to.equal(robotTypeDto);
    });*/

    it("shouldn't create a valid robot when description is longer than 250 characters", async () => {
        const robotTypeDto = {
            code: "RT-001",
            brand: "brand",
            model: "model",
            description: "Lorem ipsum dolor sit amet, " +
                "consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste " +
                "natus error sit voluptatem accusantium doloremque laudantium, " +
                "totam rem aperiam, eaque ipsa quae ab illo inventore veritatis " +
                "et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim " +
                "ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, " +
                "sed quia consequuntur magni dolores eos qui ratione voluptatem sequi " +
                "nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit " +
                "amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora" +
                " incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
            taskTypeCode: "TT-001"
        };

        const robotTypeRepo = mock<IRobotTypeRepo>();
        const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
        expect((await robotTypeService.createRobotType(robotTypeDto)).error).to.equal("Description must be 250 characters or less");
    });

  it("should fail because robot type task type code is empty", async () => {
    const robotTypeDto = {
      code: "RT-001",
      brand: "iRobot",
      model: "Roomba 980",
      description: "Robot aspirador",
      taskTypeCode: ""
    };

    const robotTypeRepo = mock<IRobotTypeRepo>();
    const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
    expect((await robotTypeService.createRobotType(robotTypeDto)).error).to.equal("There is no task type code.");
  });

  it("shouldn't create a valid robot when task type code is longer than 25 characters", async() => {

    const robotTypeDto = {
      code: "RT-001",
      brand: "brand",
      model: "model",
      description: "This is a test robot",
      taskTypeCode: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    };

    const robotTypeRepo = mock<IRobotTypeRepo>();
    const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
    expect((await robotTypeService.createRobotType(robotTypeDto)).error).to.equal("Task type code must be 25 characters or less");
  });

    it("valid robot should return the same code", async() => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "brand",
            model: "model",
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };

        const robotType = RobotType.create(robotTypeDto).getValue();

        const robotTypeRepo = mock<IRobotTypeRepo>();
        when(robotTypeRepo.save(anything())).thenResolve(robotType);
        const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
        expect((await robotTypeService.createRobotType(robotTypeDto)).getValue().code).to.equal(robotTypeDto.code);
    });

    it("valid robot should return the same model", async() => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "brand",
            model: "model",
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };

        const robotType = RobotType.create(robotTypeDto).getValue();

        const robotTypeRepo = mock<IRobotTypeRepo>();
        when(robotTypeRepo.save(anything())).thenResolve(robotType);
        const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
        expect((await robotTypeService.createRobotType(robotTypeDto)).getValue().model).to.equal(robotTypeDto.model);
    });

    it("valid robot should return the same brand", async() => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "brand",
            model: "model",
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };

        const robotType = RobotType.create(robotTypeDto).getValue();

        const robotTypeRepo = mock<IRobotTypeRepo>();
        when(robotTypeRepo.save(anything())).thenResolve(robotType);
        const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
        expect((await robotTypeService.createRobotType(robotTypeDto)).getValue().brand).to.equal(robotTypeDto.brand);
    });

    it("valid robot should return the same description", async() => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "brand",
            model: "model",
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };

        const robotType = RobotType.create(robotTypeDto).getValue();

        const robotTypeRepo = mock<IRobotTypeRepo>();
        when(robotTypeRepo.save(anything())).thenResolve(robotType);
        const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
        expect((await robotTypeService.createRobotType(robotTypeDto)).getValue().description).to.equal(robotTypeDto.description);
    });

    it("valid robot should return the same task type code", async() => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "brand",
            model: "model",
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };

        const robotType = RobotType.create(robotTypeDto).getValue();

        const robotTypeRepo = mock<IRobotTypeRepo>();
        when(robotTypeRepo.save(anything())).thenResolve(robotType);
        const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
        expect((await robotTypeService.createRobotType(robotTypeDto)).getValue().taskTypeCode).to.equal(robotTypeDto.taskTypeCode);
    });

    it("should return an unexpected error", async() => {

            const robotTypeDto = {
                code: "RT-001",
                brand: "brand",
                model: "model",
                description: "This is a test robot",
                taskTypeCode: "TT-001"
            };

            const robotTypeRepo = mock<IRobotTypeRepo>();
            when(robotTypeRepo.save(anything())).thenReject(new Error());

            const robotTypeService: IRobotTypeService = new RoboTypeService(instance(robotTypeRepo));
            expect((await robotTypeService.createRobotType(robotTypeDto)).error).to.equal("An error has occurred");
    });

});
