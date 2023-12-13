import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomCreateComponent } from './roomCreate.component';
import { RoomService } from '../../services/room.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';


describe('RoomCreateComponent', () => {
    let component: RoomCreateComponent;
    let fixture: ComponentFixture<RoomCreateComponent>;
    let mockRoomService: jest.Mocked<RoomService>;
    let mockActivatedRoute: Partial<ActivatedRoute>;

    beforeEach(() => {
        mockRoomService = {
            RoomList: [],
            createRoom: jest.fn(),
        } as any;

        mockActivatedRoute = {

        };

        TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });


        fixture = TestBed.createComponent(RoomCreateComponent);
        component = fixture.componentInstance;

        component.roomService = mockRoomService;

    });

    it('should create the component', async () => {
        global.alert = jest.fn();
        expect(component).toBeTruthy();
    });

    it('should show alert if form is invalid', () => {
        const alertSpy = jest.spyOn(window, 'alert');
        component.selectedFloor= {floorCode: 'code'};
        component.createRoom();
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });


    it('Room Created correctly', async () => {
        const alertSpy = jest.spyOn(window, 'alert');


        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const roomTypeSelect = fixture.debugElement.query(By.css('select')).nativeElement;

        codeInput.value = 'code';
        component.selectedFloor= {floorCode: 'code'};
        descriptionTextarea.value = 'description';
        widthInput.value = 2;
        lengthInput.value = 2;
        roomTypeSelect.value = 'office' ;


        mockRoomService.createRoom.mockReturnValue(Promise.resolve(null));

        await component.createRoom();

        expect(alertSpy).toHaveBeenCalledWith('Room Created');

    });

    it('Room Created fail if code not inserted', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const roomTypeSelect = fixture.debugElement.query(By.css('select')).nativeElement;

        codeInput.value = '';
        component.selectedFloor= {floorCode: 'code'};
        descriptionTextarea.value = 'description';
        widthInput.value = 2;
        lengthInput.value = 2;
        roomTypeSelect.value = 'office' ;



        mockRoomService.createRoom.mockReturnValue(Promise.resolve(null));

        await component.createRoom();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');

    });
    it('Room Created fail if floor not inserted', async () => {

            const alertSpy = jest.spyOn(window, 'alert');

            const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
            const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
            const widthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
            const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
            const roomTypeSelect = fixture.debugElement.query(By.css('select')).nativeElement;

            codeInput.value = 'code';
        component.selectedFloor= {floorCode: ''};
            descriptionTextarea.value = 'description';
            widthInput.value = 2;
            lengthInput.value = 2;
            roomTypeSelect.value = 'office' ;
    });

    it('Room Created fail if description not inserted', async () => {

            const alertSpy = jest.spyOn(window, 'alert');

            const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
            const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
            const widthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
            const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
            const roomTypeSelect = fixture.debugElement.query(By.css('select')).nativeElement;

            codeInput.value = 'code';
            component.selectedFloor= {floorCode: 'code'};
            descriptionTextarea.value = '';
            widthInput.value = 2;
            lengthInput.value = 2;
            roomTypeSelect.value = 'office' ;
    });

    it('Room Created fail if width not inserted', async () => {

            const alertSpy = jest.spyOn(window, 'alert');

            const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
            const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
            const widthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
            const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
            const roomTypeSelect = fixture.debugElement.query(By.css('select')).nativeElement;

            codeInput.value = 'code';
            component.selectedFloor= {floorCode: 'code'};
            descriptionTextarea.value = 'description';
            widthInput.value = null;
            lengthInput.value = 2;
            roomTypeSelect.value = 'office' ;
    });

    it('Room Created fail if length not inserted', async () => {

            const alertSpy = jest.spyOn(window, 'alert');

            const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
            const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
            const widthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
            const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
            const roomTypeSelect = fixture.debugElement.query(By.css('select')).nativeElement;

            codeInput.value = 'code';
            component.selectedFloor= {floorCode: 'code'};
            descriptionTextarea.value = 'description';
            widthInput.value = 2;
            lengthInput.value = null;
            roomTypeSelect.value = 'office' ;
    });

    it('Room Created fail if roomType not inserted', async () => {

            const alertSpy = jest.spyOn(window, 'alert');

            const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
            const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
            const widthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
            const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
            const roomTypeSelect = fixture.debugElement.query(By.css('select')).nativeElement;

            codeInput.value = 'code';
            component.selectedFloor= {floorCode: 'code'};
            descriptionTextarea.value = 'description';
            widthInput.value = 2;
            lengthInput.value = 2;
            roomTypeSelect.value = '' ;
    });



    it('Room Creation fail if service throws exception', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        const widthInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const lengthInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const roomTypeSelect = fixture.debugElement.query(By.css('select')).nativeElement;

        codeInput.value = 'code';
        component.selectedFloor= {floorCode: 'code'};
        descriptionTextarea.value = 'description';
        widthInput.value = 2;
        lengthInput.value = 2;
        roomTypeSelect.value = 'office' ;
        let error = null;

        mockRoomService.createRoom.mockRejectedValue(error = new Error());
        await component.createRoom();

        expect(alertSpy).toHaveBeenCalledWith("Room not created: " + error );

    });
});
