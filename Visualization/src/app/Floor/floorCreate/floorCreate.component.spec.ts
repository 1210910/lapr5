import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloorCreateComponent } from './floorCreate.component';
import { FloorService } from '../../services/floor.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('FloorCreateComponent', () => {
  let component: FloorCreateComponent;
  let fixture: ComponentFixture<FloorCreateComponent>;
  let mockFloorService: jest.Mocked<FloorService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockFloorService = {
      FloorList: [],
      createFloor: jest.fn(),
    } as any;

    mockActivatedRoute = {};

    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });

    fixture = TestBed.createComponent(FloorCreateComponent);
    component = fixture.componentInstance;

    component.floorService = mockFloorService;

  });

  it('should create the component', async () => {
    global.alert = jest.fn();
    expect(component).toBeTruthy();
  });


  it('should show alert if form is invalid', () => {
    const alertSpy = jest.spyOn(window, 'alert');
    component.selectedBuilding = { code: undefined };
    component.createFloor();
    expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
  });


});