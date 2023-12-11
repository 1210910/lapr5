import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LiftCreateComponent } from "./liftCreate.component";
import { LiftService } from "../../services/lift.service";
import { ActivatedRoute } from "@angular/router";
import { By } from "@angular/platform-browser";
import {BuildingService} from "../../services/building.service";

describe("LiftCreateComponent", () => {
  let component: LiftCreateComponent;
  let fixture: ComponentFixture<LiftCreateComponent>;
  let mockLiftService: jest.Mocked<LiftService>;
  let mockBuildingService: jest.Mocked<BuildingService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockLiftService = {
      LiftList: [],
      createLift: jest.fn()
    } as any;
    mockBuildingService = {
      buildingListInfo: [],
      listAllBuildings: jest.fn(),
      editBuilding: jest.fn(),
    } as any;

    mockActivatedRoute = {};

    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });

    fixture = TestBed.createComponent(LiftCreateComponent);
    component = fixture.componentInstance;

    component.liftService = mockLiftService;

  });

  it("should create the component", async () => {
    global.alert = jest.fn();
    expect(component).toBeTruthy();
  });

  /*it('should catch errors buildingList on initialization to get codes', async() => {

    const originalConsoleError = console.error;
    console.error = jest.fn();

    component.selectedBuilding = {buildingCode: 'code'}
    mockBuildingService.listAllBuildings.mockRejectedValue(new Error('Error'));

    await component.ngOnInit();

    expect(mockBuildingService.listAllBuildings).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error listing buildings', new Error('Error'));
    console.error = originalConsoleError;

  });*/


  it("should show alert if lift is created", async () => {
    const alertSpy = jest.spyOn(window, "alert");
    const buildingCodeInput = fixture.debugElement.queryAll(By.css("select"))[0].nativeElement;
    const floorsInput = fixture.debugElement.queryAll(By.css("input"))[0].nativeElement;
    const brandInput = fixture.debugElement.queryAll(By.css("input"))[1].nativeElement;
    const modelInput = fixture.debugElement.queryAll(By.css("input"))[2].nativeElement;
    const serialNumberInput = fixture.debugElement.queryAll(By.css("input"))[3].nativeElement;
    const descriptionTextarea = fixture.debugElement.queryAll(By.css("textarea"))[0].nativeElement;

    component.selectedBuilding = { buildingCode: 'code' };
    floorsInput.value = "floor";
    brandInput.value = "brand";
    modelInput.value = "model";
    serialNumberInput.value = "serialNumber";
    descriptionTextarea.value = "descripiton";

    mockLiftService.createLift.mockReturnValue(Promise.resolve(fixture));
    await component.createLift();

    expect(alertSpy).toHaveBeenCalledWith("Lift Created");
  });

  it("should show alert if lift is not created", async () => {
    const alertSpy = jest.spyOn(window, "alert");
    component.selectedBuilding = { code: '12',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
    const floorsInput = fixture.debugElement.queryAll(By.css("input"))[0].nativeElement;
    const brandInput = fixture.debugElement.queryAll(By.css("input"))[1].nativeElement;
    const modelInput = fixture.debugElement.queryAll(By.css("input"))[2].nativeElement;
    const buildingCodeInput = fixture.debugElement.queryAll(By.css("input"))[3].nativeElement;
    const serialNumberInput = fixture.debugElement.queryAll(By.css("input"))[4].nativeElement;
    const descriptionTextarea = fixture.debugElement.queryAll(By.css("textarea"))[0].nativeElement;

    floorsInput.value = "floor";
    brandInput.value = "brand";
    modelInput.value = "model";
    component.selectedBuilding = { buildingCode: 'code' };
    serialNumberInput.value = "serialNumber";
    descriptionTextarea.value = "descripiton";

    mockLiftService.createLift.mockReturnValue(Promise.reject("Error"));
    await component.createLift();
    expect(alertSpy).toHaveBeenCalledWith("Fail: Error");
  });

});