import { expect } from 'chai';
import { anyOfClass, anything, instance, mock, when } from "ts-mockito";

import { Building }  from '../../../src/domain/building/Building';
import  IBuildingService  from '../../../src/services/IServices/IBuildingService';
import IBuildingRepo from '../../../src/services/IRepos/IBuildingRepo';
import  BuildingService  from '../../../src/services/buildingService';
import { Result } from "../../../src/core/logic/Result";


describe('Building Service', () => {


  it ('should create a building', async () => {

    const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
    const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));

    const buildingDTO = {
      code: 'B1',
      name: 'Building 1',
      description: 'Building 1',
      maxLength: 100,
      maxWidth: 100,
    }

    const building =  Building.create(
      buildingDTO
    ).getValue();

    when(buildingRepo.findByCode('B1')).thenResolve(null);
    when(buildingRepo.save(anything())).thenResolve(building);

    const result = await buildingService.createBuilding(buildingDTO);
    expect(result.isSuccess).to.equal(true);

  }
  );

  it ('should not create a building with an existing code', async () => {

    const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
    const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));

      const buildingDTO = {
        code: 'B1',
        name: 'Building 1',
        description: 'Building 1',
        maxLength: 100,
        maxWidth: 100,
      }

      const building = Building.create({
        code: 'B1',
        name: 'Building 1',
        description: 'Building 1',
        maxLength: 100,
        maxWidth: 100,
      }).getValue();

    when (buildingRepo.findByCode('B1')).thenResolve(building);

    const result = await buildingService.createBuilding(buildingDTO);

    expect(result.errorValue()).to.equal("Building already exists with code = B1");

  }
  );

  it( "should not create a building with an invalid code", async () => {

    const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
    const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));

    const buildingDTO = {
      code: null,
      name: 'Building 1',
      description: 'Building 1',
      maxLength: 100,
      maxWidth: 100,
    }

    when (buildingRepo.findByCode('B1')).thenResolve(null);

    const result = await buildingService.createBuilding(buildingDTO);

    expect(result.isFailure).to.equal(true);

  }
  );

  it ("should fail save a building", async () => {
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));

      const buildingDTO = {
        code: 'B1',
        name: 'Building 1',
        description: 'Building 1',
        maxLength: 100,
        maxWidth: 100,
      }



      when(buildingRepo.findByCode('B1')).thenResolve(null);
      when(buildingRepo.save(anything())).thenResolve(null);

      const result = await buildingService.createBuilding(buildingDTO);
      expect(result.errorValue()).to.equal("Building not saved");


  }
  );
  it ("should catch error  when creating ", async () => {
        const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
        const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));

        const buildingDTO = {
          code: 'B1',
          name: 'Building 1',
          description: 'Building 1',
          maxLength: 100,
          maxWidth: 100,
        }


        when(buildingRepo.findByCode(buildingDTO.code)).thenThrow(new Error("Error"));
        try {
          await buildingService.createBuilding(buildingDTO);
        } catch (error) {
          expect(error.message).to.equal("Error");
        }

      }
    );

  it ("should catch error when getting all ", async () => {
    const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
    const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));



    when(buildingRepo.findAll()).thenThrow(new Error("Error"));
    try {
      await buildingService.getAllBuildings();
    } catch (error) {
      expect(error.message).to.equal("Error");
    }

  }
  );

  it ("should get all buildings", async () => {

    const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
    const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));

    const buildingDTO = {
      code: 'B1',
      name: 'Building 1',
      description: 'Building 1',
      maxLength: 100,
      maxWidth: 100,
    }

    const building =  Building.create(
      buildingDTO
    ).getValue();

    when(buildingRepo.findAll()).thenResolve([building]);

    const result = await buildingService.getAllBuildings();
    expect(result.isSuccess).to.equal(true);


  }
  );

  it ("should fail to get a building by min and max if repo is empty", async () => {

    const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
    const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));


    when(buildingRepo.findByMinMaxFloorNumber(100,100)).thenResolve(Result.fail<Array<Building>>("No buildings found"));

    const result = await buildingService.getBuildingsMinMax("100", "100");
    expect(result.isFailure).to.equal(true);



  }
  );

  it ("should get a building by min and max", async () => {

    const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
    const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));

    const buildingDTO = {
      code: 'B1',
      name: 'Building 1',
      description: 'Building 1',
      maxLength: 100,
      maxWidth: 100,
    }

    const building =  Building.create(
      buildingDTO
      ).getValue();

    when(buildingRepo.findByMinMaxFloorNumber(100,100)).thenResolve(Result.ok<Array<Building>>([building]));

    const result = await buildingService.getBuildingsMinMax("100", "100");
    expect(result.isSuccess).to.equal(true);
  }
  );

  it ("should catch error when trying to get a building by min and max", async () => {

    const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
    const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));

    when(buildingRepo.findByMinMaxFloorNumber(100,100)).thenThrow(new Error("Error"));
    try {
      await buildingService.getBuildingsMinMax("100", "100");
    } catch (error) {
      expect(error.message).to.equal("Error");
    }

  }
  );

  it ("should edit building", async () => {

    const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
    const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));

    const buildingDTO = {
      code: 'B1',
      name: 'Building 1',
      description: 'Building 1',
      maxLength: 100,
      maxWidth: 100,
    }

    const building =  Building.create(
      buildingDTO
      ).getValue();

    when(buildingRepo.findByCode('B1')).thenResolve(building);
    when(buildingRepo.save(anything())).thenResolve(building);

    const result = await buildingService.editBuilding(buildingDTO.code, buildingDTO);
    expect(result.isSuccess).to.equal(true);

  }
  );

  it ("should fail to edit building if building does not exist", async () => {
    const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
    const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));

    const buildingDTO = {
      code: 'B1',
      name: 'Building 1',
      description: 'Building 1',
      maxLength: 100,
      maxWidth: 100,
    }

    const building =  Building.create(
      buildingDTO
    ).getValue();

    when(buildingRepo.findByCode('B1')).thenResolve(null);

    const result = await buildingService.editBuilding(buildingDTO.code, buildingDTO);
    expect(result.isFailure).to.equal(true);



  });

    it ("should fail to edit building if building does not save", async () => {
      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));

      const buildingDTO = {
        code: 'B1',
        name: 'Building 1',
        description: 'Building 1',
        maxLength: 100,
        maxWidth: 100,
      }

      const building =  Building.create(
        buildingDTO
      ).getValue();

      when(buildingRepo.findByCode('B1')).thenResolve(building);
      when(buildingRepo.save(anything())).thenResolve( null);

      const result = await buildingService.editBuilding(buildingDTO.code, buildingDTO);
      expect(result.errorValue()).to.equal("building not saved");



    });

    it ("should catch error when trying to edit building", async () => {

      const buildingRepo: IBuildingRepo = mock<IBuildingRepo>();
      const buildingService: IBuildingService = new BuildingService(instance(buildingRepo));
        const buildingDTO = {
          code: 'B1',
          name: 'Building 1',
          description: 'Building 1',
          maxLength: 100,
          maxWidth: 100,
        }

      when (buildingRepo.findByCode('B1')).thenThrow(new Error("Error"));

      try {
        await buildingService.editBuilding(buildingDTO.code, buildingDTO);
      }
      catch (error) {
        expect(error.message).to.equal("Error");
      }

    }
    );



}
);
