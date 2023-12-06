import sinon from "sinon";
import { expect } from "chai";
import { Request, Response } from "express";

import LiftController from "../../src/controllers/liftController";
import ILiftService from "../../src/services/IServices/ILiftService";
import LiftService from "../../src/services/liftService";
import { Lift } from "../../src/domain/Lift";
import ILiftRepo from "../../src/services/IRepos/ILiftRepo";
import LiftRepo from "../../src/repos/liftRepo";

import { Floor } from "../../src/domain/floor/floor";
import IFloorRepo from "../../src/services/IRepos/IFloorRepo";
import FloorRepo from "../../src/repos/floorRepo";

import IBuildingRepo from "../../src/services/IRepos/IBuildingRepo";
import BuildingRepo from "../../src/repos/buildingRepo";

import { Result } from "../../src/core/logic/Result";
import {when} from "ts-mockito";

describe("Lift Integration Tests", () => {
  let liftController: LiftController;
  let liftService: ILiftService;
  let liftRepo: ILiftRepo;
  let floorRepo: IFloorRepo;
  let buildingRepo: IBuildingRepo;

  beforeEach(() => {
    liftRepo = sinon.createStubInstance(LiftRepo);
    floorRepo = sinon.createStubInstance(FloorRepo);
    buildingRepo = sinon.createStubInstance(BuildingRepo);
    liftService = new LiftService(liftRepo, floorRepo);
    liftController = new LiftController(liftService);
  });

  it("should show success creating a valid lift", async () => {
    let requestBody = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    let req: Partial<Request> = {
      body: requestBody
    };

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

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

    (liftRepo.findByCode as sinon.SinonStub).withArgs(liftDto.code).resolves(Promise.resolve(null));
    (liftRepo.findIfBuildingAlreadyHasLift as sinon.SinonStub).withArgs(liftDto.buildingCode).resolves(Promise.resolve(false));
    (floorRepo.findByBuildingId as sinon.SinonStub).withArgs(liftDto.buildingCode).resolves(Promise.resolve([floor1, floor2]));
    (floorRepo.findByFloorCode as sinon.SinonStub).withArgs(floor1Dto.floorCode).resolves(Promise.resolve(floor1));
    (floorRepo.findByFloorCode as sinon.SinonStub).withArgs(floor2Dto.floorCode).resolves(Promise.resolve(floor2));
    await liftController.createLift(req as Request, res as Response, () => {
    });
    sinon.assert.calledWith(res.status as sinon.SinonStub, 201);
  });

  it("should show error when creating a lift when lift already exists", async () => {
    let requestBody = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    let req: Partial<Request> = {
      body: requestBody
    };

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
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

    const lift = Lift.create(liftDto).getValue();

    (liftRepo.findByCode as sinon.SinonStub).withArgs(liftDto.code).resolves(Promise.resolve(Promise.resolve(lift)));

    await liftController.createLift(req as Request, res as Response, () => {
    });
    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);
  });

  it("should show error when creating a lift when building already has a lift", async () => {
    let requestBody = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    let req: Partial<Request> = {
      body: requestBody
    };

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

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

    (liftRepo.findByCode as sinon.SinonStub).withArgs(liftDto.code).resolves(Promise.resolve(null));
    (liftRepo.findIfBuildingAlreadyHasLift as sinon.SinonStub).withArgs(liftDto.buildingCode).resolves(Promise.resolve(true));
    (floorRepo.findByBuildingId as sinon.SinonStub).withArgs(liftDto.buildingCode).resolves(Promise.resolve([floor1, floor2]));

    await liftController.createLift(req as Request, res as Response, () => {
    });
    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);
  });

  it("should show error when creating a lift when building does not have floors", async () => {
    let requestBody = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    let req: Partial<Request> = {
      body: requestBody
    };

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
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

    (liftRepo.findByCode as sinon.SinonStub).withArgs(liftDto.code).resolves(Promise.resolve(null));
    (liftRepo.findIfBuildingAlreadyHasLift as sinon.SinonStub).withArgs(liftDto.buildingCode).resolves(Promise.resolve(false));
    (floorRepo.findByBuildingId as sinon.SinonStub).withArgs(liftDto.buildingCode).resolves(Promise.resolve([]));

    await liftController.createLift(req as Request, res as Response, () => {
    });
    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);
  });

  it("should catch error when creating a lift", async () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    (liftRepo.findByCode as sinon.SinonStub).withArgs(liftDto.code).rejects(new Error("Error"));
    try {
      await liftService.createLift(liftDto);
    } catch (error) {
      expect(error.message).to.equal("Error");
    }
  });

  it("should show success updating a lift", async () => {
    let requestBody = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand1",
      model: "Model1",
      serialNumber: "123456789",
      description: "Description1"
    };

    let req: Partial<Request> = {
      body: requestBody,
      params: {
        id: "LA"
      }
    };

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

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
      description: "Description",
      id: "123456789"
    };

    const floor1 = Floor.create(floor1Dto).getValue();
    const floor2 = Floor.create(floor2Dto).getValue();
    const lift = Lift.create(liftDto).getValue();

    (liftRepo.findByCode as sinon.SinonStub).withArgs(lift.code).resolves(Promise.resolve(lift));
    (floorRepo.findByBuildingId as sinon.SinonStub).withArgs(liftDto.buildingCode).resolves(Promise.resolve([floor1, floor2]));
    (floorRepo.findByFloorCode as sinon.SinonStub).withArgs(floor1Dto.floorCode).resolves(Promise.resolve(floor1));
    (floorRepo.findByFloorCode as sinon.SinonStub).withArgs(floor2Dto.floorCode).resolves(Promise.resolve(floor2));
    await liftController.updateLift(req as Request, res as Response, () => {});
    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
  });

  it("should show error when updating a lift when lift not found", async () => {
    let requestBody = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand1",
      model: "Model1",
      serialNumber: "123456789",
      description: "Description1"
    };

    let req: Partial<Request> = {
      body: requestBody,
      params: {
        id: "LA"
      }
    };

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
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

    (liftRepo.findByCode as sinon.SinonStub).withArgs(liftDto.code).resolves(Promise.resolve(null));

    await liftController.updateLift(req as Request, res as Response, () => {
    });
    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);
  });

  it("should show error when updating a lift when the floor doesn't exist", async () => {
    let requestBody = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand1",
      model: "Model1",
      serialNumber: "123456789",
      description: "Description1"
    };

    let req: Partial<Request> = {
      body: requestBody,
      params: {
        id: "LA"
      }
    };

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
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

    (liftRepo.findByCode as sinon.SinonStub).withArgs(liftDto.code).resolves(null);
    (floorRepo.findByBuildingId as sinon.SinonStub).withArgs(liftDto.buildingCode).resolves(Promise.resolve(null));

    await liftController.updateLift(req as Request, res as Response, () => {
    });
    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);
  });

  it("should catch error when updating a lift", async () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };
    (liftRepo.findByCode as sinon.SinonStub).withArgs(liftDto.code).rejects(new Error("Error"));

    try {
      await liftService.updateLift(liftDto.code, liftDto);
    } catch (error) {
      expect(error.message).to.equal("Error");
    }
  });

  it("should show success when listing lifts", async () => {
    let req: Partial<Request> = {
      params: {
        buildingCode: "A"
      }
    };

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand1",
      model: "Model1",
      serialNumber: "123456789",
      description: "Description1"
    };

    const lift = Lift.create(liftDto).getValue();

    (liftRepo.findByBuildingCode as sinon.SinonStub).withArgs(liftDto.buildingCode).resolves(Result.ok<Array<Lift>>([lift]));

    await liftController.listLift(req as Request, res as Response, () => {
    });
    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
  });

  it("should show error when listing lifts when there are no floors", async () => {
    let req: Partial<Request> = {
      params: {
        buildingCode: "A"
      }
    };

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    const liftCode: string = "A";

      (liftRepo.findByBuildingCode as sinon.SinonStub).withArgs(liftCode).resolves(Result.fail<Lift[]>("Error"));

    await liftController.listLift(req as Request, res as Response, () => {});
    sinon.assert.calledWith(res.status as sinon.SinonStub, 404);
  });

  it("should catch error when listing lifts", async () => {
    const liftCode: string = "A";

    (liftRepo.findByBuildingCode as sinon.SinonStub).withArgs(liftCode).rejects(new Error("Error"));

    try {
      await liftService.listLift(liftCode);
    } catch (error) {
      expect(error.message).to.equal("Error");
    }
  });
});

