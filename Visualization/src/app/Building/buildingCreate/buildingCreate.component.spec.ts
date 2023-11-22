import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingCreateComponent } from './buildingCreate.component';
import { BuildingService } from '../../services/building.service';
import { ActivatedRoute } from '@angular/router'; 


describe('RobotEnableDisableComponent', () => {
  let component: BuildingCreateComponent;
  let fixture: ComponentFixture<BuildingCreateComponent>;
  let mockBuildingService: jest.Mocked<BuildingService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockBuildingService = {
      BuildingList: [],
      createBuilding: jest.fn(),
    } as any;

    mockActivatedRoute = {
      
    };

    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });


    fixture = TestBed.createComponent(BuildingCreateComponent);
    component = fixture.componentInstance;
    
    component.buildingService = mockBuildingService;

  });

  it('should create the component', async() => {
    global.alert = jest.fn();
    expect(component).toBeTruthy();
  });

  it('should show alert if form is invalid', () => {
    const alertSpy = jest.spyOn(window, 'alert');
    component.createBuilding();
    expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
  });
  


});
