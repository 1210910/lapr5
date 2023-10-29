import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';
import {Request , Response } from 'express';
import BuildingController  from '../../src/controllers/BuildingController';
import IBuildingService  from '../../src/services/IServices/IBuildingService';
import BuildingService  from '../../src/services/buildingService';
import { Building } from '../../src/domain/Building';
import { Result } from '../../src/core/logic/Result';
import IBuildingRepo from "../../src/services/IRepos/IBuildingRepo";
import BuildingRepo from "../../src/repos/buildingRepo";
import { anything } from "ts-mockito";

chai.use(sinonChai);

describe('BuildingController', () => {

  let buildingService : IBuildingService;
  let buildingController : BuildingController;
  let buildingRepo : IBuildingRepo;

  beforeEach(() => {
    buildingRepo = sinon.createStubInstance(BuildingRepo);
    buildingService = new BuildingService(buildingRepo);
    buildingController = new BuildingController(buildingService);
  });

  it ("should show success creting a valid building", async () => {

      let requestBody = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findByCode as sinon.SinonStub ).withArgs("B").resolves(null);
      ( buildingRepo.save as sinon.SinonStub ).resolves(building);

      await buildingController.createBuilding(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 201);

  }
  );

  it ("should fail creating a building when building already exists", async () => {
      let requestBody = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findByCode as sinon.SinonStub ).withArgs("B").resolves(building);


      await buildingController.createBuilding(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

  }
  );

  it ("should fail creating a building when building is invalid", async () => {

    let requestBody = {
      code: "B",
      name: null,
      description: "Building",
      maxLength: 100,
      maxWidth: 100,
    }
    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const buildingDTO = {
      code: "B",
      name: "Building",
      description: "Building",
      maxLength: 100,
      maxWidth: 100,
    };

    const building = Building.create(buildingDTO).getValue();

    ( buildingRepo.findByCode as sinon.SinonStub ).withArgs("B").resolves(null);


    await buildingController.createBuilding(req as Request, res as Response,() => {});

    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);
  }
  );

  it ("should fail when save", async () => {
      let requestBody = {
        code: "B",
        name: "null",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findByCode as sinon.SinonStub ).withArgs("B").resolves(null);

      ( buildingRepo.save as sinon.SinonStub ).resolves(null);

      await buildingController.createBuilding(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

  }
  );

  it ("should catch error when creating", async () => {
      let requestBody = {
        code: "B",
        name: "null",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findByCode as sinon.SinonStub ).rejects(new Error("Error"));

      ( buildingRepo.save as sinon.SinonStub ).resolves(null);

     try {
       await buildingController.createBuilding(req as Request, res as Response,() => {});
      }catch (e) {
        expect(e).to.equal("Error");
     }


  }
  );


  it ("should show success getting all building", async () => {

      let requestBody = {
        code: "B",
        name: "null",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findAll as sinon.SinonStub ).resolves([building]);

      await buildingController.getAllBuildings(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 200);

    }
  );

  it ("should fail when getting all buildings", async () => {

      let requestBody = {
        code: "B",
        name: "null",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findAll as sinon.SinonStub ).resolves(null);

      await buildingController.getAllBuildings(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 404);

  }
  );

  it ("should catch error when getting all buildings", async () => {

      let requestBody = {
        code: "B",
        name: "null",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findAll as sinon.SinonStub ).rejects(new Error("Error"));

      try {
        await buildingController.getAllBuildings(req as Request, res as Response,() => {});
      }
      catch (e) {
        expect(e).to.equal("Error");
      }

  }
  );

  it ("should show success getting valid buildings Min Max", async () => {

      let requestBody = {
        code: "B",
        name: "null",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody,
        params: {
          min: "1",
          max: "2"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findByMinMaxFloorNumber as sinon.SinonStub ).resolves(Result.ok([building]));

      await buildingController.getBuildingsMinMax(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
  }
  );

  it ("should fail when getting buildings Min Max", async () => {

      let requestBody = {
        code: "B",
        name: "null",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody,
        params: {
          min: "1",
          max: "2"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findByMinMaxFloorNumber as sinon.SinonStub ).resolves(Result.fail("Error"));

      await buildingController.getBuildingsMinMax(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 404);
  }
  );

  it ("should catch error when getting buildings Min Max", async () => {

    let requestBody = {
        code: "B",
        name: "null",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody,
        params: {
          min: "1",
          max: "2"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findByMinMaxFloorNumber as sinon.SinonStub ).rejects(new Error("Error"));

     try {
       await buildingController.getBuildingsMinMax(req as Request, res as Response,() => {});
     }catch (e) {
       expect(e).to.equal("Error");
     }
  }
  );

  it ("should show success edit a building", async () => {

      let requestBody = {
        code: "B",
        name: "null",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody,
        params: {
          code: "B"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findByCode as sinon.SinonStub ).withArgs("B").resolves(building);
      ( buildingRepo.save as sinon.SinonStub ).resolves(Result.ok(building));

      await buildingController.editBuilding(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 200);

  }
  );

  it ("should fail when editing a building", async () => {


      let requestBody = {
        code: "B",
        name: "null",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody,
        params: {
         code : "B"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findByCode as sinon.SinonStub ).withArgs("B").resolves(null);

      await buildingController.editBuilding(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

  }
  );

  it ("should fail saving when editing a building", async () => {

      let requestBody = {
        code: "B",
        name: "null",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody,
        params: {
        code: "B"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findByCode as sinon.SinonStub ).resolves(building);

      ( buildingRepo.save as sinon.SinonStub ).resolves(null);


      await buildingController.editBuilding(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 400)


  }
  );

  it ("should catch error when editing a building", async () => {

      let requestBody = {
        code: "B",
        name: "null",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      }
      let req: Partial<Request> = {
        body: requestBody,
        params: {
          min: "1",
          max: "2"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

      const buildingDTO = {
        code: "B",
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
      };

      const building = Building.create(buildingDTO).getValue();

      ( buildingRepo.findByCode as sinon.SinonStub ).rejects(new Error("Error"));



      try {
        await buildingController.editBuilding(req as Request, res as Response,() => {});
      }
      catch (e) {
        expect(e).to.equal("Error");
      }

  }
  );





}
);
