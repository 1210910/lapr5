import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';
import {Request , Response } from 'express';

import { Building } from '../../src/domain/Building';
import IBuildingRepo from "../../src/services/IRepos/IBuildingRepo";
import BuildingRepo from "../../src/repos/buildingRepo";
import { anything, when } from "ts-mockito";
import IFloorService from "../../src/services/IServices/IFloorService";
import FloorController from "../../src/controllers/floorController";
import IFloorRepo from "../../src/services/IRepos/IFloorRepo";
import IPassagewayRepo from "../../src/services/IRepos/IPassagewayRepo";
import FloorRepo from "../../src/repos/floorRepo";
import FloorService from "../../src/services/floorService";
import { Floor } from "../../src/domain/floor";

chai.use(sinonChai);

describe('Floor Integraion test', () => {

  let floorService: IFloorService;
  let floorController: FloorController;
  let floorRepo: IFloorRepo;
  let buildingRepo: IBuildingRepo;
  let passagewayRepo: IPassagewayRepo;

  beforeEach(() => {
    floorRepo = sinon.createStubInstance(FloorRepo);
    buildingRepo = sinon.createStubInstance(BuildingRepo);

    floorService = new FloorService(floorRepo,buildingRepo,passagewayRepo);
    floorController = new FloorController(floorService);
  });

  it("should show success creting a valid floor", async () => {

    let requestBody = {
      "floorCode": 'B1',
      "floorNumber": '1',
      "width": 9,
      "length": 9,
      "description":"Floor",
      "buildingID":"B"
    }
    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const floorDTO = {
      floorCode: "B1",
      floorNumber: "1",
      width: 9,
      length: 9,
      description:"Floor",
      buildingID:"B"
    };
    const building = Building.create({
      code: 'B',
      name: 'Building 1',
      description: 'Building 1',
      maxLength: 10,
      maxWidth: 10,
    }).getValue();


      (buildingRepo.findByCode as sinon.SinonStub).withArgs("B").resolves(building);
      (floorRepo.findByBuildingId as sinon.SinonStub).withArgs(floorDTO.buildingID).resolves(null);
      (floorRepo.existsByDomainId as sinon.SinonStub).withArgs("FLR0").resolves(false);

      (buildingRepo.save as sinon.SinonStub).withArgs("FLR1").resolves(null);
      await floorController.createFloor(req as Request, res as Response, () => {
        });

      sinon.assert.calledWith(res.status as sinon.SinonStub, 201);

    }
  );
  it("should error when floor already exists", async () => {

      let requestBody = {
        "floorCode": 'B1',
        "floorNumber": '1',
        "width": 9,
        "length": 9,
        "description":"Floor",
        "buildingID":"B"
      }
      let req: Partial<Request> = {
        body: requestBody
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const floorDTO = {
        floorCode: "B1",
        floorNumber: "1",
        width: 9,
        length: 9,
        description:"Floor",
        buildingID:"B"
      };
      const building = Building.create({
        code: 'B',
        name: 'Building 1',
        description: 'Building 1',
        maxLength: 10,
        maxWidth: 10,
      }).getValue();


      (buildingRepo.findByCode as sinon.SinonStub).withArgs("B").resolves(building);
      (floorRepo.findByBuildingId as sinon.SinonStub).withArgs(floorDTO.buildingID).resolves(building);
      (floorRepo.existsByFloorCode as sinon.SinonStub).resolves(true);

      (buildingRepo.save as sinon.SinonStub).withArgs("FLR1").resolves(null);
      await floorController.createFloor(req as Request, res as Response, () => {
      });

      sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

    }
  );

  it("should error when building does not exist", async () => {

      let requestBody = {
        "floorCode": 'B1',
        "floorNumber": '1',
        "width": 9,
        "length": 9,
        "description":"Floor",
        "buildingID":"B"
      }
      let req: Partial<Request> = {
        body: requestBody
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      (buildingRepo.findByCode as sinon.SinonStub).withArgs("B").resolves(null);
      await floorController.createFloor(req as Request, res as Response, () => {
      });

      sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

    }
  );

  it("should error when throwns exception", async () => {

      let requestBody = {
        "floorCode": 'B1',
        "floorNumber": '1',
        "width": 9,
        "length": 9,
        "description":"Floor",
        "buildingID":"B"
      }
      let req: Partial<Request> = {
        body: requestBody
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      (buildingRepo.findByCode as sinon.SinonStub).withArgs("B").rejects(new Error("Error"));
      (buildingRepo.save as sinon.SinonStub).withArgs("FLR1").resolves(null);

      try {
        await floorController.createFloor(req as Request, res as Response, () => {
        });
      }catch (e){
        expect(e).to.equal("Error");
      }

    }
  );
});
