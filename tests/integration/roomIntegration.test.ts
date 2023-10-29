import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';
import {Request , Response } from 'express';
import  RoomController  from '../../src/controllers/RoomController';
import  IRoomService  from '../../src/services/IServices/IRoomService';
import  RoomService  from '../../src/services/RoomService';
import IRoomRepo from "../../src/services/IRepos/IRoomRepo";
import IFloorRepo  from "../../src/services/IRepos/IFloorRepo";
import RoomRepo from "../../src/repos/RoomRepo";
import FloorRepo from "../../src/repos/floorRepo";
import { Floor } from "../../src/domain/floor";


chai.use(sinonChai);

describe('Room Controller', () => {

  let roomService : IRoomService;
  let roomController : RoomController;
  let roomRepo : IRoomRepo;
  let floorRepo : IFloorRepo;

  beforeEach(function()  {
    roomRepo = sinon.createStubInstance(RoomRepo);
    floorRepo = sinon.createStubInstance(FloorRepo);
    roomService = new RoomService(roomRepo, floorRepo);
    roomController = new RoomController(roomService as any);
  });

  it ('should show success when creating a room', async () => {
    let requestBody = {
      roomCode: 'roomCode',
      description: 'description',
      width: 1,
      length: 1,
      roomType: 'classroom'
    }
    let req: Partial<Request> = {
      body: requestBody,
      params: {
        floor: "B1"
      }
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };


    const floorDTO = {
      floorCode: "B1",
      floorNumber: 1,
      width: 10,
      length: 10,
      description: "description",
      buildingID: "B"

    }

    const floor = Floor.create(floorDTO).getValue();



    (floorRepo.findByFloorCode as sinon.SinonStub).withArgs(floorDTO.floorCode).resolves(floor);


    await roomController.createRoom(req as Request, res as Response,()=>{});

    sinon.assert.calledWith(res.status as sinon.SinonStub, 201);
  }
  );


  it ('should show error when creating a room with a floor that does not exist', async () => {

      let requestBody = {
        roomCode: 'roomCode',
        description: 'description',
        width: 1,
        length: 1,
        roomType: 'classroom'
      }
      let req: Partial<Request> = {
        body: requestBody,
        params: {
          floor: "B1"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };



      const floorDTO = {
        floorCode: "B1",
        floorNumber: 1,
        width: 10,
        length: 10,
        description: "description",
        buildingID: "B"

      };





      (floorRepo.findByFloorCode as sinon.SinonStub).withArgs(floorDTO.floorCode).resolves(null);


      await roomController.createRoom(req as Request, res as Response,()=>{});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 400)

  }
  );

  it ('should show error when creating a room bigger than floor', async () => {

      let requestBody = {
        roomCode: 'roomCode',
        description: 'description',
        width: 10,
        length: 10,
        roomType: 'classroom'
      }
      let req: Partial<Request> = {
        body: requestBody,
        params: {
          floor: "B1"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };



      const floorDTO = {
        floorCode: "B1",
        floorNumber: 1,
        width: 1,
        length: 1,
        description: "description",
        buildingID: "B"

      };

      const floor = Floor.create(floorDTO).getValue();



      (floorRepo.findByFloorCode as sinon.SinonStub).withArgs(floorDTO.floorCode).resolves(floor);


      await roomController.createRoom(req as Request, res as Response,()=>{});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 400)



  }
  );

  it (" should catch error when creating a room", async () => {

    let requestBody = {
      roomCode: 'roomCode',
      description: 'description',
      width: 1,
      length: 1,
      roomType: 'classroom'
    }
    let req: Partial<Request> = {
      body: requestBody,
      params: {
        floor: "B1"
      }
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };



    const floorDTO = {
      floorCode: "B1",
      floorNumber: 1,
      width: 10,
      length: 10,
      description: "description",
      buildingID: "B"

    };

    (floorRepo.findByFloorCode as sinon.SinonStub).withArgs(floorDTO.floorCode).rejects(new Error("error"));


    try {
      await roomController.createRoom(req as Request, res as Response,()=>{});
    }catch (e) {
      expect(e).to.equal("error");
    }




  }
  );

  it ('should fail create a invalid room', async () => {
      let requestBody = {
        roomCode: 'roomCode',
        description: 'description',
        width: 1,
        length: 1,
        roomType: 'asdasdasd'
      }
      let req: Partial<Request> = {
        body: requestBody,
        params: {
          floor: "B1"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };


      const floorDTO = {
        floorCode: "B1",
        floorNumber: 1,
        width: 10,
        length: 10,
        description: "description",
        buildingID: "B"

      }

      const floor = Floor.create(floorDTO).getValue();



      (floorRepo.findByFloorCode as sinon.SinonStub).withArgs(floorDTO.floorCode).resolves(floor);

      await roomController.createRoom(req as Request, res as Response,()=>{});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

    }
  );
}
);
