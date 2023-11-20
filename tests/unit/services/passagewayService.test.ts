import {expect} from 'chai';
import {anyOfClass, anything, instance, mock, when} from "ts-mockito";

import {Passageway} from '../../../src/domain/Passageway';
import IPassagewayService from '../../../src/services/IServices/IPassagewayService';
import IPassagewayRepo from '../../../src/services/IRepos/IPassagewayRepo';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import PassagewayService from '../../../src/services/PassagewayService';
import {Result} from "../../../src/core/logic/Result";
import {Floor} from "../../../src/domain/floor";
import IFloorService from "../../../src/services/IServices/IFloorService";
import IBuildingService from "../../../src/services/IServices/IBuildingService";
import {UniqueEntityID} from "../../../src/core/domain/UniqueEntityID";


describe('Passageway Service', () => {

  let floorRepo: IFloorRepo;
  let passagewayRepo: IPassagewayRepo;

  let floorService: IFloorService;
  let passagewayService: IPassagewayService;


  beforeEach(() => {
    floorRepo = mock<IFloorRepo>();
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

    const floor2 = {
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
    when(floorRepo.findByFloorCode(floor1.floorCode)).thenResolve(Floor.create(floor1, new UniqueEntityID('FLR0')).getValue());
    when(floorRepo.findByFloorCode(floor2.floorCode)).thenResolve(Floor.create(floor2, new UniqueEntityID('FLR1')).getValue());

    const result = await passagewayService.createPassageway(passagewayDTO);
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

    const floor2 = {
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

    const result = await passagewayService.createPassageway(passagewayDTO);
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

    const floor2 = {
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

    const result = await passagewayService.createPassageway(passagewayDTO);
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

    const floor2 = {
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

    const result = await passagewayService.createPassageway(passagewayDTO);
    expect(result.isFailure).to.be.true;
  });

  it('should edit a passageway', async function () {


    const floor = Floor.create({
      floorCode: 'A1',
      floorNumber: 1,
      width: 100,
      length: 100,
      description: 'This is a test floor',
      buildingID: 'A'
    }, new UniqueEntityID('A1')).getValue();


    const floor1 = Floor.create({
      floorCode: 'A2',
      floorNumber: 1,
      width: 100,
      length: 100,
      description: 'This is a test floor',
      buildingID: 'A'
    }, new UniqueEntityID('A2')).getValue();

    const floor2 = Floor.create({
      floorCode: 'B1',
      floorNumber: 1,
      width: 50,
      length: 50,
      description: 'This is a test floor',
      buildingID: 'B'
    }, new UniqueEntityID('B1')).getValue();

    const passageway = Passageway.create({
      passageCode: 'PA1B1',
      floor1: 'A1',
      floor2: 'B1',
      description: 'This is a test passageway',
    }, new UniqueEntityID('PA1B1')).getValue();

    const passagewayDTO = {
      passageCode: 'PA2B1',
      floor1: 'A2',
      floor2: 'B1',
      description: 'This is a test passageway',
    };

    when(passagewayRepo.existsByCode(passageway.passageCode)).thenReturn(Promise.resolve(true));
    when(passagewayRepo.existsByCode(passagewayDTO.passageCode)).thenReturn(Promise.resolve(false));
    when(floorRepo.existsByFloorCode(floor1.floorCode)).thenResolve(true);
    when(floorRepo.existsByFloorCode(floor2.floorCode)).thenResolve(true);
    when(passagewayRepo.findByCode(passageway.passageCode)).thenResolve(passageway);
    when(floorRepo.findByFloorCode(floor1.floorCode)).thenResolve(floor1);
    when(floorRepo.findByFloorCode(floor2.floorCode)).thenResolve(floor2);

    const result = await passagewayService.updatePassageway(passageway.passageCode, passagewayDTO);
    expect(result.isSuccess).to.be.true;
  });

  it('should not edit a passageway when the passageway does not exist', async function () {

    const floor = Floor.create({
      floorCode: 'A1',
      floorNumber: 1,
      width: 100,
      length: 100,
      description: 'This is a test floor',
      buildingID: 'A'
    }, new UniqueEntityID('A1')).getValue();

    const floor1 = Floor.create({
      floorCode: 'A2',
      floorNumber: 1,
      width: 100,
      length: 100,
      description: 'This is a test floor',
      buildingID: 'A'
    }, new UniqueEntityID('A2')).getValue();

    const floor2 = Floor.create({
      floorCode: 'B1',
      floorNumber: 1,
      width: 50,
      length: 50,
      description: 'This is a test floor',
      buildingID: 'B'
    }, new UniqueEntityID('B1')).getValue();

    const passageway = Passageway.create({
      passageCode: 'PA1B1',
      floor1: 'A1',
      floor2: 'B1',
      description: 'This is a test passageway',
    }, new UniqueEntityID('PA1B1')).getValue();

    const passagewayDTO = {
      passageCode: 'PA2B1',
      floor1: 'A2',
      floor2: 'B1',
      description: 'This is a test passageway',
    };

    when(passagewayRepo.existsByCode(passageway.passageCode)).thenReturn(Promise.resolve(false));
    when(passagewayRepo.existsByCode(passagewayDTO.passageCode)).thenReturn(Promise.resolve(false));
    when(floorRepo.existsByFloorCode(floor1.floorCode)).thenResolve(true);
    when(floorRepo.existsByFloorCode(floor2.floorCode)).thenResolve(true);
    when(passagewayRepo.findByCode(passageway.passageCode)).thenResolve(passageway);

    const result = await passagewayService.updatePassageway(passageway.passageCode, passagewayDTO);
    expect(result.isFailure).to.be.true;
  });

  it('should not edit a passageway when the new passageway already exists', async function () {

    const floor = Floor.create({
      floorCode: 'A1',
      floorNumber: 1,
      width: 100,
      length: 100,
      description: 'This is a test floor',
      buildingID: 'A'
    }, new UniqueEntityID('A1')).getValue();

    const floor1 = Floor.create({
      floorCode: 'A2',
      floorNumber: 1,
      width: 100,
      length: 100,
      description: 'This is a test floor',
      buildingID: 'A'
    }, new UniqueEntityID('A2')).getValue();

    const floor2 = Floor.create({
      floorCode: 'B1',
      floorNumber: 1,
      width: 50,
      length: 50,
      description: 'This is a test floor',
      buildingID: 'B'
    }, new UniqueEntityID('B1')).getValue();

    const passageway = Passageway.create({
      passageCode: 'PA1B1',
      floor1: 'A1',
      floor2: 'B1',
      description: 'This is a test passageway',
    }, new UniqueEntityID('PA1B1')).getValue();

    const passagewayDTO = {
      passageCode: 'PA2B1',
      floor1: 'A2',
      floor2: 'B1',
      description: 'This is a test passageway',
    };

    when(passagewayRepo.existsByCode(passageway.passageCode)).thenReturn(Promise.resolve(true));
    when(passagewayRepo.existsByCode(passagewayDTO.passageCode)).thenReturn(Promise.resolve(true));
    when(floorRepo.existsByFloorCode(floor1.floorCode)).thenResolve(true);
    when(floorRepo.existsByFloorCode(floor2.floorCode)).thenResolve(true);
    when(passagewayRepo.findByCode(passageway.passageCode)).thenResolve(passageway);

    const result = await passagewayService.updatePassageway(passageway.passageCode, passagewayDTO);
    expect(result.isFailure).to.be.true;
  });

  it('should not edit a passageway when the floor1 does not exist', async function () {

      const floor = Floor.create({
        floorCode: 'A1',
        floorNumber: 1,
        width: 100,
        length: 100,
        description: 'This is a test floor',
        buildingID: 'A'
      }, new UniqueEntityID('A1')).getValue();

      const floor1 = Floor.create({
        floorCode: 'A2',
        floorNumber: 1,
        width: 100,
        length: 100,
        description: 'This is a test floor',
        buildingID: 'A'
      }, new UniqueEntityID('A2')).getValue();

      const floor2 = Floor.create({
        floorCode: 'B1',
        floorNumber: 1,
        width: 50,
        length: 50,
        description: 'This is a test floor',
        buildingID: 'B'
      }, new UniqueEntityID('B1')).getValue();

      const passageway = Passageway.create({
        passageCode: 'PA1B1',
        floor1: 'A1',
        floor2: 'B1',
        description: 'This is a test passageway',
      }, new UniqueEntityID('PA1B1')).getValue();

      const passagewayDTO = {
        passageCode: 'PA2B1',
        floor1: 'A2',
        floor2: 'B1',
        description: 'This is a test passageway',
      };

      when(passagewayRepo.existsByCode(passageway.passageCode)).thenReturn(Promise.resolve(true));
      when(passagewayRepo.existsByCode(passagewayDTO.passageCode)).thenReturn(Promise.resolve(false));
      when(floorRepo.existsByFloorCode(floor1.floorCode)).thenResolve(false);
      when(floorRepo.existsByFloorCode(floor2.floorCode)).thenResolve(true);
      when(passagewayRepo.findByCode(passageway.passageCode)).thenResolve(passageway);

      const result = await passagewayService.updatePassageway(passageway.passageCode, passagewayDTO);
      expect(result.isFailure).to.be.true;
  });

  it('should not edit a passageway when the floor2 does not exist', async function () {

        const floor = Floor.create({
          floorCode: 'A1',
          floorNumber: 1,
          width: 100,
          length: 100,
          description: 'This is a test floor',
          buildingID: 'A'
        }, new UniqueEntityID('A1')).getValue();

        const floor1 = Floor.create({
          floorCode: 'A2',
          floorNumber: 1,
          width: 100,
          length: 100,
          description: 'This is a test floor',
          buildingID: 'A'
        }, new UniqueEntityID('A2')).getValue();

        const floor2 = Floor.create({
          floorCode: 'B1',
          floorNumber: 1,
          width: 50,
          length: 50,
          description: 'This is a test floor',
          buildingID: 'B'
        }, new UniqueEntityID('B1')).getValue();

        const passageway = Passageway.create({
          passageCode: 'PA1B1',
          floor1: 'A1',
          floor2: 'B1',
          description: 'This is a test passageway',
        }, new UniqueEntityID('PA1B1')).getValue();

        const passagewayDTO = {
          passageCode: 'PA2B1',
          floor1: 'A2',
          floor2: 'B1',
          description: 'This is a test passageway',
        };

        when(passagewayRepo.existsByCode(passageway.passageCode)).thenReturn(Promise.resolve(true));
        when(passagewayRepo.existsByCode(passagewayDTO.passageCode)).thenReturn(Promise.resolve(false));
        when(floorRepo.existsByFloorCode(floor1.floorCode)).thenResolve(true);
        when(floorRepo.existsByFloorCode(floor2.floorCode)).thenResolve(false);
        when(passagewayRepo.findByCode(passageway.passageCode)).thenResolve(passageway);

        const result = await passagewayService.updatePassageway(passageway.passageCode, passagewayDTO);
        expect(result.isFailure).to.be.true;
  });

  

  it('should not list any passageways', async function () {
    when(passagewayRepo.findAll()).thenReturn(null);

    const result = await passagewayService.listPassageway();
    expect(result.isFailure).to.be.true;
  });

  it('should handle the errors during the creation of a passageway', async function () {
    const passagewayDTO = {
      passageCode: 'PA1B1',
      floor1: 'A1',
      floor2: 'B1',
      description: 'This is a test passageway',
    };

    when(passagewayRepo.existsByCode(passagewayDTO.passageCode)).thenReject(new Error("Error creating passageway"));
  try {
    const result = await passagewayService.createPassageway(passagewayDTO);
  }catch (e) {
    expect(e.message).to.equal("Error creating passageway");
}
  });

  it('should handle the errors during the update of a passageway', async function () {
    const passagewayDTO = {
      passageCode: 'PA1B1',
      floor1: 'A1',
      floor2: 'B1',
      description: 'This is a test passageway',
    };

    when(passagewayRepo.existsByCode(passagewayDTO.passageCode)).thenReject(new Error("Error updating passageway"));
    try {
      const result = await passagewayService.updatePassageway(passagewayDTO.passageCode, passagewayDTO);
    }catch (e) {
      expect(e.message).to.equal("Error updating passageway");
    }
  });

  it('should handle the errors during the listing of a passageway', async function () {
    when(passagewayRepo.findAll()).thenReject(new Error("Error listing passageway"));
    try {
      const result = await passagewayService.listPassageway();
    }catch (e) {
      expect(e.message).to.equal("Error listing passageway");
    }

  });
});

