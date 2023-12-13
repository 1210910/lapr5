import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassagewayEditComponent } from './passagewayEdit.component';
import { PassagewayService } from '../../services/passageway.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import {PassagewayInfo} from "../passageway-info/passagewayinfo";


describe('PassagewayEditComponent', () => {
    let component: PassagewayEditComponent;
    let fixture: ComponentFixture<PassagewayEditComponent>;
    let mockPassagewayService: jest.Mocked<PassagewayService>;
    let mockActivatedRoute: Partial<ActivatedRoute>;

    beforeEach(() => {
        mockPassagewayService = {
            passagewayListInfo: [],
            editPassageway: jest.fn(),
        } as any;

        mockActivatedRoute = {

        };

        TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });


        fixture = TestBed.createComponent(PassagewayEditComponent);
        component = fixture.componentInstance;

        component.passagewayService = mockPassagewayService

    });

    it('should create the component', async () => {
        global.alert = jest.fn();
        expect(component).toBeTruthy();
    });


    it('Passageway Edited correctly', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { /* do nothing */ });


        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        component.selectedPassageway = {passageCode: 'code'}
        component.selectedFloor1 = {floorCode: 'code1'}
        component.selectedFloor2 = {floorCode: 'code2'}
        descriptionTextarea.value = 'description';

        mockPassagewayService.editPassageway.mockReturnValue(Promise.resolve(null));

        await component.editPassageway();
        expect(alertSpy).toHaveBeenCalledWith('Passageway edited successfully');

    });

    /*it('Passageway edited fail if service throws exception', async () => {
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {  });

  const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        component.selectedPassageway = {passageCode: 'code'}
        component.selectedFloor1 = {floorCode: 'code1'}
        component.selectedFloor2 = {floorCode: 'code2'}
        descriptionTextarea.value = 'description';

let error = null;

mockPassagewayService.editPassageway.mockRejectedValue(error = new Error());

fixture.detectChanges();
await fixture.whenStable();

await component.editPassageway();

expect(alertSpy).toHaveBeenCalledWith("Passageway not edited: " + error );

});*/

    it('Passageway edited successfully if only code inserted', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        component.selectedPassageway = {passageCode: 'code'}
        component.selectedFloor1 = {floorCode: ''}
        component.selectedFloor2 = {floorCode: ''}
        descriptionTextarea.value = '';

        mockPassagewayService.editPassageway.mockReturnValue(Promise.resolve(null));

        await component.editPassageway();

        expect(alertSpy).toHaveBeenCalledWith('Passageway edited successfully');

    });

    it('Passageway edited successfully if only description inserted', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        component.selectedPassageway = {passageCode: ''}
        component.selectedFloor1 = {floorCode: ''}
        component.selectedFloor2 = {floorCode: ''}
        descriptionTextarea.value = 'description';

        mockPassagewayService.editPassageway.mockReturnValue(Promise.resolve(null));

        await component.editPassageway();

        expect(alertSpy).toHaveBeenCalledWith('Passageway edited successfully');
    });

    it('Passageway edited successfully if only code and description inserted', async () => {

            const alertSpy = jest.spyOn(window, 'alert');
            const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        component.selectedPassageway = {passageCode: 'code'}
        component.selectedFloor1 = {floorCode: ''}
        component.selectedFloor2 = {floorCode: ''}
        descriptionTextarea.value = 'description';

            mockPassagewayService.editPassageway.mockReturnValue(Promise.resolve(null));

            await component.editPassageway();

            expect(alertSpy).toHaveBeenCalledWith('Passageway edited successfully');
    });

    it('Passageway edited successfully if only code and floor1 and floor2 inserted', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        component.selectedPassageway = {passageCode: 'code'}
        component.selectedFloor1 = {floorCode: 'code1'}
        component.selectedFloor2 = {floorCode: 'code2'}
        descriptionTextarea.value = '';

        mockPassagewayService.editPassageway.mockReturnValue(Promise.resolve(null));

        await component.editPassageway();

        expect(alertSpy).toHaveBeenCalledWith('Passageway edited successfully');
    });


    it('Passageway edited successfully if only floor1 and floor2 inserted', async () => {

                    const alertSpy = jest.spyOn(window, 'alert');

                    const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        component.selectedPassageway = {passageCode: ''}
        component.selectedFloor1 = {floorCode: 'code1'}
        component.selectedFloor2 = {floorCode: 'code2'}
        descriptionTextarea.value = '';

                    mockPassagewayService.editPassageway.mockReturnValue(Promise.resolve(null));

                    await component.editPassageway();

                    expect(alertSpy).toHaveBeenCalledWith('Passageway edited successfully');
    });

    it('Passageway edited successfully if only floor1 and floor2 and description inserted', async () => {

                        const alertSpy = jest.spyOn(window, 'alert');

                        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        component.selectedPassageway = {passageCode: ''}
        component.selectedFloor1 = {floorCode: 'code1'}
        component.selectedFloor2 = {floorCode: 'code2'}
        descriptionTextarea.value = 'description';

                        mockPassagewayService.editPassageway.mockReturnValue(Promise.resolve(null));

                        await component.editPassageway();

                        expect(alertSpy).toHaveBeenCalledWith('Passageway edited successfully');
    });


});
