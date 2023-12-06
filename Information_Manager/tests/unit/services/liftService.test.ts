import { mock, when, instance } from "ts-mockito";
import { expect } from "chai";

import ILiftRepo from "../../../src/services/IRepos/ILiftRepo";
import ILiftService from "../../../src/services/IServices/ILiftService";
import LiftService from "../../../src/services/liftService";
import { Lift } from "../../../src/domain/Lift";
import IFloorRepo from "../../../src/services/IRepos/IFloorRepo";
import { Floor } from "../../../src/domain/floor/floor";
import IBuildingRepo from "../../../src/services/IRepos/IBuildingRepo";
import IBuildingService from "../../../src/services/IServices/IBuildingService";
import BuildingService from "../../../src/services/buildingService";
import { Result } from "../../../src/core/logic/Result";

describe("liftService", () => {

  let liftRepo: ILiftRepo;
  let buildingRepo: IBuildingRepo;
  let floorRepo: IFloorRepo;

  let liftService: ILiftService;
  let buildingService: IBuildingService;
  

  beforeEach(() => {
    liftRepo = mock<ILiftRepo>();
    buildingRepo = mock<IBuildingRepo>();
    floorRepo = mock<IFloorRepo>();

    liftService = new LiftService(instance(liftRepo), instance(floorRepo));

    buildingService = mock<BuildingService>();
   
  });

  it("should create a lift", async () => {
    const floor1Dto = {
      floorCode: "A1",
      floorNumber: 1,
      width: 100,
      length: 100,
      description: "This is a test floor",
      buildingID: "A"
    };

    const floor2Dto = {
      floorCode: "A2",
      floorNumber: 2,
      width: 100,
      length: 100,
      description: "This is a test floor",
      buildingID: "A"
    };

    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const floor1 = Floor.create(floor1Dto).getValue();
    const floor2 = Floor.create(floor2Dto).getValue();

    when(liftRepo.findByCode(liftDto.code)).thenReturn(null);
    when(liftRepo.findIfBuildingAlreadyHasLift(liftDto.buildingCode)).thenReturn(Promise.resolve(false));
    when(floorRepo.findByBuildingId(liftDto.buildingCode)).thenReturn(Promise.resolve([floor1, floor2]));
    when(floorRepo.findByFloorCode(floor1Dto.floorCode)).thenReturn(Promise.resolve(floor1));
    when(floorRepo.findByFloorCode(floor2Dto.floorCode)).thenReturn(Promise.resolve(floor2));
    const result = await liftService.createLift(liftDto);
    expect(result.isSuccess).to.be.true;
  });

  it("shouldn't create a lift when lift already exists", async () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const lift = Lift.create(liftDto).getValue();

    when(liftRepo.findByCode(liftDto.code)).thenReturn(Promise.resolve(lift));

    const result = await liftService.createLift(liftDto);
    expect(result.isFailure).to.be.true;
  });

  it("shouldn't create a lift when the building already has a lift", async () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    when(liftRepo.findByCode(liftDto.code)).thenReturn(null);
    when(liftRepo.findIfBuildingAlreadyHasLift(liftDto.buildingCode)).thenReturn(Promise.resolve(true));

    const result = await liftService.createLift(liftDto);
    expect(result.isFailure).to.be.true;
  });

  it("shouldn't create a lift when the floor doesn't exist", async () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    when(liftRepo.findByCode(liftDto.code)).thenReturn(null);
    when(liftRepo.findIfBuildingAlreadyHasLift(liftDto.buildingCode)).thenReturn(Promise.resolve(false));
    when(floorRepo.findByBuildingId(liftDto.buildingCode)).thenReturn(Promise.resolve(null));

    const result = await liftService.createLift(liftDto);
    expect(result.isFailure).to.be.true;
  });

  it("should catch error when create lift", async () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };
    when(liftRepo.findByCode(liftDto.code)).thenThrow(new Error("Error"));

    try {
      await liftService.createLift(liftDto);
    } catch (error) {
      expect(error.message).to.equal("Error");
    }
  });

  it("should update a lift", async () => {
    const floor1Dto = {
      floorCode: "A1",
      floorNumber: 1,
      width: 100,
      length: 100,
      description: "This is a test floor",
      buildingID: "A"
    };

    const floor2Dto = {
      floorCode: "A2",
      floorNumber: 2,
      width: 100,
      length: 100,
      description: "This is a test floor",
      buildingID: "A"
    };

    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const floor1 = Floor.create(floor1Dto).getValue();
    const floor2 = Floor.create(floor2Dto).getValue();

    const lift = Lift.create(liftDto).getValue();

    when(liftRepo.findByCode(liftDto.code)).thenReturn(Promise.resolve(lift));
    when(floorRepo.findByBuildingId(liftDto.buildingCode)).thenReturn(Promise.resolve([floor1, floor2]));
    when(floorRepo.findByFloorCode(floor1Dto.floorCode)).thenReturn(Promise.resolve(floor1));
    when(floorRepo.findByFloorCode(floor2Dto.floorCode)).thenReturn(Promise.resolve(floor2));
    const result = await liftService.updateLift(liftDto.code, liftDto);
    expect(result.isSuccess).to.be.true;
  });

  it("shouldn't update a lift when lift not found", async () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    when(liftRepo.findByCode(liftDto.code)).thenReturn(Promise.resolve(null));

    const result = await liftService.updateLift(liftDto.code, liftDto);
    expect(result.isFailure).to.be.true;
  });

  it("shouldn't update a lift when the floor doesn't exist", async () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    when(liftRepo.findByCode(liftDto.code)).thenReturn(null);
    when(floorRepo.findByBuildingId(liftDto.buildingCode)).thenReturn(Promise.resolve(null));

    const result = await liftService.updateLift(liftDto.code, liftDto);
    expect(result.isFailure).to.be.true;
  });

  it("should catch error when update lift", async () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };
    when(liftRepo.findByCode(liftDto.code)).thenThrow(new Error("Error"));

    try {
      await liftService.updateLift(liftDto.code, liftDto);
    } catch (error) {
      expect(error.message).to.equal("Error");
    }
  });

  it("should list all lifts", async () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand1",
      model: "Model1",
      serialNumber: "123456789",
      description: "Description"
    };

    const lift = Lift.create(liftDto).getValue();

    when(liftRepo.findByBuildingCode(liftDto.buildingCode)).thenReturn(Promise.resolve(Result.ok<Lift[]>([lift])));

    const result = await liftService.listLift(liftDto.buildingCode);
    expect(result.isSuccess).to.be.true;
  });

  it("shouldn't list lifts when there are no floors", async () => {
    const liftCode: string = "A";

    when(liftRepo.findByBuildingCode(liftCode)).thenReturn(Promise.resolve(Result.fail<Lift[]>("Error")));

    const result = await liftService.listLift(liftCode);
    expect(result.isFailure).to.be.true;
  });

  it("should catch error when list lifts", async () => {
    const liftCode: string = "A";

    when(liftRepo.findByBuildingCode(liftCode)).thenThrow(new Error("Error"));

    try {
      await liftService.listLift(liftCode);
    } catch (error) {
      expect(error.message).to.equal("Error");
    }
  });

});
