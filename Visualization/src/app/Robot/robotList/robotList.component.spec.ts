import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RobotListComponent } from './robotList.component';
import { RobotService } from '../../services/robot.service';
import { ActivatedRoute } from '@angular/router';
import { RobotInfo } from '../robot-info/robotinfo';

describe('RobotListComponent', () => {
    let component: RobotListComponent;
    let fixture: ComponentFixture<RobotListComponent>;
    let mockRobotService: jest.Mocked<RobotService>;
    let mockActivatedRoute: Partial<ActivatedRoute>;

    beforeEach(() => {
        mockRobotService = {
            RobotList: [],
            createRobot: jest.fn(),
            listAllRobots: jest.fn(),
            toggleRobotStatus: jest.fn(),
            robotList: jest.fn(),
            getRobotByCode: jest.fn()
        } as jest.Mocked<RobotService>;

        mockActivatedRoute = {
        };

        TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });

        fixture = TestBed.createComponent(RobotListComponent);
        component = fixture.componentInstance;

        component.robotService = mockRobotService;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch robot list on initialization', async () => {
        const robot1: RobotInfo = {
            code: 'R1',
            name: 'robot1',
            type: 'CleaningType',
            enabled: true,
            description: "description",
        };

        const robot2: RobotInfo = {
            code: 'R2',
            name: 'robot2',
            type: 'CleaningType',
            enabled: true,
            description: "description",
        };
        const mockRobotList = [robot1, robot2];
        mockRobotService.listAllRobots.mockResolvedValue((mockRobotList));

        await component.ngOnInit();
        expect(mockRobotService.listAllRobots).toHaveBeenCalled();
        expect(component.robotList).toEqual(mockRobotList);

    });

    it('should catch error on robot list ', async () => {

        const originalConsoleError = console.error;
        console.error = jest.fn();

        mockRobotService.listAllRobots.mockRejectedValue(new Error('Error'));

        await component.ngOnInit();
        expect(mockRobotService.listAllRobots).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith('Erro ao listar robôs:', new Error('Error'));
        console.error = originalConsoleError;

    });

});
