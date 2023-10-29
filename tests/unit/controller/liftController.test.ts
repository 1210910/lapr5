import sinon from 'sinon';
import { expect } from 'chai';
import {Request , Response } from 'express';

import LiftController  from '../../../src/controllers/liftController';
import ILiftService  from '../../../src/services/IServices/ILiftService';
import LiftService  from '../../../src/services/liftService';
import { Lift } from '../../../src/domain/Lift';
import { Result } from '../../../src/core/logic/Result';

describe('LiftController', () => {
  let liftController: LiftController;
  let liftService: ILiftService;

  beforeEach(() => {
    liftService = sinon.createStubInstance(LiftService);
    liftController = new LiftController(liftService as any);
  });

  it ('should show success when creating a lift', async () => {
    let requestBody = {
        code: "LA",
        buildingCode: "A",
        floors: ["A1", "A2"],
        brand: "Brand",
        model: "Model",
        serialNumber: "123456789",
        description: "Description"
    }

    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const lift = Lift.create(liftDto).getValue();

    (liftService.createLift as sinon.SinonStub).resolves(Result.ok<Lift>(lift));
    await liftController.createLift(req as Request, res as Response, () => {});
    sinon.assert.calledWith(res.status as sinon.SinonStub, 201);
  });

  it ('should show error when creating a lift', async () => {
    let requestBody = {
        code: "LA",
        buildingCode: "A",
        floors: ["A1", "A2"],
        brand: "Brand",
        model: "Model",
        serialNumber: "123456789",
        description: "Description"
    }

    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const lift = Lift.create(liftDto).getValue();

    (liftService.createLift as sinon.SinonStub).resolves(Result.fail<Lift>(lift));
    await liftController.createLift(req as Request, res as Response, () => {});
    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);
  });

  it ('should catch error when creating a lift', async () => {
    let requestBody = {
        code: "LA",
        buildingCode: "A",
        floors: ["A1", "A2"],
        brand: "Brand",
        model: "Model",
        serialNumber: "123456789",
        description: "Description"
    }

    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    (liftService.createLift as sinon.SinonStub).rejects(new Error("Error"));
    try {
      await liftController.createLift(req as Request, res as Response, () => {});
    }catch (e){
      expect(e).to.equal("Error");
    }
  });

  it ('should show success when updating a lift', async () => {
    let requestBody = {
        code: "LA",
        buildingCode: "A",
        floors: ["A1", "A2"],
        brand: "Brand1",
        model: "Model1",
        serialNumber: "123456789",
        description: "Description1"
    }

    let req: Partial<Request> = {
      body: requestBody,
      params: {
        id: "LA"
      }
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const lift = Lift.create(liftDto).getValue();

    (liftService.updateLift as sinon.SinonStub).resolves(Result.ok<Lift>(lift));
    await liftController.updateLift(req as Request, res as Response, () => {});
    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
  });

  it ('should show error when updating a lift', async () => {
    let requestBody = {
        code: "LA",
        buildingCode: "A",
        floors: ["A1", "A2"],
        brand: "Brand",
        model: "Model",
        serialNumber: "123456789",
        description: "Description"
    }

    let req: Partial<Request> = {
      body: requestBody,
      params: {
        id: "123456789"
      }
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const lift = Lift.create(liftDto).getValue();

    (liftService.updateLift as sinon.SinonStub).resolves(Result.fail<Lift>(lift));
    await liftController.updateLift(req as Request, res as Response, () => {});
    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);
  });

  it ('should catch error when updating a lift', async () => {
    let requestBody = {
        code: "LA",
        buildingCode: "A",
        floors: ["A1", "A2"],
        brand: "Brand",
        model: "Model",
        serialNumber: "123456789",
        description: "Description"
    }

    let req: Partial<Request> = {
      body: requestBody,
      params: {
        id: "123456789"
      }
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    (liftService.updateLift as sinon.SinonStub).rejects(new Error("Error"));
    try {
      await liftController.updateLift(req as Request, res as Response, () => {});
    }catch (e){
      expect(e).to.equal("Error");
    }
  });

  it ('should show success when listing lifts', async () => {
    let req: Partial<Request> = {
      params: {
        buildingCode: "A"
      }
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const lift = Lift.create(liftDto).getValue();

    (liftService.listLift as sinon.SinonStub).resolves(Result.ok<Array<Lift>>([lift]));
    await liftController.listLift(req as Request, res as Response, () => {});
    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
  });

  it ('should show error when listing lifts', async () => {
    let req: Partial<Request> = {
      params: {
        buildingCode: "A"
      }
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const lift = Lift.create(liftDto).getValue();

    (liftService.listLift as sinon.SinonStub).resolves(Result.fail<Array<Lift>>([lift]));
    await liftController.listLift(req as Request, res as Response, () => {});
    sinon.assert.calledWith(res.status as sinon.SinonStub, 404);
  });

  it ('should catch error when listing lifts', async () => {
    let req: Partial<Request> = {
      params: {
        buildingCode: "A"
      }
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    (liftService.listLift as sinon.SinonStub).rejects(new Error("Error"));
    try {
      await liftController.listLift(req as Request, res as Response, () => {});
    }catch (e){
      expect(e).to.equal("Error");
    }
  });
});
