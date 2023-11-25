import {RobotService} from "./robot.service";
import {BuildingInfo} from "../Building/building-info/buildingInfo";
import {RobotInfo} from "../Robot/robot-info/robotinfo";

describe('RobotService', () => {
    let service: RobotService;
    const prepareMockWithStatus = (status: number, response: any) => {
        const mockXMLHttpRequest: jest.Mocked<XMLHttpRequest> = {
            open: jest.fn(),
            setRequestHeader: jest.fn(),
            send: jest.fn(),
            onload: jest.fn(),
            status: status,
            response: response,
            responseText: '{"error":"test"}',
        } as any;

        jest.spyOn(global, 'XMLHttpRequest').mockImplementation(() => mockXMLHttpRequest);

        return mockXMLHttpRequest;
    };

    beforeEach(() => {
        service = new RobotService();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should create a robot with correct status 201', async () => {

        const mockXMLHttpRequest = prepareMockWithStatus(201, null);

        const resultPromise = service.createRobot('R', 'F1', 'type', "description");

        // Simulate successful response
        const event = new ProgressEvent('load'); // Provide the required argument

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event); // Check if onload is not null before calling it
        }

        const result = await resultPromise; // Wait for the promise to resolve
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('POST', 'http://localhost:4000/api/robot', true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(result).toBe(true);
    });

    it('should create a robot fail with status 404', async () => {

        const mockXMLHttpRequest = prepareMockWithStatus(404, "test");

        const resultPromise = service.createRobot('R', 'F2', 'description', "description");

        // Simulate successful response
        const event = new ProgressEvent('load'); // Provide the required argument

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event); // Check if onload is not null before calling it
        }

        await expect(resultPromise).rejects.toEqual(false);
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('POST', 'http://localhost:4000/api/robot', true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    });

    it('should PATCH toogleRobotStatus with correct status 204', async () => {

        const mockXMLHttpRequest = prepareMockWithStatus(204, "test");

        const resultPromise = service.toggleRobotStatus('R', false);

        // Simulate successful response
        const event = new ProgressEvent('load');

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event);
        }

        await expect(resultPromise).resolves.toEqual(true);
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('PATCH', 'http://localhost:4000/api/robot/R', true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    });

    it('should PATCH toogleRobotStatus with Fail status 400', async () => {

        const mockXMLHttpRequest = prepareMockWithStatus(400, "test");

        const resultPromise = service.toggleRobotStatus('R', false);

        // Simulate successful response
        const event = new ProgressEvent('load');

        if (mockXMLHttpRequest.onload) {
            mockXMLHttpRequest.onload(event);
        }

        await expect(resultPromise).rejects.toEqual({"error": "test"});
        expect(mockXMLHttpRequest.open).toHaveBeenCalledWith('PATCH', 'http://localhost:4000/api/robot/R', true);
        expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    });

    it('should return robot when robot was found', () => {

        const newRobot1 = {
            code: "R1",
            name: 'Robot 1',
            type: 'Type 1',
            enabled: true,
            description: 'Description 1',
        }as RobotInfo;

        const newRobot2 = {
            code: "R2",
            name: 'Robot 2',
            type: 'Type 2',
            enabled: false,
            description: 'Description 2',
        }as RobotInfo;

        service.RobotList.push(newRobot1);
        service.RobotList.push(newRobot2);

        const code = 'R2';
        const result = service.getRobotByCode(code);
        expect(result).toEqual(newRobot2);
    });
    it('should fail return robot when robot not found', () => {

        const newRobot1 = {
            code: "R1",
            name: 'Robot 1',
            type: 'Type 1',
            enabled: true,
            description: 'Description 1',
        }as RobotInfo;

        const newRobot2 = {
            code: "R2",
            name: 'Robot 2',
            type: 'Type 2',
            enabled: false,
            description: 'Description 2',
        }as RobotInfo;

        service.RobotList.push(newRobot1);
        service.RobotList.push(newRobot2);

        const code = 'R3';
        const result = service.getRobotByCode(code);
        expect(result).toBe(undefined);
    });


});