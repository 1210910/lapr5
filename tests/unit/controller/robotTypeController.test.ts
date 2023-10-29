import sinon from 'sinon';
import { expect } from 'chai';
import {Request , Response } from 'express';

import RobotTypeController  from '../../../src/controllers/robotTypeController';
import IRobotTypeService  from '../../../src/services/IServices/IRobotTypeService';
import RobotTypeService  from '../../../src/services/robotTypeService';
import { RobotType } from '../../../src/domain/robotType';
import { Result } from '../../../src/core/logic/Result';

describe('RobotTypeController', () => {
  let robotTypeController: RobotTypeController;
  let robotTypeService: IRobotTypeService;

  beforeEach(() => {
    robotTypeService = sinon.createStubInstance(RobotTypeService);
    robotTypeController = new RobotTypeController(robotTypeService as any);
  });

  it ('should show success when creating a robotType', async () => {
    let requestBody = {
      code: "RT-001",
      brand: "brand",
      model: "model",
      description: "This is a test robot",
      taskTypeCode: "classroom"
    }

    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const robotTypeDto = {
      code: "RT-001",
      brand: "brand",
      model: "model",
      description: "This is a test robot",
      taskTypeCode: "classroom"
    };

    const robotType = RobotType.create(robotTypeDto).getValue();

    (robotTypeService.createRobotType as sinon.SinonStub).resolves(Result.ok<RobotType>(robotType));
    await robotTypeController.createRobotType(req as Request, res as Response, () => {});
    sinon.assert.calledWith(res.status as sinon.SinonStub, 201);
  });

  it ('should show error when creating a robotType', async () => {
    let requestBody = {
      code: "RT-001",
      brand: "brand",
      model: "model",
      description: "This is a test robot",
      taskTypeCode: "classroom"
    }

    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const robotTypeDto = {
      code: "RT-001",
      brand: "brand",
      model: "model",
      description: "This is a test robot",
      taskTypeCode: "classroom"
    };

    const robotType = RobotType.create(robotTypeDto).getValue();

    (robotTypeService.createRobotType as sinon.SinonStub).resolves(Result.fail<RobotType>(robotType));
    await robotTypeController.createRobotType(req as Request, res as Response, () => {});
    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);
  });

  it ('should catch error when creating a lift', async () => {
    let requestBody = {
      code: "RT-001",
      brand: "brand",
      model: "model",
      description: "This is a test robot",
      taskTypeCode: "classroom"
    }

    let req: Partial<Request> = {
      body: requestBody
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    (robotTypeService.createRobotType as sinon.SinonStub).rejects(new Error("Error"));
    try {
      await robotTypeController.createRobotType(req as Request, res as Response, () => {});
    }catch (e){
      expect(e).to.equal("Error");
    }
  });
});
