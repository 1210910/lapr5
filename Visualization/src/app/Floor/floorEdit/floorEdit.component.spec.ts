import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloorEditComponent } from './floorEdit.component';
import { FloorService } from '../../services/floor.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('FloorEditComponent', () => {
  let component: FloorEditComponent;
  let fixture: ComponentFixture<FloorEditComponent>;
  let mockFloorService: jest.Mocked<FloorService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockFloorService = {
      FloorList: [],
      editFloor: jest.fn(),
    } as any;

    mockActivatedRoute = {};

    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });

    fixture = TestBed.createComponent(FloorEditComponent);
    component = fixture.componentInstance;

    component.floorService = mockFloorService;

  });

  it('should create the component', async () => {
    global.alert = jest.fn();
    expect(component).toBeTruthy();
  });

  it('Floor Edited sucessfully', async () => {

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

      mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

      await component.editFloor();

      expect(mockFloorService.editFloor).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith('Floor edited');
  });

    it('Floor edited fail if service throws exception' , async () => {
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

      mockFloorService.editFloor.mockReturnValue(Promise.reject(fixture));

      await component.editFloor();

      expect(mockFloorService.editFloor).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith('Floor edition failed');
    });

    it('Floor edited successfully if only code and name inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = 'name';
        descriptionTextarea.value = '';
        lengthInput.value = '';
        widthInput.value = '';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');
    });

    it('Floor edited successfully if only code and description inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = '';
        descriptionTextarea.value = 'description';
        lengthInput.value = '';
        widthInput.value = '';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');
    });

    it('Floor edited successfully if only code and length inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = '';
        descriptionTextarea.value = '';
        lengthInput.value = '10';
        widthInput.value = '';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');
    });

    it('Floor edited successfully if only code and width inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = '';
        descriptionTextarea.value = '';
        lengthInput.value = '';
        widthInput.value = '10';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');
    });

    it('Floor edited successfully if only code, name and description inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = 'name';
        descriptionTextarea.value = 'description';
        lengthInput.value = '';
        widthInput.value = '';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');
    });

    it('Floor edited successfully if only code, name and length inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = 'name';
        descriptionTextarea.value = '';
        lengthInput.value = '10';
        widthInput.value = '';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');
    });

    it('Floor edited successfully if only code, name and width inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = 'name';
        descriptionTextarea.value = '';
        lengthInput.value = '';
        widthInput.value = '10';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');
    });

    it('Floor edited successfully if only code, description and length inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = '';
        descriptionTextarea.value = 'description';
        lengthInput.value = '10';
        widthInput.value = '';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');
    });

    it('Floor edited successfully if only code, description and width inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = '';
        descriptionTextarea.value = 'description';
        lengthInput.value = '';
        widthInput.value = '10';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');

    });

    it('Floor edited successfully if only code, length and width inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = '';
        descriptionTextarea.value = '';
        lengthInput.value = '10';
        widthInput.value = '10';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');

    });

    it('Floor edited successfully if only code, name, description and length inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = 'name';
        descriptionTextarea.value = 'description';
        lengthInput.value = '10';
        widthInput.value = '';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');
    });

    it('Floor edited successfully if only code, name, description and width inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = 'name';
        descriptionTextarea.value = 'description';
        lengthInput.value = '';
        widthInput.value = '10';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');
    });

    it('Floor edited successfully if only code, name, length and width inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = 'name';
        descriptionTextarea.value = '';
        lengthInput.value = '10';
        widthInput.value = '10';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');
    });

    it('Floor edited successfully if only code, description, length and width inserted' , async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

        codeInput.value = 'code';
        nameInput.value = '';
        descriptionTextarea.value = 'description';
        lengthInput.value = '10';
        widthInput.value = '10';

        mockFloorService.editFloor.mockReturnValue(Promise.resolve(fixture));

        await component.editFloor();

        expect(mockFloorService.editFloor).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Floor edited');
    });
});