import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingListComponent } from './buildingList.component';
import { BuildingService } from '../../services/building.service';
import { ActivatedRoute } from '@angular/router'; 


describe('BuildingListComponent', () => {
  let component: BuildingListComponent;
  let fixture: ComponentFixture<BuildingListComponent>;
  let mockBuildingService: jest.Mocked<BuildingService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockBuildingService = {
      BuildingList: [],
      createBuilding: jest.fn(),
      listAllBuildings: jest.fn(),
      listBuildings: jest.fn(),
      buildingList: jest.fn(),
      getBuildingByCode: jest.fn(),
      editBuilding: jest.fn(),
    } as jest.Mocked<BuildingService>;

    mockActivatedRoute = {
      
    };

    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });


    fixture = TestBed.createComponent(BuildingListComponent);
    component = fixture.componentInstance;
    
    component.buildingService = mockBuildingService;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


});
