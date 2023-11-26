import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingEditComponent } from './buildingEdit.component';
import { BuildingService } from '../../services/building.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import {BuildingInfo} from "../building-info/buildingInfo";


describe('BuildingEditComponent', () => {
  let component: BuildingEditComponent;
  let fixture: ComponentFixture<BuildingEditComponent>;
  let mockBuildingService: jest.Mocked<BuildingService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    mockBuildingService = {
      buildingListInfo: [],
      listAllBuildings: jest.fn(),
      editBuilding: jest.fn(),
    } as any;

    mockActivatedRoute = {

    };

    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });


    fixture = TestBed.createComponent(BuildingEditComponent);
    component = fixture.componentInstance;

    component.buildingService = mockBuildingService;

  });

  it('should create the component', async () => {
    global.alert = jest.fn();
    expect(component).toBeTruthy();
  });


  it('Building Edited correctly', async () => {

    const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

    component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
    nameInput.value = 'name';
    descriptionTextarea.value = 'descripiton';
    lengthInput.value = '10';
    widthInput.value = '10';

    mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

    await component.editBuilding()
    expect(window.alert).toHaveBeenCalledWith('Building edited');

  });

  it('Building edited fail if service throws exception', async () => {

    const alertSpy = jest.spyOn(window, 'alert');

    component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
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

    mockBuildingService.editBuilding.mockRejectedValue(new Error('Error'));
    await component.editBuilding()

    expect(alertSpy).toHaveBeenCalledWith("Building edition failed" );

  });

  it('Building edited fail if no data is selected ', async () => {

    const alertSpy = jest.spyOn(window, 'alert');

    component.selectedBuilding = { code: '',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
    const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
    const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

    nameInput.value = '';
    descriptionTextarea.value = '';
    lengthInput.value = '';
    widthInput.value = '';

    mockBuildingService.editBuilding.mockRejectedValue(new Error('Error'));
    await component.editBuilding()

    expect(alertSpy).toHaveBeenCalledWith("Building edition failed" );

  });

  it('Building edited fail if no data is inputed ', async () => {

    const alertSpy = jest.spyOn(window, 'alert');

    component.selectedBuilding = { code: '12',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
    const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
    const widthInput = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

    nameInput.value = '';
    descriptionTextarea.value = '';
    lengthInput.value = '';
    widthInput.value = '';

    mockBuildingService.editBuilding.mockRejectedValue(new Error('Error'));
    await component.editBuilding()

    expect(alertSpy).toHaveBeenCalledWith("Building edition failed" );

  });

  it('should fetch building list on initialization to get codes', async() => {
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
      description: 'A tall building',
      maxLength: 12,
      maxWidth: 12,
    };
    const mockBuildingList = [building1,building2];
    mockBuildingService.listAllBuildings.mockResolvedValue(mockBuildingList);

    await component.ngOnInit();

    expect(mockBuildingService.listAllBuildings).toHaveBeenCalled();
    expect(component.buildings).toEqual(mockBuildingList);

  });


  it('should catch errors buildingList on initialization to get codes', async() => {

    const originalConsoleError = console.error;
    console.error = jest.fn();

    mockBuildingService.listAllBuildings.mockRejectedValue(new Error('Error'));

    await component.ngOnInit();

    expect(mockBuildingService.listAllBuildings).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error listing buildings', new Error('Error'));
    console.error = originalConsoleError;

  });

  it('Building edited successfully if only name inserted', async () => {
    const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

    component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
    nameInput.value = 'name';
    descriptionTextarea.value = '';
    lengthInput.value = '';
    widthInput.value = '';

    mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

    await component.editBuilding()
    expect(window.alert).toHaveBeenCalledWith('Building edited');

  });

  it('Building edited successfully if only description inserted', async () => {
    const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

    component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
    nameInput.value = '';
    descriptionTextarea.value = 'description';
    lengthInput.value = '';
    widthInput.value = '';

    mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

    await component.editBuilding()
    expect(window.alert).toHaveBeenCalledWith('Building edited');
  });

  it('Building edited successfully if only length inserted', async () => {
    const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

    component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
    nameInput.value = '';
    descriptionTextarea.value = '';
    lengthInput.value = '9';
    widthInput.value = '';

    mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

    await component.editBuilding()
    expect(window.alert).toHaveBeenCalledWith('Building edited');
  });

  it('Building edited successfully if only width inserted', async () => {
    const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

    component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
    nameInput.value = '';
    descriptionTextarea.value = '';
    lengthInput.value = '';
    widthInput.value = '9';

    mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

    await component.editBuilding()
    expect(window.alert).toHaveBeenCalledWith('Building edited');
  });

  it('Building edited successfully if only name and description inserted', async () => {
    const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

    component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
    nameInput.value = 'name';
    descriptionTextarea.value = 'description';
    lengthInput.value = '';
    widthInput.value = '';

    mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

    await component.editBuilding()
    expect(window.alert).toHaveBeenCalledWith('Building edited');
  });

  it('Building edited successfully if only name and length inserted', async () => {
    const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

    component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
    nameInput.value = 'name';
    descriptionTextarea.value = '';
    lengthInput.value = '9';
    widthInput.value = '';

    mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

    await component.editBuilding()
    expect(window.alert).toHaveBeenCalledWith('Building edited');
  });

    it('Building edited successfully if only name and width inserted', async () => {
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

        component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
        nameInput.value = 'name';
        descriptionTextarea.value = '';
        lengthInput.value = '';
        widthInput.value = '9';

        mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

        await component.editBuilding()
        expect(window.alert).toHaveBeenCalledWith('Building edited');
    });

    it('Building edited successfully if only description and length inserted', async () => {
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

        component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
        nameInput.value = '';
        descriptionTextarea.value = 'description';
        lengthInput.value = '9';
        widthInput.value = '';

        mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

        await component.editBuilding()
        expect(window.alert).toHaveBeenCalledWith('Building edited');
    });

    it('Building edited successfully if only description and width inserted', async () => {
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

        component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
        nameInput.value = '';
        descriptionTextarea.value = 'description';
        lengthInput.value = '';
        widthInput.value = '9';

        mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

        await component.editBuilding()
        expect(window.alert).toHaveBeenCalledWith('Building edited');
    });

    it('Building edited successfully if only length and width inserted', async () => {
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

        component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
        nameInput.value = '';
        descriptionTextarea.value = '';
        lengthInput.value = '9';
        widthInput.value = '9';

        mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

        await component.editBuilding()
        expect(window.alert).toHaveBeenCalledWith('Building edited');
    });

    it('Building edited successfully if only name, description and length inserted', async () => {
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

        component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
        nameInput.value = 'name';
        descriptionTextarea.value = 'description';
        lengthInput.value = '9';
        widthInput.value = '';

        mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

        await component.editBuilding()
        expect(window.alert).toHaveBeenCalledWith('Building edited');
    });

    it('Building edited successfully if only name, description and width inserted', async () => {
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

        component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
        nameInput.value = 'name';
        descriptionTextarea.value = 'description';
        lengthInput.value = '';
        widthInput.value = '9';

        mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

        await component.editBuilding()
        expect(window.alert).toHaveBeenCalledWith('Building edited');
    });

    it('Building edited successfully if only name, length and width inserted', async () => {
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

        component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
        nameInput.value = 'name';
        descriptionTextarea.value = '';
        lengthInput.value = '9';
        widthInput.value = '9';

        mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

        await component.editBuilding()
        expect(window.alert).toHaveBeenCalledWith('Building edited');
    });

    it('Building edited successfully if only description, length and width inserted', async () => {
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;

        component.selectedBuilding = { code: '123',name: "Building B", description:"Description", maxLength:10,maxWidth:20 };
        nameInput.value = '';
        descriptionTextarea.value = 'description';
        lengthInput.value = '9';
        widthInput.value = '9';

        mockBuildingService.editBuilding.mockReturnValue(Promise.resolve(null));

        await component.editBuilding()
        expect(window.alert).toHaveBeenCalledWith('Building edited');
    });
});
