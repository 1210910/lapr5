import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RobotTypeCreateComponent } from './robotTypeCreate.component';
import { RobotTypeService } from '../../services/robotType.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('RobotTypeCreateComponent', () => {
  let component: RobotTypeCreateComponent;
  let fixture: ComponentFixture<RobotTypeCreateComponent>;
  let mockRobotTypeService: jest.Mocked<RobotTypeService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockRobotTypeService = {
      createRobotType: jest.fn()
    } as any;

    mockActivatedRoute = {

    };

    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });

    fixture = TestBed.createComponent(RobotTypeCreateComponent);
    component = fixture.componentInstance;

    component.robotService = mockRobotTypeService;
  });

  it ('should create', () => {
    global.alert = jest.fn();
    expect(component).toBeTruthy();
  });

  it('should show alert if form is invalid', () => {
    const alertSpy = jest.spyOn(window, 'alert');
    component.createRobotType();
    expect(alertSpy).toHaveBeenCalledWith('Please fill all the fields');
  });

  it('should show alert if robot type is created', async () => {
    const alertSpy = jest.spyOn(window, 'alert');
    const codeInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
    const brandInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const modelInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
    const taskTypeCodeInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

    codeInput.value = 'code';
    brandInput.value = 'brand';
    modelInput.value = 'model';
    taskTypeCodeInput.value = 'taskTypeCode';
    descriptionTextarea.value = 'description';

    mockRobotTypeService.createRobotType.mockReturnValue(Promise.resolve(fixture));
    await component.createRobotType();
    expect(alertSpy).toHaveBeenCalledWith('Robot type created');
  });

  it('should show alert if robot type is not created', async () => {
    const alertSpy = jest.spyOn(window, 'alert');
    const codeInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
    const brandInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const modelInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
    const taskTypeCodeInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

    codeInput.value = 'code';
    brandInput.value = 'brand';
    modelInput.value = 'model';
    taskTypeCodeInput.value = 'taskTypeCode';
    descriptionTextarea.value = 'description';

    mockRobotTypeService.createRobotType.mockReturnValue(Promise.reject());
    await component.createRobotType();
    expect(alertSpy).toHaveBeenCalledWith('Robot type not created');
  });

});