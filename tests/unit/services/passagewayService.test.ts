import {expect} from 'chai';
import {anyOfClass, anything, instance, mock, when} from "ts-mockito";

import {Passageway} from '../../../src/domain/Passageway';
import IPassagewayService from '../../../src/services/IServices/IPassagewayService';
import IPassagewayRepo from '../../../src/services/IRepos/IPassagewayRepo';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import PassagewayService from '../../../src/services/passagewayService';
import {Result} from "../../../src/core/logic/Result";
import {Floor} from "../../../src/domain/floor";
import {Building} from "../../../src/domain/Building";
import IBuildingRepo from "../../../src/services/IRepos/IBuildingRepo";
import IFloorService from "../../../src/services/IServices/IFloorService";
import IBuildingService from "../../../src/services/IServices/IBuildingService";
import {UniqueEntityID} from "../../../src/core/domain/UniqueEntityID";


describe('Passageway Service', () => {

  let floorRepo: IFloorRepo;
  let passagewayRepo: IPassagewayRepo;

  let floorService: IFloorService;
  let passagewayService: IPassagewayService;


  beforeEach(() => {
    floorRepo= mock<IFloorRepo>();
    passagewayRepo = mock<IPassagewayRepo>();
    passagewayService = new PassagewayService(instance(passagewayRepo), instance(floorRepo));
    floorService = mock<IFloorService>();
  });


  it('should create a valid passageway with Service mocked results', async function () {

    const floor1 = {
      floorCode: 'A1',
      floorNumber: 1,
      width: 100,
      length: 100,
      description: 'This is a test floor',
      buildingID: 'A'
    };

    const floor2 ={
      floorCode: 'B1',
      floorNumber: 1,
      width: 50,
      length: 50,
      description: 'This is a test floor',
      buildingID: 'B'
    };

    const passagewayDTO = {
      passageCode: 'PA1B1',
      floor1: 'A1',
      floor2: 'B1',
      description: 'This is a test passageway',
    };

    when(passagewayRepo.existsByCode(passagewayDTO.passageCode)).thenReturn(Promise.resolve(false));
    when(floorRepo.existsByFloorCode(floor1.floorCode)).thenResolve(true);
    when(floorRepo.existsByFloorCode(floor2.floorCode)).thenResolve(true);

    const result =await passagewayService.createPassageway(passagewayDTO);
    expect(result.isSuccess).to.be.true;
  });

  it('should not create a passageway when the passageway already exists', async function () {

      const floor1 = {
        floorCode: 'A1',
        floorNumber: 1,
        width: 100,
        length: 100,
        description: 'This is a test floor',
        buildingID: 'A'
      };

      const floor2 ={
        floorCode: 'B1',
        floorNumber: 1,
        width: 50,
        length: 50,
        description: 'This is a test floor',
        buildingID: 'B'
      };

      const passagewayDTO = {
        passageCode: 'PA1B1',
        floor1: 'A1',
        floor2: 'B1',
        description: 'This is a test passageway',
      };

      when(passagewayRepo.existsByCode(passagewayDTO.passageCode)).thenReturn(Promise.resolve(true));
      when(floorRepo.existsByFloorCode(floor1.floorCode)).thenResolve(true);
      when(floorRepo.existsByFloorCode(floor2.floorCode)).thenResolve(true);

      const result =await passagewayService.createPassageway(passagewayDTO);
      expect(result.isFailure).to.be.true;
  });

  it('should not create a passageway when the floor1 does not exist', async function () {

      const floor1 = {
        floorCode: 'A1',
        floorNumber: 1,
        width: 100,
        length: 100,
        description: 'This is a test floor',
        buildingID: 'A'
      };

      const floor2 ={
        floorCode: 'B1',
        floorNumber: 1,
        width: 50,
        length: 50,
        description: 'This is a test floor',
        buildingID: 'B'
      };

      const passagewayDTO = {
        passageCode: 'PA1B1',
        floor1: 'A1',
        floor2: 'B1',
        description: 'This is a test passageway',
      };

      when(passagewayRepo.existsByCode(passagewayDTO.passageCode)).thenReturn(Promise.resolve(false));
      when(floorRepo.existsByFloorCode(floor1.floorCode)).thenResolve(false);
      when(floorRepo.existsByFloorCode(floor2.floorCode)).thenResolve(true);

      const result =await passagewayService.createPassageway(passagewayDTO);
      expect(result.isFailure).to.be.true;
  });

  it('should not create a passageway when the floor2 does not exist', async function () {

        const floor1 = {
          floorCode: 'A1',
          floorNumber: 1,
          width: 100,
          length: 100,
          description: 'This is a test floor',
          buildingID: 'A'
        };

        const floor2 ={
          floorCode: 'B1',
          floorNumber: 1,
          width: 50,
          length: 50,
          description: 'This is a test floor',
          buildingID: 'B'
        };

        const passagewayDTO = {
          passageCode: 'PA1B1',
          floor1: 'A1',
          floor2: 'B1',
          description: 'This is a test passageway',
        };

        when(passagewayRepo.existsByCode(passagewayDTO.passageCode)).thenReturn(Promise.resolve(false));
        when(floorRepo.existsByFloorCode(floor1.floorCode)).thenResolve(true);
        when(floorRepo.existsByFloorCode(floor2.floorCode)).thenResolve(false);

        const result =await passagewayService.createPassageway(passagewayDTO);
        expect(result.isFailure).to.be.true;
  });
});

