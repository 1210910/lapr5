
import { expect } from 'chai';
import { instance, mock, when } from 'ts-mockito';

import { Room } from '../../../src/domain/Room';
import  IRoomService  from '../../../src/services/IServices/IRoomService';
import IRoomRepo from '../../../src/services/IRepos/IRoomRepo';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import RoomService from '../../../src/services/RoomService';
import { Floor } from '../../../src/domain/floor';


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



});

