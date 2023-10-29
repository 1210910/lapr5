import { expect } from 'chai';
import { anyOfClass, anything, instance, mock, when } from "ts-mockito";
import IRobotRepo from "../../../src/services/IRepos/IRobotRepo";
import IRobotTypeRepo from "../../../src/services/IRepos/IRobotTypeRepo";
import IRobotService from "../../../src/services/IServices/IRobotService";
import RobotService from "../../../src/services/robotService";
import { Robot } from "../../../src/domain/robot";
import sinon from "sinon";
import jsonPatch from 'json-patch';
import IFloorRepo from "../../../src/services/IRepos/IFloorRepo";
import IBuildingRepo from "../../../src/services/IRepos/IBuildingRepo";
import IPassagewayRepo from "../../../src/services/IRepos/IPassagewayRepo";
import IFloorService from "../../../src/services/IServices/IFloorService";
import FloorService from "../../../src/services/floorService";
import { Result } from "../../../src/core/logic/Result";
import { Floor } from "../../../src/domain/floor";
import IBuildingService from "../../../src/services/IServices/IBuildingService";
import BuildingService from "../../../src/services/buildingService";

describe('Robot Service', () => {

  it ('Create robot should fail if already exists', async () => {

      const robotRepo: IRobotRepo = mock<IRobotRepo>();
      const robotTypeRepo: IRobotTypeRepo = mock<IRobotTypeRepo>();
      const robotService: IRobotService = new RobotService(instance(robotRepo),instance(robotTypeRepo));

      const robotDTO = {
        code: "R1",
        name: "Robot number 1",
        type:"type",
        enabled: false,
        description: "description"
      }

      when(robotRepo.existsByCode('R1')).thenResolve(true);

      const result = await robotService.createRobot(robotDTO);
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal("Robot already exists");

    }
  );
  it ('Create robot should fail if robotType does not exist', async () => {

      const robotRepo: IRobotRepo = mock<IRobotRepo>();
      const robotTypeRepo: IRobotTypeRepo = mock<IRobotTypeRepo>();
      const robotService: IRobotService = new RobotService(instance(robotRepo),instance(robotTypeRepo));

      const robotDTO = {
        code: "R1",
        name: "Robot number 1",
        type:"type",
        enabled: false,
        description: "description"
      }

      when(robotRepo.existsByCode('R1')).thenResolve(null);
      when(robotTypeRepo.existsByCode('type')).thenResolve(null);

      const result = await robotService.createRobot(robotDTO);
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal("Robot type doesn't exist");

    }
  );
  it ('Create robot should fail if create fails', async () => {

      const robotRepo: IRobotRepo = mock<IRobotRepo>();
      const robotTypeRepo: IRobotTypeRepo = mock<IRobotTypeRepo>();
      const robotService: IRobotService = new RobotService(instance(robotRepo),instance(robotTypeRepo));

      const robotDTO = {
        code: "R1",
        name: "Robot number 1",
        type:"RT-001",
        enabled: false,
        description: "description".repeat(260)
      }

      when(robotRepo.existsByCode('R1')).thenResolve(null);
      when(robotTypeRepo.existsByCode('RT-001')).thenResolve(true);

      const result = await robotService.createRobot(robotDTO);
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal("Description property cannot have more than 255 letters");


    }
  );
  it ('Create robot should Success if create', async () => {

      const robotRepo: IRobotRepo = mock<IRobotRepo>();
      const robotTypeRepo: IRobotTypeRepo = mock<IRobotTypeRepo>();
      const robotService: IRobotService = new RobotService(instance(robotRepo),instance(robotTypeRepo));

      const robotDTO = {
        code: "R1",
        name: "Robot number 1",
        type:"RT-001",
        enabled: true,
        description: "description"
      }

      when(robotRepo.existsByCode('R1')).thenResolve(null);
      when(robotTypeRepo.existsByCode('RT-001')).thenResolve(true);
      when(robotRepo.save(anything())).thenResolve(null)
      const result = await robotService.createRobot(robotDTO);
      expect(result.isSuccess).to.equal(true);
    });

  it ("Create robot catch error when creating ", async () => {
    const robotRepo: IRobotRepo = mock<IRobotRepo>();
    const robotTypeRepo: IRobotTypeRepo = mock<IRobotTypeRepo>();
    const robotService: IRobotService = new RobotService(instance(robotRepo),instance(robotTypeRepo));

    const robotDTO = {
      code: "R1",
      name: "Robot number 1",
      type:"type",
      enabled: false,
      description: "description"
    }

    when(robotRepo.existsByCode('R1')).thenThrow(new Error("Error"));
      try {
        await robotService.createRobot(robotDTO);
      } catch (error) {
        expect(error.message).to.equal("Error");
      }

    }
  );

  //Enable Disable Robot

  it ("Enabled Disable robot Fails with robot does not exist  ", async () => {
      const robotRepo: IRobotRepo = mock<IRobotRepo>();
      const robotTypeRepo: IRobotTypeRepo = mock<IRobotTypeRepo>();
      const robotService: IRobotService = new RobotService(instance(robotRepo),instance(robotTypeRepo));

      const robotDTO = {
        code: "R1",
        name: "Robot number 1",
        type:"type",
        enabled: false,
        description: "description"
      }
      //const robot = Robot.create(robotDTO).getValue();

      when(robotRepo.findByCode('R1')).thenResolve(null);

      const result = await robotService.enableDisableRobot("R1",robotDTO);
      expect(result.isFailure).to.equal(true);
    }
  );

  it ("Enabled Disable robot Fails if save fails", async () => {
      const robotRepo: IRobotRepo = mock<IRobotRepo>();
      const applyStub = sinon.stub(jsonPatch, 'apply');
      const robotTypeRepo: IRobotTypeRepo = mock<IRobotTypeRepo>();
      const robotService: IRobotService = new RobotService(instance(robotRepo),instance(robotTypeRepo));

      const robotDTO = {
        code: "R1",
        name: "Robot number 1",
        type:"type",
        enabled: true,
        description: "description"
      }
      const robot = Robot.create(robotDTO).getValue();

      when(robotRepo.findByCode('R1')).thenResolve(robot);
      when(robotRepo.save(anything())).thenResolve(null);
      applyStub.returns(robot);
      const result = await robotService.enableDisableRobot("R1",robotDTO);
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal("Error in save");
      applyStub.restore();
    }
  );

  it ("Enabled Disable robot Successfully ", async () => {
      const robotRepo: IRobotRepo = mock<IRobotRepo>();
      const applyStub = sinon.stub(jsonPatch, 'apply');
      const robotTypeRepo: IRobotTypeRepo = mock<IRobotTypeRepo>();
      const robotService: IRobotService = new RobotService(instance(robotRepo),instance(robotTypeRepo));

      const robotDTO = {
        code: "R1",
        name: "Robot number 1",
        type:"type",
        enabled: true,
        description: "description"
      }
      const robot = Robot.create(robotDTO).getValue();

      when(robotRepo.findByCode('R1')).thenResolve(robot);
      when(robotRepo.save(anything())).thenResolve(robot);
      applyStub.returns(robot);
      const result = await robotService.enableDisableRobot("R1",robotDTO);
      expect(result.isSuccess).to.equal(true);
      applyStub.restore();
    }
  );

  //List
  it ("List Robot should catch exception when occurred ", async () => {
    const robotRepo: IRobotRepo = mock<IRobotRepo>();
    const robotTypeRepo: IRobotTypeRepo = mock<IRobotTypeRepo>();
    const robotService: IRobotService = new RobotService(instance(robotRepo),instance(robotTypeRepo));

    const robotDTO = {
      code: "R1",
      name: "Robot number 1",
      type:"RT-001",
      enabled: true,
      description: "description"
    }

      when(robotRepo.findAll()).thenThrow(new Error("Error"));
      try {
        await robotService.listRobot();
      } catch (error) {
        expect(error.message).to.equal("Error");
      }

    }
  );
  it ("List Robot fail in findAll returns error ", async () => {
      const robotRepo: IRobotRepo = mock<IRobotRepo>();
      const robotTypeRepo: IRobotTypeRepo = mock<IRobotTypeRepo>();
      const robotService: IRobotService = new RobotService(instance(robotRepo),instance(robotTypeRepo));

      const robotDTO = {
        code: "R1",
        name: "Robot number 1",
        type:"RT-001",
        enabled: true,
        description: "description"
      }

      when(robotRepo.findAll()).thenResolve(Result.fail<Robot[]>("teste"))

      const result =await robotService.listRobot();
      expect(result.isFailure).is.to.be.true;


    }
  );
  it ("List Robot Successfuly ", async () => {
      const robotRepo: IRobotRepo = mock<IRobotRepo>();
      const robotTypeRepo: IRobotTypeRepo = mock<IRobotTypeRepo>();
      const robotService: IRobotService = new RobotService(instance(robotRepo),instance(robotTypeRepo));

      const robotDTO = {
        code: "R1",
        name: "Robot number 1",
        type:"RT-001",
        enabled: true,
        description: "description"
      }
      const robot = Robot.create(robotDTO).getValue();

      when(robotRepo.findAll()).thenResolve(Result.ok<Robot[]>([robot]));

      const result =await robotService.listRobot();
      expect(result.isSuccess).is.to.be.true;
      expect(result.getValue().length).length.to.equal(1);

    }
  );


});
