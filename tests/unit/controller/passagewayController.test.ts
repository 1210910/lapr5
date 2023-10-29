import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';
import {Request , Response } from 'express';
import { Result } from '../../../src/core/logic/Result';
import  PassagewayController  from '../../../src/controllers/PassagewayController';
import  IPassagewayService  from '../../../src/services/IServices/IPassagewayService';
import  PassagewayService  from '../../../src/services/passagewayService';
import { Passageway } from '../../../src/domain/Passageway';
import {Room} from "../../../src/domain/Room";
import {Building} from "../../../src/domain/Building";

chai.use(sinonChai);

describe('Passageway Controller', () => {
  let passagewayService : IPassagewayService;
  let passagewayController : PassagewayController;

  beforeEach(function()  {
    passagewayService = sinon.createStubInstance(PassagewayService);
    passagewayController = new PassagewayController(passagewayService as any);
  });

  it ('should show success when creating a passageway', async () => {
      let requestBody = {
        passagewayCode: 'PA1B1',
        floor1: "A1",
        floor2: "B2",
        description: 'description',
      }
      let req: Partial<Request> = {
        body: requestBody,
        params: {
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };
    const passagewayDTO = {
      passageCode: 'PA1B1',
      floor1: "A1",
      floor2: "B2",
      description: 'description',
    };

    // stub the service method

    const passageway = Passageway.create(passagewayDTO).getValue();

    const passagewayOrError = Result.ok<Passageway>(passageway);

    // mock the service method
    (passagewayService.createPassageway as sinon.SinonStub).resolves(passagewayOrError);

    const passagewayC = passagewayService.createPassageway(passagewayDTO);




    await passagewayController.createPassageway(req as Request, res as Response, () => {});


    sinon.assert.calledWith(res.status as sinon.SinonStub, 201);

  });

  it ('should show error when creating a passageway', async () => {

    let requestBody = {
      passagewayCode: 'PA1B1',
      floor1: "A1",
      floor2: "B2",
      description: 'description',
    }
    let req: Partial<Request> = {
      body: requestBody,
      params: {
      }
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };



    const passagewayDTO = {
      passageCode: 'PA1B1',
      floor1: "A1",
      floor2: "B2",
      description: 'description',
    };

    // stub the service method

    const passageway = Passageway.create(passagewayDTO).getValue();


    // mock the service method
    (passagewayService.createPassageway as sinon.SinonStub).resolves(Result.fail<Room>("error"));

    const passagewayC = passagewayService.createPassageway(passagewayDTO);




    await passagewayController.createPassageway(req as Request, res as Response, () => {});


    sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

  });

  it ('should catch error ', async () => {

      let requestBody = {
        passagewayCode: 'PA1B1',
        floor1: "A1",
        floor2: "B2",
        description: 'description',
      }
      let req: Partial<Request> = {
        body: requestBody,
        params: {
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };



    const passagewayDTO = {
      passageCode: 'PA1B1',
      floor1: "A1",
      floor2: "B2",
      description: 'description',
    };

      // stub the service method

      const passageway = Passageway.create(passagewayDTO).getValue();


      // mock the service method
      (passagewayService.createPassageway as sinon.SinonStub).rejects(new Error("error"));

      const passagewayC = passagewayService.createPassageway(passagewayDTO);


      try {
        await passagewayController.createPassageway(req as Request, res as Response, () => {});
      } catch (error) {
        expect(error).to.equal("error");
      }

    }
  );

  it ('should show success when getting all buildings', async () => {

      let req: Partial<Request> = {
        params: {
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

    const passagewayDTO = {
      passageCode: 'PA1B1',
      floor1: "A1",
      floor2: "B2",
      description: 'description',
    };

      const passageway = Passageway.create(passagewayDTO).getValue();

      // stub the service method
      (passagewayService.listPassageway as sinon.SinonStub).resolves(Result.ok<Array<Passageway>>([passageway]));

      await passagewayController.listPassageway(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 200);

    }
  );

  it ("should fail when getting all passageways", async () => {
    let req: Partial<Request> = {
      params: {
        code: "PA1B1"
      }
    }

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };

    const passagewayDTO = {
      passageCode: 'PA1B1',
      floor1: "A1",
      floor2: "B2",
      description: 'description',
    };


    const passageway = Passageway.create(passagewayDTO).getValue();

    // stub the service method
    (passagewayService.listPassageway as sinon.SinonStub).resolves(Result.fail<Array<Building>>("error"));

    await passagewayController.listPassageway(req as Request, res as Response,() => {});

    sinon.assert.calledWith(res.status as sinon.SinonStub, 404);
  });

  it("should catch error when getting all passageways", async () => {
      let req: Partial<Request> = {
        params: {
          code: "PA1B1"
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

    const passagewayDTO = {
      passageCode: 'PA1B1',
      floor1: "A1",
      floor2: "B2",
      description: 'description',
    };

      const passageway = Passageway.create(passagewayDTO).getValue();

      // stub the service method
      (passagewayService.listPassageway as sinon.SinonStub).rejects(new Error("error"));

      try {
        await passagewayController.listPassageway(req as Request, res as Response,() => {});
      }
      catch (error) {
        expect(error).to.equal("error");
      }


    }
  );

  it ('should edit success when getting a passageway by code', async () => {

      let req: Partial<Request> = {
        params: {
          code: "PA1B1"
        },
        body: {
          passagewayCode: 'PA1B1',
          floor1: "A1",
          floor2: "B2",
          description: 'description',
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

    const passagewayDTO = {
      passageCode: 'PA1B1',
      floor1: "A1",
      floor2: "B2",
      description: 'description',
    };

      const passageway = Passageway.create(passagewayDTO).getValue();

      // stub the service method

      (passagewayService.updatePassageway as sinon.SinonStub).resolves(Result.ok<Passageway>(passageway));

      await passagewayController.updatePassageway(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 200);

    }
  );
  it ("should fail when getting a passageway by code", async () => {

      let req: Partial<Request> = {
        params: {
          code: "PA1B1"
        },
        body: {
          passagewayCode: 'PA1B1',
          floor1: "A1",
          floor2: "B2",
          description: 'description',
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

    const passagewayDTO = {
      passageCode: 'PA1B1',
      floor1: "A1",
      floor2: "B2",
      description: 'description',
    };

      const passageway = Passageway.create(passagewayDTO).getValue();

      // stub the service method

      (passagewayService.updatePassageway as sinon.SinonStub).resolves(Result.fail<Passageway>(passageway));

      await passagewayController.updatePassageway(req as Request, res as Response,() => {});

      sinon.assert.calledWith(res.status as sinon.SinonStub, 400);

    }
  );

  it ('should catch error when getting a building by code', async () => {

      let req: Partial<Request> = {
        params: {
          code: "PA1B1"
        },
        body: {
          passagewayCode: 'PA1B1',
          floor1: "A1",
          floor2: "B2",
          description: 'description',
        }
      }

      let res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      };

    const passagewayDTO = {
      passageCode: 'PA1B1',
      floor1: "A1",
      floor2: "B2",
      description: 'description',
    };

      const passageway = Passageway.create(passagewayDTO).getValue();

      // stub the service method

      (passagewayService.updatePassageway as sinon.SinonStub).rejects(new Error("error"));

      try {
        await passagewayController.updatePassageway(req as Request, res as Response,() => {});
      }
      catch (error) {
        expect(error).to.equal("error");
      }

    }
  );

});

