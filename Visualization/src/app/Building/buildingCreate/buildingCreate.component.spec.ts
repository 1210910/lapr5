import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingCreateComponent } from './buildingCreate.component';
import { BuildingService } from '../../services/building.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';


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

  it('should create the component', async () => {
    global.alert = jest.fn();
    expect(component).toBeTruthy();
  });

  it('should show alert if form is invalid', () => {
    const alertSpy = jest.spyOn(window, 'alert');
    component.createBuilding();
    expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
  });


  it('Building Created correctly', async () => {

    const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
    const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
    const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

    codeInput.value = 'code';
    nameInput.value = 'name';
    descriptionTextarea.value = 'descripiton';
    lengthInput.value = '10';
    widthInput.value = '10';

    mockBuildingService.createBuilding.mockReturnValue(Promise.resolve(null));

    await component.createBuilding()
  
    expect(window.alert).toHaveBeenCalledWith('Building Created');

  });

  it('Building Created fail if code not inserted', async () => {

    const alertSpy = jest.spyOn(window, 'alert');

    const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
    const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
    const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

    codeInput.value = '';
    nameInput.value = 'name';
    descriptionTextarea.value = 'descripiton';
    lengthInput.value = '10';
    widthInput.value = '10';

    mockBuildingService.createBuilding.mockReturnValue(Promise.resolve(null));

    await component.createBuilding()

    expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');

  });

  it('Building Creation fail if service throws exception', async () => {

    const alertSpy = jest.spyOn(window, 'alert');

    const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
    const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
    const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

    codeInput.value = 'code';
    nameInput.value = 'name';
    descriptionTextarea.value = 'descripiton';
    lengthInput.value = '10';
    widthInput.value = '10';

    mockBuildingService.createBuilding.mockRejectedValue(new Error('Error'));
    await component.createBuilding()

    expect(alertSpy).toHaveBeenCalledWith("Fail Error " );

  });

});
