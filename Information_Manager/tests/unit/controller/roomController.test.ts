import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';
import {Request , Response } from 'express';
import  RoomController  from '../../../src/controllers/RoomController';
import  IRoomService  from '../../../src/services/IServices/IRoomService';
import  RoomService  from '../../../src/services/RoomService';
import { Room } from '../../../src/domain/room/Room';
import { Result } from '../../../src/core/logic/Result';



chai.use(sinonChai);

describe('Room Controller', () => {
  let roomService : IRoomService;
  let roomController : RoomController;

  beforeEach(function()  {
    roomService = sinon.createStubInstance(RoomService);
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
          floor: "1"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };



      const roomDTO = {
        roomCode: 'roomCode',
        floor: "1",
        description: 'description',
        width: 1,
        length: 1,
        roomType: 'classroom'
      };

      // stub the service method

      const room = Room.create(roomDTO).getValue();

      const roomOrError = Result.ok<Room>(room);

      // mock the service method
      (roomService.createRoom as sinon.SinonStub).resolves(roomOrError);

      const roomC = roomService.createRoom(roomDTO,"1");




      await roomController.createRoom(req as Request, res as Response, () => {});


      sinon.assert.calledWith(res.status as sinon.SinonStub, 201);

  });

  it ('should show error when creating a room', async () => {

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
        floor: "1"
      }
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };



    const roomDTO = {
      roomCode: 'roomCode',
      floor: "1",
      description: 'description',
      width: 1,
      length: 1,
      roomType: 'classroom'
    };

    // stub the service method

    const room = Room.create(roomDTO).getValue();


    // mock the service method
    (roomService.createRoom as sinon.SinonStub).resolves(Result.fail<Room>("error"));

    const roomC = roomService.createRoom(roomDTO,"1");




    await roomController.createRoom(req as Request, res as Response, () => {});


    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

  });

  it ('should catch error ', async () => {

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
          floor: "1"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };



      const roomDTO = {
        roomCode: 'roomCode',
        floor: "1",
        description: 'description',
        width: 1,
        length: 1,
        roomType: 'classroom'
      };

      // stub the service method

      const room = Room.create(roomDTO).getValue();


      // mock the service method
      (roomService.createRoom as sinon.SinonStub).rejects(new Error("error"));

      const roomC = roomService.createRoom(roomDTO,"1");


      try {
        await roomController.createRoom(req as Request, res as Response, () => {});
      } catch (error) {
        expect(error).to.equal("error");
      }

  }
  );

});
