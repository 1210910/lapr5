import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { PassagewayListComponent } from './passagewayList.component';
import { PassagewayService } from '../../services/passageway.service';
import { ActivatedRoute } from '@angular/router';
import { PassagewayInfo } from '../passageway-info/passagewayinfo';
import {PassagewayInfoComponent} from "../passageway-info/passageway-info.component";
import {FloorService} from "../../services/floor.service";
import {FloorInfo} from "../../Floor/floor-info/floorinfo";

describe('PassagewayListComponent', () => {
    let component: PassagewayListComponent;
    let fixture: ComponentFixture<PassagewayListComponent>;
    let mockPassagewayService: jest.Mocked<PassagewayService>;
    let mockFloorService: jest.Mocked<FloorService>;
    let mockActivatedRoute: Partial<ActivatedRoute>;

    beforeEach(() => {
        mockPassagewayService = {
            passagewayListInfo: [],
            listPassageways: jest.fn(),
            passagewayList: jest.fn(),
            passagewayListBetween2Buldings: jest.fn(),
            passagewayListFromAFloor: jest.fn(),
            passagewayListFromABuilding: jest.fn()
        } as any;

        mockActivatedRoute = {
        };

        TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });

        fixture = TestBed.createComponent(PassagewayListComponent);
        component = fixture.componentInstance;

        component.passagewayService = mockPassagewayService;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch building list on initialization', async() => {
        const passageway1: PassagewayInfo = {
            passageCode: 'PA1B1',
            floor1:'A1',
            floor2: 'B1',
            description: 'Passage between A1 and B1'

        };

        const passageway2: PassagewayInfo = {
            passageCode: 'PA1B2',
            floor1:'A1',
            floor2: 'B2',
            description: 'Passage between A1 and B2'
        };
        const mockPassagewayList = [passageway1,passageway2];
        mockPassagewayService.listPassageways.mockResolvedValue(mockPassagewayList);
        mockPassagewayService.PassagewayList = [];

        mockPassagewayService.PassagewayList.push(passageway1);
        mockPassagewayService.PassagewayList.push(passageway2);

        await component.ngOnInit();

        expect(mockPassagewayService.listPassageways).toHaveBeenCalled();
        expect(mockPassagewayService.passagewayList).toHaveBeenCalledWith(mockPassagewayList);
        expect(component.passagewayList).toEqual(mockPassagewayList);

    });

    it('should filter CallMethod list for passagewayListBetween2Buldings', async() => {
        const passageway1: PassagewayInfo = {
            passageCode: 'PA1B1',
            floor1:'A1',
            floor2: 'B1',
            description: 'Passage between A1 and B1'

        };

        const passageway2: PassagewayInfo = {
            passageCode: 'PC1B2',
            floor1:'C1',
            floor2: 'B2',
            description: 'Passage between C1 and B2'
        };

        const mockPassagewayList = [passageway1,passageway2];


        mockPassagewayService.PassagewayList = [];

        mockPassagewayService.listPassageways.mockResolvedValue(mockPassagewayList);

        mockPassagewayService.PassagewayList.push(passageway1);
        mockPassagewayService.PassagewayList.push(passageway2);

        await component.CallMethod('A','B', '');

        expect(mockPassagewayService.listPassageways).toHaveBeenCalled();
        expect(mockPassagewayService.passagewayListBetween2Buldings).toHaveBeenCalledWith(mockPassagewayList, [], 'A', 'B');
        expect(component.passagewayList).toEqual(mockPassagewayList);

    });

    it('should filter CallMethod list for passagewayListFromABuilding', async() => {
        const passageway1: PassagewayInfo = {
            passageCode: 'PA1B1',
            floor1:'A1',
            floor2: 'B1',
            description: 'Passage between A1 and B1'

        };

        const passageway2: PassagewayInfo = {
            passageCode: 'PC1B2',
            floor1:'C1',
            floor2: 'B2',
            description: 'Passage between C1 and B2'
        };

        const mockPassagewayList = [passageway1,passageway2];
        mockPassagewayService.PassagewayList = [];

        mockPassagewayService.listPassageways.mockResolvedValue(mockPassagewayList);

        mockPassagewayService.PassagewayList.push(passageway1);
        mockPassagewayService.PassagewayList.push(passageway2);

        await component.CallMethod('A','', '');

        expect(mockPassagewayService.listPassageways).toHaveBeenCalled();
        expect(mockPassagewayService.passagewayListFromABuilding).toHaveBeenCalledWith(mockPassagewayList, [], 'A');
        expect(component.passagewayList).toEqual(mockPassagewayList);

    });

    it('should filter CallMethod list for passagewayListFromAFloor', async() => {
        const passageway1: PassagewayInfo = {
            passageCode: 'PA1B1',
            floor1:'A1',
            floor2: 'B1',
            description: 'Passage between A1 and B1'

        };

        const passageway2: PassagewayInfo = {
            passageCode: 'PC1B2',
            floor1:'C1',
            floor2: 'B2',
            description: 'Passage between C1 and B2'
        };

        const mockPassagewayList = [passageway1,passageway2];
        mockPassagewayService.PassagewayList = [];

        mockPassagewayService.listPassageways.mockResolvedValue(mockPassagewayList);

        mockPassagewayService.PassagewayList.push(passageway1);
        mockPassagewayService.PassagewayList.push(passageway2);

        await component.CallMethod('','', 'A');

        expect(mockPassagewayService.listPassageways).toHaveBeenCalled();
        expect(mockPassagewayService.passagewayListFromAFloor).toHaveBeenCalledWith(mockPassagewayList, 'A');
        expect(component.passagewayList).toEqual(mockPassagewayList);
    });
});
