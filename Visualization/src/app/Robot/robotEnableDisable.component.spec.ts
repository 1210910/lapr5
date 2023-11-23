import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RobotEnableDisableComponent } from './robotEnableDisable.component';
import { RobotService } from '../services/robot.service';
import { ActivatedRoute } from '@angular/router'; 


describe('RobotEnableDisableComponent', () => {
  let component: RobotEnableDisableComponent;
  let fixture: ComponentFixture<RobotEnableDisableComponent>;
  let mockRobotService: jest.Mocked<RobotService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockRobotService = {
      RobotList: [],
      createRobot: jest.fn(),
      listAllRobots: jest.fn(),
      toggleRobotStatus: jest.fn(),
      robotList: jest.fn(),
      getRobotByCode: jest.fn()

    } as jest.Mocked<RobotService>;

    mockActivatedRoute = {
      
    };

    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });


    fixture = TestBed.createComponent(RobotEnableDisableComponent);
    component = fixture.componentInstance;
    
    component.robotService = mockRobotService;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should list robots on ngOnInit', async() => {
    const mockRobots  = [{code:"R1", name: 'Robot1', type:"TypeCleaning", enabled: true, description:"description" }];
    mockRobotService.listAllRobots.mockReturnValue(Promise.resolve(mockRobots));
    
    await component.ngOnInit();
    expect(component.robots).toEqual(mockRobots);
  });

  it('should catch exeption on list robots', async() => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    mockRobotService.listAllRobots.mockRejectedValue(new Error('Error'));
    
    await component.ngOnInit();
    
    expect(console.error).toHaveBeenCalledWith('Erro ao listar robôs:', new Error('Error'));
    console.error = originalConsoleError;
  });

  it('should call sevice with right parameters toggleRobotStatus', async() => {
    const robotCode = '123';
    const enable = true;
    mockRobotService.toggleRobotStatus.mockReturnValue(Promise.resolve(null));

    const reloadMock = jest.fn();
    const alertMock = jest.fn();

    Object.defineProperty(window, 'location', { value: { reload: reloadMock } });
    Object.defineProperty(window, 'alert', { value: alertMock });

    await component.toggleRobotStatus(robotCode, enable);

    expect(reloadMock).toHaveBeenCalledTimes(1);
    expect(mockRobotService.toggleRobotStatus).toHaveBeenCalledWith(robotCode, enable);
  });

  it('should catch error in toggleRobotStatus', async() => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    const robotCode = '123';
    const enable = true;
    mockRobotService.toggleRobotStatus.mockRejectedValue(new Error('Error'));

    await component.toggleRobotStatus(robotCode, enable);

    expect(console.error).toHaveBeenCalledWith('Erro ao tentar alterar o status do robô ' + robotCode);
    console.error = originalConsoleError;
  });


});
