
import { expect } from 'chai';
import { instance, mock, when } from 'ts-mockito';

import { Room } from '../../../src/domain/room/Room';
import  IRoomService  from '../../../src/services/IServices/IRoomService';
import IRoomRepo from '../../../src/services/IRepos/IRoomRepo';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import RoomService from '../../../src/services/RoomService';
import { Floor } from '../../../src/domain/floor/floor';


describe('Room service test', () => {

it ('should fail if the floor doesnt exist', async () => {


    const roomDTO = {
        roomCode: 'roomCode',
        floor: "",
        description: 'description',
        width: 1,
        length: 1,
        roomType: 'classroom'
    };
    const floorCode = 'Floo23';

    const roomRepo = mock<IRoomRepo>();
    const floorRepo = mock<IFloorRepo>();

    when(floorRepo.findByFloorCode(floorCode)).thenResolve(undefined);

    const roomService: IRoomService = new RoomService(instance(roomRepo), instance(floorRepo));

    expect((await roomService.createRoom(roomDTO,floorCode)).error).to.equal( "Floor does not exist");

});

it ('should fail if the room is bigger than the floor', async () => {

  const roomDTO = {
      roomCode: 'roomCode',
      floor: "",
      description: 'description',
      width: 10,
      length: 10,
      roomType: 'classroom'
  };

  const floorDTO = {
    floorCode: 'Floo23',
    floorNumber: 1,
    width: 1,
    length: 1,
    description: 'description',
    buildingID: 'building'

  }

  const floorCode = 'Floo23';

  const roomRepo = mock<IRoomRepo>();
  const floorRepo = mock<IFloorRepo>();

  const floor = Floor.create(floorDTO).getValue();

  when(floorRepo.findByFloorCode(floorCode)).thenResolve(floor);

  const roomService: IRoomService = new RoomService(instance(roomRepo), instance(floorRepo));

  expect((await roomService.createRoom(roomDTO,floorCode)).error).to.equal( "Room is bigger than floor");

});

it ('should create a room', async () => {

const roomDTO = {
      roomCode: 'roomCode',
      floor: "",
      description: 'description',
      width: 1,
      length: 1,
      roomType: 'classroom'
  };

  const floorDTO = {
    floorCode: 'Floo23',
    floorNumber: 1,
    width: 2,
    length: 2,
    description: 'description',
    buildingID: 'building'

  }

  const floorCode = 'Floo23';

  const roomRepo = mock<IRoomRepo>();
  const floorRepo = mock<IFloorRepo>();

  const floor = Floor.create(floorDTO).getValue();

  when(floorRepo.findByFloorCode(floorCode)).thenResolve(floor);

  const roomService: IRoomService = new RoomService(instance(roomRepo), instance(floorRepo));

  expect((await roomService.createRoom(roomDTO,floorCode)).error).to.equal( null);


}
);

it ("should fail if the room is not valid", async () => {
    const roomDTO = {
      roomCode: 'roomCode',
      floor: "",
      description: 'description',
      width: 1,
      length: 1,
      roomType: 'lorem'
    };

    const floorDTO = {
      floorCode: 'Floo23',
      floorNumber: 1,
      width: 2,
      length: 2,
      description: 'description',
      buildingID: 'building'

    }

    const floorCode = 'Floo23';

    const roomRepo = mock<IRoomRepo>();
    const floorRepo = mock<IFloorRepo>();

    const floor = Floor.create(floorDTO).getValue();

    when(floorRepo.findByFloorCode(floorCode)).thenResolve(floor);

    const roomService: IRoomService = new RoomService(instance(roomRepo), instance(floorRepo));

    expect((await roomService.createRoom(roomDTO,floorCode)).error).to.equal("Room type must be classroom, laboratory, anphitheater, office or other.");


  }
);

it ("should catch excption", async () => {

    const roomDTO = {
      roomCode: 'roomCode',
      floor: "",
      description: 'description',
      width: 1,
      length: 1,
      roomType: 'lorem'
    };


    const floorCode = 'Floo23';

    const roomRepo = mock<IRoomRepo>();
    const floorRepo = mock<IFloorRepo>();


    when(floorRepo.findByFloorCode(floorCode)).thenThrow(new Error("Test error"));

    const roomService: IRoomService = new RoomService(instance(roomRepo), instance(floorRepo));

  try{
    await roomService.createRoom(roomDTO,floorCode);
  }catch (error){
    expect(error.message).to.equal("Test error");
  }

}
);


});

