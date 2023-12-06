import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';
import {Request , Response } from 'express';
import  PassagewayController  from '../../src/controllers/PassagewayController';
import  IPassagewayService  from '../../src/services/IServices/IPassagewayService';
import  PassagewayService  from '../../src/services/PassagewayService';
import IPassagewayRepo from "../../src/services/IRepos/IPassagewayRepo";
import IFloorRepo  from "../../src/services/IRepos/IFloorRepo";
import PassagewayRepo from "../../src/repos/PassagewayRepo";
import FloorRepo from "../../src/repos/floorRepo";
import { Floor } from "../../src/domain/floor/floor";
import {Passageway} from "../../src/domain/Passageway";


chai.use(sinonChai);

describe('PassageWay Integration', () => {

  let passagewayService: IPassagewayService;
  let passagewayController: PassagewayController;
  let passagewayRepo: IPassagewayRepo;
  let floorRepo: IFloorRepo;

  beforeEach(function () {
    passagewayRepo = sinon.createStubInstance(PassagewayRepo);
    floorRepo = sinon.createStubInstance(FloorRepo);
    passagewayService = new PassagewayService(passagewayRepo, floorRepo);
    passagewayController = new PassagewayController(passagewayService as any);
  });

  it('should show success when creating a passageway', async () => {
    let requestBody = {
      passageCode: 'PA1B1',
      floor1: "A1",
      floor2: "B2",
      description: 'description',
    }
    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const floor1DTO = {
      floorCode: "A1",
      floorNumber: 1,
      width: 10,
      length: 10,
      description: "description",
      buildingID: "A"
    };

    const floor1 = Floor.create(floor1DTO).getValue();

    const floor2DTO = {
      floorCode: "B2",
      floorNumber: 1,
      width: 10,
      length: 10,
      description: "description",
      buildingID: "B"
    };

    const floor2 = Floor.create(floor2DTO).getValue();


    (passagewayRepo.existsByCode as sinon.SinonStub).resolves(null);
    (floorRepo.existsByFloorCode as sinon.SinonStub).resolves(floor1);
    (floorRepo.existsByFloorCode as sinon.SinonStub).resolves(floor2);
    (floorRepo.findByFloorCode as sinon.SinonStub).resolves(floor1);
    (floorRepo.findByFloorCode as sinon.SinonStub).resolves(floor2);

    await passagewayController.createPassageway(req as Request, res as Response, () => {
    });

    sinon.assert.calledWith(res.status as sinon.SinonStub, 201);
  });

  it('should show error when creating a passageway when floor1 that does not exist', async () => {

    let requestBody = {
      passageCode: 'PA1B1',
      floor1: null,
      floor2: "B2",
      description: 'description',
    }
    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const floor2DTO = {
      floorCode: "B2",
      floorNumber: 1,
      width: 10,
      length: 10,
      description: "description",
      buildingID: "B"
    };

    const floor2 = Floor.create(floor2DTO).getValue();

    (passagewayRepo.existsByCode as sinon.SinonStub).resolves(false);
    (floorRepo.existsByFloorCode as sinon.SinonStub).withArgs(null).resolves(false);
    (floorRepo.existsByFloorCode as sinon.SinonStub).resolves(floor2);



    await passagewayController.createPassageway(req as Request, res as Response, () => {
    });

    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);
  });

  it('should show error when creating a passageway when floor2 that does not exist', async () => {

    let requestBody = {
      passageCode: 'PA1B1',
      floor1: "A1",
      floor2: null,
      description: 'description',
    }
    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const floor1DTO = {
      floorCode: "A1",
      floorNumber: 1,
      width: 10,
      length: 10,
      description: "description",
      buildingID: "A"
    };

    const floor1 = Floor.create(floor1DTO).getValue();

    (passagewayRepo.existsByCode as sinon.SinonStub).resolves(false);
    (floorRepo.existsByFloorCode as sinon.SinonStub).resolves(floor1);
    (floorRepo.existsByFloorCode as sinon.SinonStub).resolves(false);

    await passagewayController.createPassageway(req as Request, res as Response, () => {
    });

    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);
  });
});
