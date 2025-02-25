import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { BuildingListComponent } from './buildingList.component';
import { BuildingService } from '../../services/building.service';
import { ActivatedRoute } from '@angular/router'; 
import { BuildingInfo } from '../building-info/buildingInfo';

describe('BuildingListComponent', () => {
  let component: BuildingListComponent;
  let fixture: ComponentFixture<BuildingListComponent>;
  let mockBuildingService: jest.Mocked<BuildingService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockBuildingService = {
      buildingListInfo: [],
      listAllBuildings: jest.fn(),
      listBuildings: jest.fn(),
      buildingList: jest.fn()
    } as any;

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

  it('should fetch building list on initialization', async() => {
    const building1: BuildingInfo = {
      code: 'B',
      name: 'Office Building',
      description: 'A modern building',
      maxLength: 15,
      maxWidth: 15,
    };
    
    const building2: BuildingInfo = {
      code: 'C',
      name: 'Building of engineering',
      description: 'A tall tower',
      maxLength: 12,
      maxWidth: 12,
    };
    const mockBuildingList = [building1,building2];
    mockBuildingService.listAllBuildings.mockResolvedValue(mockBuildingList);

    mockBuildingService.buildingListInfo.push(building1);
    mockBuildingService.buildingListInfo.push(building2);

    await component.ngOnInit();

    expect(mockBuildingService.listAllBuildings).toHaveBeenCalled();
    expect(mockBuildingService.buildingList).toHaveBeenCalledWith(mockBuildingList);
    expect(component.buildingListInfo).toEqual(mockBuildingList);

  });

  it('should filter CallMethod list', async() => {
    const building1: BuildingInfo = {
      code: 'B',
      name: 'Office Building',
      description: 'A modern building',
      maxLength: 15,
      maxWidth: 15,
    };

    const building2: BuildingInfo = {
      code: 'C',
      name: 'Building of engineering',
      description: 'A tall tower',
      maxLength: 12,
      maxWidth: 12,
    };
    const mockValue = 'min:maxLength:10;maxWidth:20;';

    const mockBuildingList = [building1,building2];
    mockBuildingService.listBuildings.mockResolvedValue(mockBuildingList);

    mockBuildingService.buildingListInfo.push(building1);
    mockBuildingService.buildingListInfo.push(building2);

    await component.CallMethod(mockValue);

    expect(mockBuildingService.listBuildings).toHaveBeenCalled();
    expect(mockBuildingService.buildingList).toHaveBeenCalledWith(mockBuildingList);
    expect(component.buildingListInfo).toEqual(mockBuildingList);

  });


  it('should filter CallMethod1 list', async() => {
    const building1: BuildingInfo = {
      code: 'B',
      name: 'Office Building',
      description: 'A modern building',
      maxLength: 15,
      maxWidth: 15,
    };

    const building2: BuildingInfo = {
      code: 'C',
      name: 'Building of engineering',
      description: 'A tall tower',
      maxLength: 12,
      maxWidth: 12,
    };
    const mockValue = 'min:maxLength:10;maxWidth:20;';

    const mockBuildingList = [building1,building2];
    mockBuildingService.listBuildings.mockResolvedValue(mockBuildingList);

    mockBuildingService.buildingListInfo.push(building1);
    mockBuildingService.buildingListInfo.push(building2);

    await component.CallMethod(mockValue);

    expect(mockBuildingService.listBuildings).toHaveBeenCalled();
    expect(mockBuildingService.buildingList).toHaveBeenCalledWith(mockBuildingList);
    expect(component.buildingListInfo).toEqual(mockBuildingList);

  });
});
