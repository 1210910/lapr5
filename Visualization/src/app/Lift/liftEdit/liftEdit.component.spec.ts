import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LiftEditComponent } from "./liftEdit.component";
import { LiftService } from "../../services/lift.service";
import { ActivatedRoute } from "@angular/router";
import { By } from "@angular/platform-browser";

describe("LiftEditComponent", () => {
  let component: LiftEditComponent;
  let fixture: ComponentFixture<LiftEditComponent>;
  let mockLiftService: jest.Mocked<LiftService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockLiftService = {
      editLift: jest.fn(),
    } as any;

    mockActivatedRoute = {

    };

    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });

    fixture = TestBed.createComponent(LiftEditComponent);
    component = fixture.componentInstance;

    component.liftService = mockLiftService;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show alert if lift is edited", async () => {
    const alertSpy = jest.spyOn(window, "alert");
    const codeInput = fixture.debugElement.queryAll(By.css("input"))[0].nativeElement;
    const floorsInput = fixture.debugElement.queryAll(By.css("input"))[1].nativeElement;
    const brandInput = fixture.debugElement.queryAll(By.css("input"))[2].nativeElement;
    const modelInput = fixture.debugElement.queryAll(By.css("input"))[3].nativeElement;
    const serialNumberInput = fixture.debugElement.queryAll(By.css("input"))[4].nativeElement;
    const descriptionTextarea = fixture.debugElement.queryAll(By.css("textarea"))[0].nativeElement;

    component.selectedLift = { code: 'code' };
    floorsInput.value = "floor";
    brandInput.value = "brand";
    modelInput.value = "model";
    serialNumberInput.value = "serialNumber";
    descriptionTextarea.value = "descripiton";

    mockLiftService.editLift.mockReturnValue(Promise.resolve(fixture));
    await component.editLift();
    expect(alertSpy).toHaveBeenCalledWith("Lift edited successfully");
  });

  it("should show alert if lift is not edited", async () => {
    const alertSpy = jest.spyOn(window, "alert");
    const codeInput = fixture.debugElement.queryAll(By.css("input"))[0].nativeElement;
    const floorsInput = fixture.debugElement.queryAll(By.css("input"))[1].nativeElement;
    const brandInput = fixture.debugElement.queryAll(By.css("input"))[2].nativeElement;
    const modelInput = fixture.debugElement.queryAll(By.css("input"))[3].nativeElement;
    const serialNumberInput = fixture.debugElement.queryAll(By.css("input"))[4].nativeElement;
    const descriptionTextarea = fixture.debugElement.queryAll(By.css("textarea"))[0].nativeElement;

    component.selectedLift = { code: 'code' };
    floorsInput.value = "floor";
    brandInput.value = "brand";
    modelInput.value = "model";
    serialNumberInput.value = "serialNumber";
    descriptionTextarea.value = "descripiton";

    mockLiftService.editLift.mockReturnValue(Promise.reject(fixture));
    await component.editLift();
    expect(alertSpy).toHaveBeenCalledWith("Lift edited Failed");
  });

});