import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloorListComponent } from './floorList.component';
import { FloorService } from '../../services/floor.service';
import { ActivatedRoute } from '@angular/router';
import { FloorInfo } from '../floor-info/floorinfo';
import {PassagewayService} from "../../services/passageway.service";
import {PassagewayInfo} from "../../PassageWay/passageway-info/passagewayinfo";

describe('FloorListComponent', () => {
    let component: FloorListComponent;
    let fixture: ComponentFixture<FloorListComponent>;
    let mockFloorService: jest.Mocked<FloorService>;
    let mockActivatedRoute: Partial<ActivatedRoute>;
    let mockPassagewayService: jest.Mocked<PassagewayService>;


    beforeEach(() => {
        mockFloorService = {
            FloorList: [],
            listFloors: jest.fn(),
            floorList: jest.fn(),
            floorListFromABuilding: jest.fn(),
            floorListWithPassagewaysFromABuilding: jest.fn(),
            getFloorByCode: jest.fn()
        } as any;

        mockPassagewayService = {
            PassagewayList: [],
            listPassageways: jest.fn(),
        } as any

        mockActivatedRoute = {
        };

        TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });

        fixture = TestBed.createComponent(FloorListComponent);
        component = fixture.componentInstance;

        component.floorService = mockFloorService;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch floor list on initialization', async () => {
        const floor1: FloorInfo = {
            floorCode: 'FA',
            floorNumber: 1,
            length: 10,
            width: 10,
            description: "description",
            buildingID:"B"
        };

        const floor2: FloorInfo = {
            floorCode: 'FB',
            floorNumber: 2,
            length: 7,
            width: 7,
            description: "description",
            buildingID:"B"
        };
        const passageway1: PassagewayInfo = {
            passageCode: 'PB',
            floor1: "F1",
            floor2: "F2",
            description: "Description"
        };

        const mockFloorList = [floor1, floor2];
        mockFloorService.listFloors.mockResolvedValue((mockFloorList));
        mockFloorService.FloorList.push(floor1);
        mockFloorService.FloorList.push(floor2);

        mockPassagewayService.listPassageways.mockImplementation();
        mockPassagewayService.PassagewayList.push(passageway1)
        await component.ngOnInit();

        expect(mockFloorService.listFloors).toHaveBeenCalled();
        expect(component.floorList).toEqual(mockFloorList);
    });

    it('should fetch floorList with CallMethod', async () => {
        const floor1: FloorInfo = {
            floorCode: 'FA',
            floorNumber: 1,
            length: 10,
            width: 10,
            description: "description",
            buildingID:"B"
        };

        const floor2: FloorInfo = {
            floorCode: 'FB',
            floorNumber: 2,
            length: 7,
            width: 7,
            description: "description",
            buildingID:"B"
        };
        const passageway1: PassagewayInfo = {
            passageCode: 'PB',
            floor1: "F1",
            floor2: "F2",
            description: "Description"
        };
        const mockValue = 'min:maxLength:10;maxWidth:20;';

        const mockFloorList = [floor1, floor2];
        mockFloorService.floorListWithPassagewaysFromABuilding.mockImplementation();
        mockPassagewayService.listPassageways.mockImplementation();
        mockPassagewayService.PassagewayList.push(passageway1);
        mockFloorService.FloorList.push(floor1)
        mockFloorService.FloorList.push(floor2)
        await component.CallMethod(mockValue);

        expect(mockFloorService.floorListWithPassagewaysFromABuilding).toHaveBeenCalled();
        expect(mockFloorService.floorListWithPassagewaysFromABuilding);
        expect(component.floorList).toEqual(mockFloorList);


    });

    it('should filter floor list CallMethod1', async () => {
        const floor1: FloorInfo = {
            floorCode: 'FA',
            floorNumber: 1,
            length: 10,
            width: 10,
            description: "description",
            buildingID:"B"
        };
        const floor2: FloorInfo = {
            floorCode: 'FB',
            floorNumber: 2,
            length: 7,
            width: 7,
            description: "description",
            buildingID:"B"
        };

        const buildingCode = "C";
        const mockFloorList = [floor1, floor2];
        mockFloorService.listFloors.mockResolvedValue((mockFloorList));
        mockFloorService.FloorList.push(floor1);
        mockFloorService.FloorList.push(floor2);

        await component.CallMethod1(buildingCode);

        expect(mockFloorService.listFloors).toHaveBeenCalled();
        expect(component.floorList).toEqual(mockFloorList);

    });

});
