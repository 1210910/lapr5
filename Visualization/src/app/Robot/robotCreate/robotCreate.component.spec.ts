import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RobotCreateComponent } from './robotCreate.component';
import { RobotService } from '../../services/robot.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';


describe('RobotCreateComponent', () => {
    let component: RobotCreateComponent;
    let fixture: ComponentFixture<RobotCreateComponent>;
    let mockRobotService: jest.Mocked<RobotService>;
    let mockActivatedRoute: Partial<ActivatedRoute>;

    beforeEach(() => {
        mockRobotService = {
            RobotrList: [],
            createRobot: jest.fn(),
        } as any;

        mockActivatedRoute = {

        };

        TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });


        fixture = TestBed.createComponent(RobotCreateComponent);
        component = fixture.componentInstance;

        component.robotService = mockRobotService;

    });

    it('should create the component', async () => {
        global.alert = jest.fn();
        expect(component).toBeTruthy();
    });

    it('should show alert if form is invalid', () => {
        const alertSpy = jest.spyOn(window, 'alert');
        component.selectedRobotType = {robotType: 'type'};
        component.createRobot();
        expect(alertSpy).toHaveBeenCalledWith('Please fill all the fields');
    });


    it('Robot Created correctly', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const enabledInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        codeInput.value = 'code';
        nameInput.value = 'name';
        component.selectedRobotType = {robotType: 'type'};
        enabledInput.value = true;
        descriptionTextarea.value = 'description';


        mockRobotService.createRobot.mockReturnValue(Promise.resolve(null));

        await component.createRobot();

        expect(alertSpy).toHaveBeenCalledWith('Robot created');

    });

    it('Robot Created fail if code not inserted', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const enabledInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        codeInput.value = '';
        nameInput.value = 'name';
        component.selectedRobotType = {robotType: 'type'};
        enabledInput.value = true;
        descriptionTextarea.value = 'description';



        mockRobotService.createRobot.mockReturnValue(Promise.resolve(null));

        await component.createRobot();

        expect(alertSpy).toHaveBeenCalledWith('Please fill all the fields');

    });
    it('Robot Created fail if name not inserted', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const enabledInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        codeInput.value = 'code';
        nameInput.value = '';
        component.selectedRobotType = {robotType: 'type'};
        enabledInput.value = true;
        descriptionTextarea.value = 'description';
        ;



        mockRobotService.createRobot.mockReturnValue(Promise.resolve(null));

        await component.createRobot();

        expect(alertSpy).toHaveBeenCalledWith('Please fill all the fields');

    });

    it('Robot Created fail if description not inserted', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const enabledInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        codeInput.value = 'code';
        nameInput.value = 'name';
        component.selectedRobotType = {robotType: 'type'};
        enabledInput.value = true;
        descriptionTextarea.value = '';
        ;



        mockRobotService.createRobot.mockReturnValue(Promise.resolve(null));

        await component.createRobot();

        expect(alertSpy).toHaveBeenCalledWith('Please fill all the fields');

    });



    it('Robot Creation fail if service throws exception', async () => {

        const alertSpy = jest.spyOn(window, 'alert');

        const codeInput = fixture.debugElement.query(By.css('input')).nativeElement;
        const nameInput = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const enabledInput = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const descriptionTextarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

        codeInput.value = 'code';
        nameInput.value = 'name';
        component.selectedRobotType = {robotType: 'type'};
        enabledInput.value = null;
        descriptionTextarea.value = 'description';
        ;

        let error = null;

        mockRobotService.createRobot.mockRejectedValue(error = new Error());
        await component.createRobot();

        expect(alertSpy).toHaveBeenCalledWith("Robot not created: " + error );

    });
});
