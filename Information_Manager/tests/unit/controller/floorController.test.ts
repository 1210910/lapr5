import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';
import { NextFunction, Request, Response } from "express";
import IFloorService from "../../../src/services/IServices/IFloorService";
import FloorController from "../../../src/controllers/floorController";
import FloorService from "../../../src/services/floorService";
import { Result } from "../../../src/core/logic/Result";
import { Floor } from "../../../src/domain/floor/floor";

chai.use(sinonChai);

describe('Floor Controller', () => {
  let floorService : IFloorService;
  let floorController : FloorController;

  beforeEach(function()  {
    floorService = sinon.createStubInstance(FloorService);
    floorController = new FloorController(floorService as any);
  });

  it ('Create a floor should return correct code', async () => {
    let requestBody = {
      "floorCode": 'B1',
      "floorNumber": '1',
      "width": 9,
      "length": 9,
      "description":"Floor",
      "buildingID":"B"
    }
    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    let next: Partial<NextFunction> = () => { };

    const floorDTO = {
      floorCode: "B1",
      floorNumber: "1",
      width: 9,
      length: 9,
      description:"Floor",
      buildingID:"B"
    };

    const floor= Floor.create(floorDTO).getValue();
    // stub the service method
    (floorService.createFloor as sinon.SinonStub).resolves(Result.ok<Floor>(floor));
    // Act
    await floorController.createFloor(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 201);
    /*sinon.assert.calledWith(res.json as sinon.SinonStub, sinon.match({
      "floorCode": req.body.floorCode,
      "floorNumber": req.body.floorNumber,
      "width": req.body.width,
      "length": req.body.length,
      "description": req.body.description,
      "buildingID":req.body.buildingID
    }));*/

  });

  it ('Create a floor should return correct code when Failing', async () => {
    let requestBody = {
    }
    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    let next: Partial<NextFunction> = () => { };

    const floorDTO = {
      floorCode: "B1",
      floorNumber: "1",
      width: 9,
      length: 9,
      description:"Floor",
      buildingID:"B"
    };

    const floor= Floor.create(floorDTO).getValue();
    // stub the service method
    (floorService.createFloor as sinon.SinonStub).resolves(Result.fail<Floor>(floor));
    // Act
    await floorController.createFloor(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

  });

  it ('Create floor should return Exception if finds error', async () => {
    let requestBody = {}
    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    let next: Partial<NextFunction> = () => { };

    const floorDTO = {
      floorCode: "B1",
      floorNumber: "1",
      width: 9,
      length: 9,
      description:"Floor",
      buildingID:"B"
    };

    const floor= Floor.create(floorDTO).getValue();
    // Stub
    (floorService.createFloor as sinon.SinonStub).rejects(new Error("error"));
    // Act
    try {
      await floorController.createFloor(req as Request, res as Response,next as NextFunction);
    }
    catch (error) {
      expect(error).to.equal("error");
    }

  });

  it ('Edit a floor should return correct code', async () => {
    let requestBody = {
    }
    let req: Partial<Request> = {
      params: {
        code: "B1"
      },
      body: requestBody
    }
    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    let next: Partial<NextFunction> = () => { };

    const floorDTO = {
      floorCode: "B1",
      floorNumber: "1",
      width: 9,
      length: 9,
      description:"Floor",
      buildingID:"B"
    };

    const floor= Floor.create(floorDTO).getValue();
    // stub the service method
    (floorService.updateFloor as sinon.SinonStub).resolves(Result.ok<Floor>(floor));
    // Act
    await floorController.updateFloor(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);

  });

  it ('Edit floor should catch error ', async () => {

    let req: Partial<Request> = {
      params: {
        code: "B"
      },
      body: {
      }
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const floorDTO = {
      floorCode: "B1",
      floorNumber: "1",
      width: 9,
      length: 9,
      description:"Floor",
      buildingID:"B"
    };

    const floor = Floor.create(floorDTO).getValue();

    // stub the service method

    (floorService.updateFloor as sinon.SinonStub).rejects(new Error("error"));

    try {
      await floorController.updateFloor(req as Request, res as Response,() => {});
    }
    catch (error) {
      expect(error).to.equal("error");
    }

  });


  it ('Edit a floor should return correct code when Failing', async () => {
    let requestBody = {
    }
    let req: Partial<Request> = {
      params: {
        code: "B1"
      },
      body: requestBody
    }
    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    let next: Partial<NextFunction> = () => { };

    const floorDTO = {
      floorCode: "B1",
      floorNumber: "1",
      width: 9,
      length: 9,
      description:"Floor",
      buildingID:"B"
    };

    const floor= Floor.create(floorDTO).getValue();
    // stub the service method
    (floorService.updateFloor as sinon.SinonStub).resolves(Result.fail<Floor>(floor));
    // Act
    await floorController.updateFloor(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

  });


  it ('List floors should return correct code', async () => {
    let requestBody = {
      "floorCode": 'B2',
      "floorNumber": '2',
      "width": 5,
      "length": 5,
      "description":"Floor",
      "buildingID":"B"
    }
    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    let next: Partial<NextFunction> = () => { };

    const floorDTO = {
      floorCode: "B1",
      floorNumber: "1",
      width: 9,
      length: 9,
      description:"Floor",
      buildingID:"B"
    };

    const floor= Floor.create(floorDTO).getValue();
    // stub the service method
    (floorService.listAllFloor as sinon.SinonStub).resolves(Result.ok<[Floor]>([floor]));
    // Act
    await floorController.listAllFloor(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);

  });

  it ('List floors should return correct code when failing', async () => {
    let requestBody = {
      params: {
        code: "B"
      },
    }
    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    let next: Partial<NextFunction> = () => { };

    const floorDTO = {
      floorCode: "B1",
      floorNumber: "1",
      width: 9,
      length: 9,
      description:"Floor",
      buildingID:"B"
    };

    const floor= Floor.create(floorDTO).getValue();
    // stub the service method
    (floorService.listAllFloor as sinon.SinonStub).resolves(Result.fail<[Floor]>([floor]));
    // Act
    await floorController.listAllFloor(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 404);


  });

  it ('List floor should catch error ', async () => {
    let req: Partial<Request> = {
      body: {
      }
    }
    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    (floorService.listFloor as sinon.SinonStub).rejects(new Error("error"));

    try {
      await floorController.listFloor(req as Request, res as Response,() => {});
    }
    catch (error) {
      expect(error).to.equal("error");
    }
  });

  /*it ('Get Floors with passageway fails if error in find list', async () => {
    let requestBody = {

    }
    let req: Partial<Request> = {
      params: {
        code: "B1"
      },
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    let next: Partial<NextFunction> = () => { };

    const floorDTO = {
      floorCode: "B1",
      floorNumber: "1",
      width: 9,
      length: 9,
      description:"Floor",
      buildingID:"B"
    };

    const floor= Floor.create(floorDTO).getValue();
    // stub the service method
    (floorService.getFloorsWithPassageway as sinon.SinonStub).resolves(Result.fail<[Floor]>([floor]));
    // Act
    await floorController.getFloorsWithPassageway(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 404);

  });

  it ('Get Floors with passageway success ', async () => {
    let requestBody = {

    }
    let req: Partial<Request> = {
      params: {
        code: "B1"
      },
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    let next: Partial<NextFunction> = () => { };

    const floorDTO = {
      floorCode: "B1",
      floorNumber: "1",
      width: 9,
      length: 9,
      description:"Floor",
      buildingID:"B"
    };

    const floor= Floor.create(floorDTO).getValue();
    // stub the service method
    (floorService.getFloorsWithPassageway as sinon.SinonStub).resolves(Result.ok<[Floor]>([floor]));
    // Act
    await floorController.getFloorsWithPassageway(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);

  });

  it ('Get floor should catch error ', async () => {
    let req: Partial<Request> = {
      body: {
      },
      params: {
        code: "B1"
      }
    }
    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    (floorService.getFloorsWithPassageway as sinon.SinonStub).rejects(new Error("error"));

    try {
      await floorController.listFloor(req as Request, res as Response,() => {});
    }
    catch (error) {
      expect(error).to.equal("error");
    }
  });*/
});
