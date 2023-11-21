import { expect } from 'chai';
import { anyOfClass, anything, instance, mock, when } from "ts-mockito";

import IFloorRepo from "../../../src/services/IRepos/IFloorRepo";
import IFloorService from "../../../src/services/IServices/IFloorService";
import FloorService from "../../../src/services/floorService";
import IPassagewayRepo from "../../../src/services/IRepos/IPassagewayRepo";
import { Floor } from "../../../src/domain/floor";
import { Building } from "../../../src/domain/Building";
import { Result } from "../../../src/core/logic/Result";
import IBuildingRepo from "../../../src/services/IRepos/IBuildingRepo";
import { Passageway } from "../../../src/domain/Passageway";



describe('Floor Service', () => {

  it ('should not create if building does not exist', async () => {

      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

    const floorDTO = {
      floorCode: "B",
      floorNumber: 1,
      width:9,
      length: 9,
      description: "descricao",
      buildingID: "B"
    }

      when(buildingRepo.findByCode('B1')).thenResolve(null);

      const result = await floorService.createFloor(floorDTO);
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal("Building not found");

    }
  );

  it ('should not create if floor length>maxlength not exist', async () => {

      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: "B",
        floorNumber: 1,
        width:9,
        length: 9,
        description: "descricao",
        buildingID: "B"
      }
      const building = Building.create({
      code: 'B1',
      name: 'Building 1',
      description: 'Building 1',
      maxLength: 5,
      maxWidth: 10,
    }).getValue();

      when(buildingRepo.findByCode(floorDTO.buildingID)).thenResolve(building);

      const result = await floorService.createFloor(floorDTO);
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal("Floor is too big for building");

    }
  );

  it ('should not create if floor width>maxwidth not exist', async () => {

      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: "B",
        floorNumber: 1,
        width:9,
        length: 9,
        description: "descricao",
        buildingID: "B"
      }
      const building = Building.create({
        code: 'B1',
        name: 'Building 1',
        description: 'Building 1',
        maxLength: 10,
        maxWidth: 5,
      }).getValue();

      when(buildingRepo.findByCode(floorDTO.buildingID)).thenResolve(building);

      const result = await floorService.createFloor(floorDTO);
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal("Floor is too big for building");

    }
  );

  it ('should not create if floor already exists exist', async () => {

      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: "B",
        floorNumber: 1,
        width:9,
        length: 9,
        description: "descricao",
        buildingID: "B"
      }
      const building = Building.create({
        code: 'B1',
        name: 'Building 1',
        description: 'Building 1',
        maxLength: 10,
        maxWidth: 10,
      }).getValue();
      const floor =  Floor.create(
      floorDTO
      ).getValue();

      when(buildingRepo.findByCode(floorDTO.buildingID)).thenResolve(building);
      when(floorRepo.existsByFloorCode(floorDTO.floorCode)).thenResolve(true);

      const result = await floorService.createFloor(floorDTO);
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal("Floor already exists");

    }
  );

  it ('should not create if floor code > 10', async () => {

      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: null,
        floorNumber: 1,
        width:9,
        length: 9,
        description: "descricao",
        buildingID: "B"
      }
      const building = Building.create({
        code: 'B1',
        name: 'Building 1',
        description: 'Building 1',
        maxLength: 10,
        maxWidth: 10,
      }).getValue();

      when(buildingRepo.findByCode(floorDTO.buildingID)).thenResolve(building);
      when(floorRepo.existsByDomainId(anything())).thenResolve(false);

      const result = await floorService.createFloor(floorDTO);
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal("floorCode is null or undefined");

    }
  );


  it ('should not create if floor description > 255 char', async () => {

      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: "B1",
        floorNumber: 1,
        width:9,
        length: 9,
        description: "a".repeat(260),
        buildingID: "B"
      }
      const building = Building.create({
        code: 'B',
        name: 'Building 1',
        description: 'Building 1',
        maxLength: 10,
        maxWidth: 10,
      }).getValue();

      when(buildingRepo.findByCode(floorDTO.buildingID)).thenResolve(building);
      when(floorRepo.existsByDomainId("FLR0")).thenResolve(true);
      when(floorRepo.existsByDomainId("FLR1")).thenResolve(false);

      const result = await floorService.createFloor(floorDTO);
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal("Description cannot be longer than 250 characters");

    }
  );
  it ('should create Successfully', async () => {

      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: "B1",
        floorNumber: 1,
        width:9,
        length: 9,
        description: "descricao",
        buildingID: "B"
      }
      const building = Building.create({
        code: 'B',
        name: 'Building 1',
        description: 'Building 1',
        maxLength: 10,
        maxWidth: 10,
      }).getValue();

      when(buildingRepo.findByCode(floorDTO.buildingID)).thenResolve(building);
      when(floorRepo.existsByDomainId(anything())).thenResolve(false);
      when(buildingRepo.save(anything())).thenResolve(null);

      const result = await floorService.createFloor(floorDTO);

      expect(result.isSuccess).to.equal(true);
      expect(result.getValue().floorCode).to.equal(floorDTO.floorCode);

    }
  );

  it ("should catch error  when creating ", async () => {
    const floorRepo: IFloorRepo = mock<IFloorRepo>();
    const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
    const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
    const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

    const floorDTO = {
      floorCode: "B1",
      floorNumber: 1,
      width:9,
      length: 9,
      description: "descricao",
      buildingID: "B"
    }

      when(buildingRepo.findByCode(floorDTO.buildingID)).thenThrow(new Error("Error"));
      try {
        await floorService.createFloor(floorDTO);
      } catch (error) {
        expect(error.message).to.equal("Error");
      }

    }
  );

  // Update Floor

  it ("should catch error  when updating ", async () => {
      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: "B1",
        floorNumber: 1,
        width:9,
        length: 9,
        description: "descricao",
        buildingID: "B"
      }

      when(floorRepo.findByFloorCode(floorDTO.floorCode)).thenThrow(new Error("Error"));
      try {
        await floorService.updateFloor(floorDTO);
      } catch (error) {
        expect(error.message).to.equal("Error");
      }

    }
  );


  it ('Update floor fail if not exist ', async () => {

      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: "B1",
        floorNumber: 1,
        width:9,
        length: 9,
        description: "descricao",
        buildingID: "B"
      }

      when(floorRepo.findByFloorCode(floorDTO.floorCode)).thenResolve(null);

      const result = await floorService.updateFloor(floorDTO);

      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal("Floor not found");

    }
  );

  it ('Update floor Successfully  ', async () => {

      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: "B1",
        floorNumber: 1,
        width:10,
        length: 10,
        description: "descricao",
        buildingID: "B"
      }
    const floor =  Floor.create(
      floorDTO
    ).getValue();

      when(floorRepo.findByFloorCode(floorDTO.floorCode)).thenResolve(floor);
      when(floorRepo.save(anything())).thenResolve(null);

      const result = await floorService.updateFloor(floorDTO);

      expect(result.isSuccess).to.equal(true);
      expect(result.getValue().floorCode).to.equal(floorDTO.floorCode);

    }
  );

  //List Floors
  it ("should catch error when list ", async () => {
      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: "B1",
        floorNumber: 1,
        width:9,
        length: 9,
        description: "descricao",
        buildingID: "B"
      }

      when(floorRepo.findAllFloorsByBuildingId( floorDTO.buildingID)).thenThrow(new Error("Error"));
      try {
        await floorService.listFloor(floorDTO.buildingID);
      } catch (error) {
        expect(error.message).to.equal("Error");
      }

    }
  );


  it ("list floors fails and handles error ", async () => {
      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));
    when(floorRepo.findAllFloorsByBuildingId(anything())).thenResolve(Result.fail<Floor[]>("teste"))

       const result = await floorService.listFloor(anything());
        expect(result.isFailure).is.to.be.true;

    }
  );

  it ("list floors Sucessfully if theres only 1 floor ", async () => {
      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: "B1",
        floorNumber: 1,
        width:9,
        length: 9,
        description: "descricao",
        buildingID: "B"
      }
    const floor =  Floor.create(
      floorDTO
    ).getValue();

      when(floorRepo.findAllFloorsByBuildingId(floorDTO.buildingID)).thenResolve(Result.ok<Floor[]>([floor]))

      const result = await floorService.listFloor(floorDTO.buildingID);
      expect(result.isSuccess).is.to.be.true;
      expect(result.getValue().length).length.to.equal(1);

    }
  );

  it ("list floors Sucessfully if theres 0 floors ", async () => {
      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));



      when(floorRepo.findAllFloorsByBuildingId(anything())).thenResolve(Result.ok<[]>([]))

      const result = await floorService.listFloor(anything());
      expect(result.isSuccess).is.to.be.true;
      expect(result.getValue().length).length.to.equal(0);

    }
  );

  it ("getFloorsWithPassageway floors Fails and catch exception", async () => {
      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      when(floorRepo.findByBuildingId("B1")).thenThrow(new Error("Error"));

    try {
      await floorService.getFloorsWithPassageway("B1");
    } catch (error) {
      expect(error.message).to.equal("Error");
    }

    }
  );

  it ("getFloorsWithPassageway Fails if building not exist", async () => {
      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));



      when(floorRepo.findByBuildingId("B1")).thenResolve(null);

      const result = await floorService.getFloorsWithPassageway("B1");
      expect(result.isFailure).is.to.be.true;
      expect(result.errorValue()).to.equal("Floor not found");

    }
  );

  it ("getFloorsWithPassageway Fails if Passageway not exist", async () => {
      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

    const floorDTO = {
      floorCode: "B1",
      floorNumber: 1,
      width:5,
      length: 5,
      description: "teste",
      buildingID: "B"
    }
    const floor =  Floor.create(
      floorDTO
    ).getValue();

      when(floorRepo.findByBuildingId("B1")).thenResolve([floor]);
      when(passagewayRepo.findAll()).thenResolve(null);

      const result = await floorService.getFloorsWithPassageway("B1");

      expect(result.isFailure).is.to.be.true;
      expect(result.errorValue()).to.equal("There are no passageways");

    }
  );



  it ("getFloorsWithPassageway Success with 0 passageway", async () => {
      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: "B1",
        floorNumber: 1,
        width:5,
        length: 5,
        description: "teste",
        buildingID: "B"
      }
      const floor =  Floor.create(
        floorDTO
      ).getValue();

    const passagewayDTO= {
      passageCode: "P1",
      floor1: "B3",
      floor2:"C3",
      description: "teste",
    }
    const passageway =  Passageway.create(
      passagewayDTO
    ).getValue();
      when(floorRepo.findByBuildingId("B1")).thenResolve([floor]);
      when(passagewayRepo.findAll()).thenResolve([passageway]);

      const result = await floorService.getFloorsWithPassageway("B1");

      expect(result.isSuccess).is.to.be.true;
      expect(result.getValue().length).to.equal(0);

    }
  );

  it ("getFloorsWithPassageway Success with 1 passageway", async () => {
      const floorRepo: IFloorRepo = mock<IFloorRepo>();
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const passagewayRepo: IPassagewayRepo = mock<IPassagewayRepo>();
      const floorService: IFloorService = new FloorService(instance(floorRepo),instance(buildingRepo),instance(passagewayRepo));

      const floorDTO = {
        floorCode: "B1",
        floorNumber: 1,
        width:5,
        length: 5,
        description: "teste",
        buildingID: "B"
      }
      const floor =  Floor.create(
        floorDTO
      ).getValue();

      const passagewayDTO= {
        passageCode: "P1",
        floor1: "B1",
        floor2:"C2",
        description: "teste",
      }
      const passageway =  Passageway.create(
        passagewayDTO
      ).getValue();
      when(floorRepo.findByBuildingId("B1")).thenResolve([floor]);
      when(passagewayRepo.findAll()).thenResolve([passageway]);

      const result = await floorService.getFloorsWithPassageway("B1");

      expect(result.isSuccess).is.to.be.true;
      expect(result.getValue().length).to.equal(1);

    }
  );

  });

