import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassagewayCreateComponent } from './passagewayCreate.component';
import { PassagewayService } from '../../services/passageway.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';


describe('PassagewayCreateComponent', () => {
    let component: PassagewayCreateComponent;
    let fixture: ComponentFixture<PassagewayCreateComponent>;
    let mockPassagewayService: jest.Mocked<PassagewayService>;
    let mockActivatedRoute: Partial<ActivatedRoute>;

    beforeEach(() => {
        mockPassagewayService = {
            PassagewayList: [],
            createPassageway: jest.fn(),
        } as any;

        mockActivatedRoute = {

        };

        TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });


        fixture = TestBed.createComponent(PassagewayCreateComponent);
        component = fixture.componentInstance;

        component.passagewayService = mockPassagewayService;

    });

    it('should create the component', async () => {
        global.alert = jest.fn();
        expect(component).toBeTruthy();
    });

    it('should show alert if form is invalid', () => {
        const alertSpy = jest.spyOn(window, 'alert');
        component.selectedFloor1 = {floorCode: 'code1'}
        component.selectedFloor2 = {floorCode: 'code2'}
        component.createPassageway();
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });


    it('Passageway Created correctly', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        component.selectedFloor1 = {floorCode: 'code1'}
        component.selectedFloor2 = {floorCode: 'code2'}
        descriptionTextarea.value = 'description';

        mockPassagewayService.createPassageway.mockReturnValue(Promise.resolve(null));

        await component.createPassageway();


        expect(alertSpy).toHaveBeenCalledWith('Passageway created');

    });

    it('Passageway Created fail if floor1 not inserted', async () => {

            const alertSpy = jest.spyOn(window, 'alert');

            const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        component.selectedFloor1 = {floorCode: 'code1'}
        component.selectedFloor2 = {floorCode: ''}
        descriptionTextarea.value = 'description';

            mockPassagewayService.createPassageway.mockReturnValue(Promise.resolve(null));

            await component.createPassageway();

            expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');

    });

    it('Passageway Created fail if floor2 not inserted', async () => {

            const alertSpy = jest.spyOn(window, 'alert');

            const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        component.selectedFloor1 = {floorCode: 'code1'}
        component.selectedFloor2 = {floorCode: ''}
        descriptionTextarea.value = 'description';

            mockPassagewayService.createPassageway.mockReturnValue(Promise.resolve(null));

            await component.createPassageway();

            expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');

    });

    it('Passageway Created fail if description not inserted', async () => {

            const alertSpy = jest.spyOn(window, 'alert');

            const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

            component.selectedFloor1 = {floorCode: 'code1'}
            component.selectedFloor2 = {floorCode: 'code2'}
            descriptionTextarea.value = '';

            mockPassagewayService.createPassageway.mockReturnValue(Promise.resolve(null));

            await component.createPassageway();

            expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');

    });

    it('Passageway Creation fail if service throws exception', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        component.selectedFloor1 = {floorCode: 'code1'}
        component.selectedFloor2 = {floorCode: 'code2'}
        descriptionTextarea.value = 'description';
        let error = null;

        mockPassagewayService.createPassageway.mockRejectedValue(error = new Error());
        await component.createPassageway();

        expect(alertSpy).toHaveBeenCalledWith("Passageway not created: " + error );

    });

});
