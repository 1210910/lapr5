import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';
import {Request , Response } from 'express';
import BuildingController  from '../../../src/controllers/BuildingController';
import IBuildingService  from '../../../src/services/IServices/IBuildingService';
import BuildingService  from '../../../src/services/BuildingService';
import { Building } from '../../../src/domain/Building';
import { Result } from '../../../src/core/logic/Result';


chai.use(sinonChai);

describe('Building Controller', () => {
  let buildingService : IBuildingService;
  let buildingController : BuildingController;

  beforeEach(function()  {
    buildingService = sinon.createStubInstance(BuildingService);
    buildingController = new BuildingController(buildingService as any);

  });

  it ('should show success when creating a building', async () => {
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

      // stub the service method
    (buildingService.createBuilding as sinon.SinonStub).resolves(Result.ok<Building>(building));

    await buildingController.createBuilding(req as Request, res as Response,() => {});

    sinon.assert.calledWith(res.status as sinon.SinonStub, 201);



  });

  it ("should fail when creating a building", async () => {

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

    // stub the service method
    (buildingService.createBuilding as sinon.SinonStub).resolves(Result.fail<Building>(building));

    await buildingController.createBuilding(req as Request, res as Response,() => {});

    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);


  });

  it ("should catch error when creating a building", async () => {
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

      // stub the service method
      (buildingService.createBuilding as sinon.SinonStub).rejects(new Error("error"));

      try {
        await buildingController.createBuilding(req as Request, res as Response,() => {});
      }
      catch (error) {
        expect(error).to.equal("error");
      }


  }
  );

  it ('should show success when getting all buildings', async () => {

      let req: Partial<Request> = {
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

      // stub the service method
    (buildingService.getAllBuildings as sinon.SinonStub).resolves(Result.ok<Array<Building>>([building]));

    await buildingController.getAllBuildings(req as Request, res as Response,() => {});

    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);

  }
  );

  it ("should fail when getting all buildings", async () => {
    let req: Partial<Request> = {
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

    // stub the service method
    (buildingService.getAllBuildings as sinon.SinonStub).resolves(Result.fail<Array<Building>>("error"));

    await buildingController.getAllBuildings(req as Request, res as Response,() => {});

    sinon.assert.calledWith(res.status as sinon.SinonStub, 404);
  }
  );

  it("should catch error when getting all buildings", async () => {
      let req: Partial<Request> = {
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

      // stub the service method
      (buildingService.getAllBuildings as sinon.SinonStub).rejects(new Error("error"));

     try {
      await buildingController.getAllBuildings(req as Request, res as Response,() => {});
     }
      catch (error) {
        expect(error).to.equal("error");
      }


  }
  );


  it ('should show success when getting a building min max', async () => {

      let req: Partial<Request> = {
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

      // stub the service method

    (buildingService.getBuildingsMinMax as sinon.SinonStub).resolves(Result.ok<Array<Building>>([building]));

    await buildingController.getBuildingsMinMax(req as Request, res as Response,() => {});

    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);

  }
  );
  it ("should fail when getting a building min max", async () => {
      let req: Partial<Request> = {
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

      // stub the service method

      (buildingService.getBuildingsMinMax as sinon.SinonStub).resolves(Result.fail<Array<Building>>([building]));

      await buildingController.getBuildingsMinMax(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 404);

    }
  );
  it ('should catch error when getting a building min max', async () => {

    let req: Partial<Request> = {
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

    // stub the service method

    (buildingService.getBuildingsMinMax as sinon.SinonStub).rejects(new Error("error"));

    try {
      await buildingController.getBuildingsMinMax(req as Request, res as Response,() => {});
    }
    catch (error) {
      expect(error).to.equal("error");
    }

    }
  );

  it ('should edit success when getting a building by code', async () => {

    let req: Partial<Request> = {
      params: {
        code: "B"
      },
      body: {
        name: "Building",
        description: "Building",
        maxLength: 100,
        maxWidth: 100,
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

    // stub the service method

    (buildingService.editBuilding as sinon.SinonStub).resolves(Result.ok<Building>(building));

    await buildingController.editBuilding(req as Request, res as Response,() => {});

    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);

    }

  );

  it ("should fail when getting a building by code", async () => {

      let req: Partial<Request> = {
        params: {
          code: "B"
        },
        body: {
          name: "Building",
          description: "Building",
          maxLength: 100,
          maxWidth: 100,
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

      // stub the service method

      (buildingService.editBuilding as sinon.SinonStub).resolves(Result.fail<Building>(building));

      await buildingController.editBuilding(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

  }
  );

  it ('should catch error when getting a building by code', async () => {

      let req: Partial<Request> = {
        params: {
          code: "B"
        },
        body: {
          name: "Building",
          description: "Building",
          maxLength: 100,
          maxWidth: 100,
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

      // stub the service method

      (buildingService.editBuilding as sinon.SinonStub).rejects(new Error("error"));

      try {
        await buildingController.editBuilding(req as Request, res as Response,() => {});
      }
      catch (error) {
        expect(error).to.equal("error");
      }

  }
  );


});
