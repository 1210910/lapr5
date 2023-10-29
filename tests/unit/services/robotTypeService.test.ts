import { mock, when, instance, anything } from "ts-mockito";
import { expect } from "chai";

import IRobotTypeRepo from "../../../src/services/IRepos/IRobotTypeRepo";
import IRobotTypeService from "../../../src/services/IServices/IRobotTypeService";
import RoboTypeService from "../../../src/services/robotTypeService";
import { RobotType } from "../../../src/domain/robotType";

describe("RobotTypeService", async () => {

  let robotTypeRepo: IRobotTypeRepo;
  let robotTypeService: IRobotTypeService;

  beforeEach(() => {
    robotTypeRepo = mock<IRobotTypeRepo>();
    robotTypeService = new RoboTypeService(instance(robotTypeRepo));
  });

  it("should create a robotType", async () => {
    const robotTypeDto = {
      code: "RT-001",
      brand: "brand",
      model: "model",
      description: "This is a test robot",
      taskTypeCode: "classroom"
    };

    when(robotTypeRepo.existsByCode(robotTypeDto.code)).thenResolve(false);
    when(robotTypeRepo.save(anything())).thenResolve(RobotType.create(robotTypeDto).getValue());
    const result = await robotTypeService.createRobotType(robotTypeDto);
    expect(result.isSuccess).to.be.true;
  });

  it("should not create a robotType if it already exists", async () => {
    const robotTypeDto = {
      code: "RT-001",
      brand: "brand",
      model: "model",
      description: "This is a test robot",
      taskTypeCode: "classroom"
    };

    when(robotTypeRepo.existsByCode(robotTypeDto.code)).thenResolve(true);
    const result = await robotTypeService.createRobotType(robotTypeDto);
    expect(result.isFailure).to.be.true;
  });

  it("should not create a robotType due to failed creation", async () => {
    const robotTypeDto = {
      code: "RT-001",
      brand: null,
      model: "model",
      description: "This is a test robot",
      taskTypeCode: "classroom"
    };

    when(robotTypeRepo.existsByCode(robotTypeDto.code)).thenResolve(false);
    const result = await robotTypeService.createRobotType(robotTypeDto);
    expect(result.isFailure).to.be.true;
  });

});
