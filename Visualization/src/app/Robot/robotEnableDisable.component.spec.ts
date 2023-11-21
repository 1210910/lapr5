import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RobotEnableDisableComponent } from './robotEnableDisable.component';
import { RobotService } from '../services/robot.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute


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
    } as jest.Mocked<RobotService>;

    mockActivatedRoute = {
      // Mock any properties or methods used by the component
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

  /*it('should toggle robot status', () => {
    const robotCode = '123';
    const enable = true;
    mockRobotService.toggleRobotStatus.mockReturnValue(of(null));

    component.toggleRobotStatus(robotCode, enable);

    expect(mockRobotService.toggleRobotStatus).toHaveBeenCalledWith(robotCode, enable);
  });
*/
  // Add more test cases as needed
});
