import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiftListComponent } from './liftList.component';
import { ActivatedRoute } from '@angular/router';
import { LiftService } from "../../services/lift.service";
import { LiftInfo } from "../lift-info/liftinfo";

describe('LiftListComponent', () => {
  let component: LiftListComponent;
  let fixture: ComponentFixture<LiftListComponent>;
  let mockLiftService: jest.Mocked<LiftService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockLiftService = {
      LiftList: [],
      createLift: jest.fn(),
      editLift: jest.fn(),
      listLifts: jest.fn(),
      liftList: jest.fn(),
      liftListFromABuilding: jest.fn(),
      getLiftByCode: jest.fn()
    } as jest.Mocked<LiftService>;

    mockActivatedRoute = {

    };

    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });

    fixture = TestBed.createComponent(LiftListComponent);
    component = fixture.componentInstance;

    component.liftService = mockLiftService;
  });

  it ('should create', () => {
    expect(component).toBeTruthy();
  });

it('should fetch lift list on initialization', async() => {
    const lift1: LiftInfo = {
      code: 'LB',
      buildingCode: 'B',
      floors: [],
      brand: "string",
      model: "string",
      serialNumber: "123",
      description: "string"
    };

    const lift2: LiftInfo = {
      code: 'LC',
      buildingCode: 'C',
      floors: [],
      brand: "string",
      model: "string",
      serialNumber: "456",
      description: "string"
    };
    const mockLiftList = [lift1,lift2];
    mockLiftService.listLifts.mockResolvedValue(mockLiftList);

    mockLiftService.LiftList.push(lift1);
    mockLiftService.LiftList.push(lift2);

    await component.ngOnInit();

    expect(mockLiftService.listLifts).toHaveBeenCalled();
    expect(mockLiftService.liftList).toHaveBeenCalledWith(mockLiftList);
    expect(component.liftList).toEqual(mockLiftList);
  });

  it('should filter CallMethod list', async() => {
    const lift1: LiftInfo = {
      code: 'LB',
      buildingCode: 'B',
      floors: [],
      brand: "string",
      model: "string",
      serialNumber: "123",
      description: "string"
    };

    const lift2: LiftInfo = {
      code: 'LC',
      buildingCode: 'C',
      floors: [],
      brand: "string",
      model: "string",
      serialNumber: "456",
      description: "string"
    };
    const mockLiftList = [lift1,lift2];
    mockLiftService.listLifts.mockResolvedValue(mockLiftList);

    mockLiftService.LiftList.push(lift1);
    mockLiftService.LiftList.push(lift2);

    await component.CallMethod('B');

    expect(mockLiftService.listLifts).toHaveBeenCalled();
    expect(mockLiftService.liftListFromABuilding).toHaveBeenCalledWith(mockLiftList, 'B');
    expect(component.liftList).toEqual(mockLiftList);
  });

});