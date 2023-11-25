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
        component.createPassageway();
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });


    it('Passageway Created correctly', async () => {

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const floor1Input = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const floor2Input = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        codeInput.value = 'code';
        floor1Input.value = 'floor1';
        floor2Input.value = 'floor2';
        descriptionTextarea.value = 'description';
        console.log(codeInput.value, floor1Input.value, floor2Input.value, descriptionTextarea.value);


        mockPassagewayService.createPassageway.mockReturnValue(Promise.resolve(null));

        await component.createPassageway();

        expect(window.alert).toHaveBeenCalledWith('Passageway created');

    });

    it('Passageway Created fail if code not inserted', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const floor1Input = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const floor2Input = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        codeInput.value = '';
        floor1Input.value = 'floor1';
        floor2Input.value = 'floor2';
        descriptionTextarea.value = 'descripiton';

        mockPassagewayService.createPassageway.mockReturnValue(Promise.resolve(null));

        await component.createPassageway();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');

    });

    it('Passageway Created fail if floor1 not inserted', async () => {

            const alertSpy = jest.spyOn(window, 'alert');

            const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
            const floor1Input = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
            const floor2Input = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
            const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

            codeInput.value = 'code';
            floor1Input.value = '';
            floor2Input.value = 'floor2';
            descriptionTextarea.value = 'descripiton';

            mockPassagewayService.createPassageway.mockReturnValue(Promise.resolve(null));

            await component.createPassageway();

            expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');

    });

    it('Passageway Created fail if floor2 not inserted', async () => {

            const alertSpy = jest.spyOn(window, 'alert');

            const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
            const floor1Input = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
            const floor2Input = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
            const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

            codeInput.value = 'code';
            floor1Input.value = 'floor1';
            floor2Input.value = '';
            descriptionTextarea.value = 'descripiton';

            mockPassagewayService.createPassageway.mockReturnValue(Promise.resolve(null));

            await component.createPassageway();

            expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');

    });

    it('Passageway Created fail if description not inserted', async () => {

            const alertSpy = jest.spyOn(window, 'alert');

            const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
            const floor1Input = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
            const floor2Input = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
            const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

            codeInput.value = 'code';
            floor1Input.value = 'floor1';
            floor2Input.value = 'floor2';
            descriptionTextarea.value = '';

            mockPassagewayService.createPassageway.mockReturnValue(Promise.resolve(null));

            await component.createPassageway();

            expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');

    });

    it('Passageway Creation fail if service throws exception', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const floor1Input = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const floor2Input = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        codeInput.value = 'code';
        floor1Input.value = 'floor1';
        floor2Input.value = 'floor2';
        descriptionTextarea.value = 'description';
        let error = null;

        mockPassagewayService.createPassageway.mockRejectedValue(error = new Error());
        await component.createPassageway();

        expect(alertSpy).toHaveBeenCalledWith("Passageway not created: " + error );

    });

});
