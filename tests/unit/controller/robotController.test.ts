import chai, { expect } from "chai";
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import IRobotService from "../../../src/services/IServices/IRobotService";
import RobotController from "../../../src/controllers/robotController";
import RobotService from "../../../src/services/robotService";
import { NextFunction, Request, Response } from "express";
import { Floor } from "../../../src/domain/floor";
import { Result } from "../../../src/core/logic/Result";
import { Robot } from "../../../src/domain/robot";
import IRobotDTO from "../../../src/dto/IRobotDTO";



chai.use(sinonChai);

describe('Robot Controller', () => {
  let robotService : IRobotService;
  let robotController : RobotController;

  beforeEach(function()  {
    robotService = sinon.createStubInstance(RobotService);
    robotController = new RobotController(robotService as any);
  });

  it ('Create a robot should return correct code', async () => {
    let requestBody = {
      "code": 'R1',
      "name": 'ROBOT 1',
      "type": "type",
      "enabled": true,
      "description":"robot description",
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

    const robotDTO = {
      code: "R1",
      name: "ROBOT 1",
      type: "type",
      enabled: true,
      description:"robot description"
    }as IRobotDTO;

    const robot= Robot.create(robotDTO).getValue();
    // stub the service method
    (robotService.createRobot as sinon.SinonStub).resolves(Result.ok<Robot>(robot));
    // Act
    await robotController.createRobot(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 201);
    sinon.assert.calledWith(res.json as sinon.SinonStub, sinon.match({
      "code": req.body.code,
      "name": req.body.name,
      "type": req.body.type,
      "enabled": req.body.enabled,
      "description": req.body.description
    }));

  });

  it ('Create a robot should return correct code when failed to create', async () => {
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

    const robotDTO = {
      code: "R1",
      name: "ROBOT 1",
      type: "type",
      enabled: true,
      description:"robot description"
    }as IRobotDTO;

    const robot= Robot.create(robotDTO).getValue();
    // stub the service method
    (robotService.createRobot as sinon.SinonStub).resolves(Result.fail<Robot>(robot));
    // Act
    await robotController.createRobot(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

  });

  it ('Create a robot should catch exception when failed to create', async () => {
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
    // stub the service method
    (robotService.createRobot as sinon.SinonStub).rejects(new Error("error"));;
    // Act
    try {
      await robotController.createRobot(req as Request, res as Response, next as NextFunction);
    }catch (error) {
        expect(error).to.equal("error");
    }


  });

  it ('Enable Disable a robot should catch exception when failed to enable or disabled', async () => {
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
    // stub the service method
    (robotService.enableDisableRobot as sinon.SinonStub).rejects(new Error("error"));
    // Act
    try {
      await robotController.enableDisableRobot(req as Request, res as Response, next as NextFunction);
    }catch (error) {
      expect(error).to.equal("error");
    }


  });

  it ('Enable Disable a robot should return correct code when failed to enable or disabled', async () => {
    let requestBody = {
    }
    let req: Partial<Request> = {
      body: requestBody,
      params: {
        code: "R1"
      },
    }
    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    let next: Partial<NextFunction> = () => { };

    const robotDTO = {
      code: "R1",
      name: "ROBOT 1",
      type: "type",
      enabled: true,
      description:"robot description"
    }as IRobotDTO;

    const robot= Robot.create(robotDTO).getValue();
    // stub the service method
    (robotService.enableDisableRobot as sinon.SinonStub).resolves(Result.fail<Robot>(robot));
    // Act
    await robotController.enableDisableRobot(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

  });

  it ('Enable Disable a robot should Successfully return correct code when failed to enable or disabled', async () => {
    let requestBody = {
    }
    let req: Partial<Request> = {
      body: requestBody,
      params: {
        code: "R1"
      },
    }
    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    let next: Partial<NextFunction> = () => { };

    const robotDTO = {
      code: "R1",
      name: "ROBOT 1",
      type: "type",
      enabled: true,
      description:"robot description"
    }as IRobotDTO;

    const robot= Robot.create(robotDTO).getValue();
    // stub the service method
    (robotService.enableDisableRobot as sinon.SinonStub).resolves(Result.ok<Robot>(robot));
    // Act
    await robotController.enableDisableRobot(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 204);

  });

  it ('List a robot should Succcess return correct code and robots', async () => {
    let requestBody = {
      "code": 'R1',
      "name": 'ROBOT 1',
      "type": "type",
      "enabled": true,
      "description":"robot description",
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

    const robotDTO = {
      code: "R1",
      name: "ROBOT 1",
      type: "type",
      enabled: true,
      description:"robot description"
    }as IRobotDTO;

    const robot= Robot.create(robotDTO).getValue();
    // stub the service method
    (robotService.listRobot as sinon.SinonStub).resolves(Result.ok<Robot>(robot));
    // Act
    await robotController.listRobot(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
    sinon.assert.calledWith(res.json as sinon.SinonStub, sinon.match({
      "code": req.body.code,
      "name": req.body.name,
      "type": req.body.type,
      "enabled": req.body.enabled,
      "description": req.body.description
    }));

  });

  it ('List a robot should Fail return correct code and robots', async () => {
    let requestBody = {
      "code": 'R1',
      "name": 'ROBOT 1',
      "type": "type",
      "enabled": true,
      "description":"robot description",
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

    const robotDTO = {
      code: "R1",
      name: "ROBOT 1",
      type: "type",
      enabled: true,
      description:"robot description"
    }as IRobotDTO;

    const robot= Robot.create(robotDTO).getValue();
    // stub the service method
    (robotService.listRobot as sinon.SinonStub).resolves(Result.fail<Robot>(robot));
    // Act
    await robotController.listRobot(req as Request, res as Response,next as NextFunction);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 404);

  });

  it ('List a robot should catch exception when failed list robots', async () => {
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
    // stub the service method
    (robotService.listRobot as sinon.SinonStub).rejects(new Error("error"));
    // Act
    try {
      await robotController.listRobot(req as Request, res as Response,next as NextFunction);
    }catch (error){
      expect(error).to.equal("error");
    }

  });

});
