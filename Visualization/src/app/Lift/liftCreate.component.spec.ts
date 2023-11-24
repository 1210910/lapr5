import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LiftCreateComponent } from "./liftCreate.component";
import { LiftService } from "../services/lift.service";
import { ActivatedRoute } from "@angular/router";
import { By } from "@angular/platform-browser";

describe("LiftCreateComponent", () => {
  let component: LiftCreateComponent;
  let fixture: ComponentFixture<LiftCreateComponent>;
  let mockLiftService: jest.Mocked<LiftService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockLiftService = {
      LiftList: [],
      createLift: jest.fn()
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

  it("should show alert if form is invalid", () => {
    const alertSpy = jest.spyOn(window, "alert");
    component.createLift();
    expect(alertSpy).toHaveBeenCalledWith("Please fill the required options");
  });

  it("should show alert if lift is created", async () => {
    const alertSpy = jest.spyOn(window, "alert");
    const codeInput = fixture.debugElement.queryAll(By.css("input"))[0].nativeElement;
    const floorsInput = fixture.debugElement.queryAll(By.css("input"))[1].nativeElement;
    const brandInput = fixture.debugElement.queryAll(By.css("input"))[2].nativeElement;
    const modelInput = fixture.debugElement.queryAll(By.css("input"))[3].nativeElement;
    const buildingCodeInput = fixture.debugElement.queryAll(By.css("input"))[4].nativeElement;
    const serialNumberInput = fixture.debugElement.queryAll(By.css("input"))[5].nativeElement;
    const descriptionTextarea = fixture.debugElement.queryAll(By.css("textarea"))[0].nativeElement;

    codeInput.value = "code";
    floorsInput.value = "floor";
    brandInput.value = "brand";
    modelInput.value = "model";
    buildingCodeInput.value = "buildingCode";
    serialNumberInput.value = "serialNumber";
    descriptionTextarea.value = "descripiton";

    mockLiftService.createLift.mockReturnValue(Promise.resolve(fixture));
    await component.createLift();
    expect(alertSpy).toHaveBeenCalledWith("Lift Created");
  });

  it("should show alert if lift is not created", async () => {
    const alertSpy = jest.spyOn(window, "alert");
    const codeInput = fixture.debugElement.queryAll(By.css("input"))[0].nativeElement;
    const floorsInput = fixture.debugElement.queryAll(By.css("input"))[1].nativeElement;
    const brandInput = fixture.debugElement.queryAll(By.css("input"))[2].nativeElement;
    const modelInput = fixture.debugElement.queryAll(By.css("input"))[3].nativeElement;
    const buildingCodeInput = fixture.debugElement.queryAll(By.css("input"))[4].nativeElement;
    const serialNumberInput = fixture.debugElement.queryAll(By.css("input"))[5].nativeElement;
    const descriptionTextarea = fixture.debugElement.queryAll(By.css("textarea"))[0].nativeElement;

    codeInput.value = "code";
    floorsInput.value = "floor";
    brandInput.value = "brand";
    modelInput.value = "model";
    buildingCodeInput.value = "buildingCode";
    serialNumberInput.value = "serialNumber";
    descriptionTextarea.value = "descripiton";

    mockLiftService.createLift.mockReturnValue(Promise.reject("Error"));
    await component.createLift();
    expect(alertSpy).toHaveBeenCalledWith("Fail: Error");
  });

});